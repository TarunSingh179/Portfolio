from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query
from fastapi.encoders import jsonable_encoder
from typing import List, Optional, Dict, Any
import os
import shutil
from datetime import datetime

from ..database import get_collection
from ..models.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
    ProjectInDB
)
from ..utils.auth import get_current_active_user
from ..config import settings

router = APIRouter()

# Ensure upload directory exists
os.makedirs(os.path.join(settings.UPLOAD_FOLDER, "projects"), exist_ok=True)

@router.get("/", response_model=List[ProjectResponse])
async def get_projects(
    skip: int = 0,
    limit: int = 10,
    featured: Optional[bool] = None,
    category: Optional[str] = None,
    search: Optional[str] = None
):
    """
    Get all projects with optional filtering
    """
    projects_collection = get_collection("projects")
    
    # Build query
    query = {}
    if featured is not None:
        query["featured"] = featured
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"technologies": {"$in": [search]}}
        ]
    
    # Get projects with pagination
    cursor = projects_collection.find(query).skip(skip).limit(limit)
    projects = await cursor.to_list(length=limit)
    
    return projects

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    project: ProjectCreate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Create a new project
    """
    projects_collection = get_collection("projects")
    
    # Check if project with same title already exists
    existing_project = await projects_collection.find_one({"title": project.title})
    if existing_project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A project with this title already exists"
        )
    
    # Create new project
    new_project = ProjectInDB(
        **project.dict(),
        user_id=current_user["_id"],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    result = await projects_collection.insert_one(jsonable_encoder(new_project))
    created_project = await projects_collection.find_one({"_id": result.inserted_id})
    
    return created_project

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str):
    """
    Get a single project by ID
    """
    projects_collection = get_collection("projects")
    
    project = await projects_collection.find_one({"_id": project_id})
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str,
    project: ProjectUpdate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Update a project
    """
    projects_collection = get_collection("projects")
    
    # Check if project exists and user is the owner
    existing_project = await projects_collection.find_one({"_id": project_id})
    if not existing_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Update project
    update_data = project.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await projects_collection.update_one(
        {"_id": project_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update project"
        )
    
    updated_project = await projects_collection.find_one({"_id": project_id})
    return updated_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: str,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Delete a project
    """
    projects_collection = get_collection("projects")
    
    # Check if project exists and user is the owner
    existing_project = await projects_collection.find_one({"_id": project_id})
    if not existing_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Delete project
    result = await projects_collection.delete_one({"_id": project_id})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to delete project"
        )
    
    return None

@router.post("/{project_id}/upload-image/")
async def upload_project_image(
    project_id: str,
    file: UploadFile = File(...),
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Upload an image for a project
    """
    projects_collection = get_collection("projects")
    
    # Check if project exists
    project = await projects_collection.find_one({"_id": project_id})
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Check file type
    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in [".jpg", ".jpeg", ".png", ".gif"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only image files are allowed (jpg, jpeg, png, gif)"
        )
    
    # Create a safe filename
    filename = f"project_{project_id}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_FOLDER, "projects", filename)
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Update the project's image URL in the database
    image_url = f"/uploads/projects/{filename}"
    await projects_collection.update_one(
        {"_id": project_id},
        {"$set": {"image": image_url}}
    )
    
    return {"filename": filename, "url": image_url}

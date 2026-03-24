from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.encoders import jsonable_encoder
from typing import List, Optional, Dict, Any
from datetime import datetime

from ..database import get_collection
from ..models.internship import (
    InternshipCreate,
    InternshipUpdate,
    InternshipResponse,
    InternshipInDB
)
from ..utils.auth import get_current_active_user

router = APIRouter()

@router.get("/", response_model=List[InternshipResponse])
async def get_internships(
    skip: int = 0,
    limit: int = 10,
    company: Optional[str] = None,
    is_current: Optional[bool] = None,
    search: Optional[str] = None
):
    """
    Get all internships with optional filtering
    """
    internships_collection = get_collection("internships")
    
    # Build query
    query = {}
    if company:
        query["company"] = {"$regex": company, "$options": "i"}
    if is_current is not None:
        query["is_current"] = is_current
    if search:
        query["$or"] = [
            {"company": {"$regex": search, "$options": "i"}},
            {"position": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"skills": {"$in": [search]}}
        ]
    
    # Sort by start_date in descending order (most recent first)
    cursor = internships_collection.find(query).sort("start_date", -1).skip(skip).limit(limit)
    internships = await cursor.to_list(length=limit)
    
    return internships

@router.post("/", response_model=InternshipResponse, status_code=status.HTTP_201_CREATED)
async def create_internship(
    internship: InternshipCreate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Create a new internship
    """
    internships_collection = get_collection("internships")
    
    # Create new internship
    new_internship = InternshipInDB(
        **internship.dict(),
        user_id=current_user["_id"],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    result = await internships_collection.insert_one(jsonable_encoder(new_internship))
    created_internship = await internships_collection.find_one({"_id": result.inserted_id})
    
    return created_internship

@router.get("/{internship_id}", response_model=InternshipResponse)
async def get_internship(internship_id: str):
    """
    Get a single internship by ID
    """
    internships_collection = get_collection("internships")
    
    internship = await internships_collection.find_one({"_id": internship_id})
    if not internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship not found"
        )
    
    return internship

@router.put("/{internship_id}", response_model=InternshipResponse)
async def update_internship(
    internship_id: str,
    internship: InternshipUpdate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Update an internship
    """
    internships_collection = get_collection("internships")
    
    # Check if internship exists
    existing_internship = await internships_collection.find_one({"_id": internship_id})
    if not existing_internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship not found"
        )
    
    # Update internship
    update_data = internship.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await internships_collection.update_one(
        {"_id": internship_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update internship"
        )
    
    updated_internship = await internships_collection.find_one({"_id": internship_id})
    return updated_internship

@router.delete("/{internship_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_internship(
    internship_id: str,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Delete an internship
    """
    internships_collection = get_collection("internships")
    
    # Check if internship exists
    existing_internship = await internships_collection.find_one({"_id": internship_id})
    if not existing_internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship not found"
        )
    
    # Delete internship
    result = await internships_collection.delete_one({"_id": internship_id})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to delete internship"
        )
    
    return None

from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.encoders import jsonable_encoder
from typing import List, Optional, Dict, Any
from datetime import datetime

from ..database import get_collection
from ..models.education import (
    EducationCreate,
    EducationUpdate,
    EducationResponse,
    EducationInDB
)
from ..utils.auth import get_current_active_user

router = APIRouter()

@router.get("/", response_model=List[EducationResponse])
async def get_education_entries(
    skip: int = 0,
    limit: int = 10,
    degree: Optional[str] = None,
    institution: Optional[str] = None,
    is_current: Optional[bool] = None
):
    """
    Get all education entries with optional filtering
    """
    education_collection = get_collection("education")
    
    # Build query
    query = {}
    if degree:
        query["degree"] = {"$regex": degree, "$options": "i"}
    if institution:
        query["institution"] = {"$regex": institution, "$options": "i"}
    if is_current is not None:
        query["is_current"] = is_current
    
    # Sort by start_date in descending order (most recent first)
    cursor = education_collection.find(query).sort("start_date", -1).skip(skip).limit(limit)
    education_entries = await cursor.to_list(length=limit)
    
    return education_entries

@router.post("/", response_model=EducationResponse, status_code=status.HTTP_201_CREATED)
async def create_education_entry(
    education: EducationCreate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Create a new education entry
    """
    education_collection = get_collection("education")
    
    # Create new education entry
    new_education = EducationInDB(
        **education.dict(),
        user_id=current_user["_id"],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    result = await education_collection.insert_one(jsonable_encoder(new_education))
    created_education = await education_collection.find_one({"_id": result.inserted_id})
    
    return created_education

@router.get("/{education_id}", response_model=EducationResponse)
async def get_education_entry(education_id: str):
    """
    Get a single education entry by ID
    """
    education_collection = get_collection("education")
    
    education = await education_collection.find_one({"_id": education_id})
    if not education:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Education entry not found"
        )
    
    return education

@router.put("/{education_id}", response_model=EducationResponse)
async def update_education_entry(
    education_id: str,
    education: EducationUpdate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Update an education entry
    """
    education_collection = get_collection("education")
    
    # Check if education entry exists
    existing_education = await education_collection.find_one({"_id": education_id})
    if not existing_education:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Education entry not found"
        )
    
    # Update education entry
    update_data = education.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await education_collection.update_one(
        {"_id": education_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update education entry"
        )
    
    updated_education = await education_collection.find_one({"_id": education_id})
    return updated_education

@router.delete("/{education_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_education_entry(
    education_id: str,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Delete an education entry
    """
    education_collection = get_collection("education")
    
    # Check if education entry exists
    existing_education = await education_collection.find_one({"_id": education_id})
    if not existing_education:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Education entry not found"
        )
    
    # Delete education entry
    result = await education_collection.delete_one({"_id": education_id})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to delete education entry"
        )
    
    return None

from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.encoders import jsonable_encoder
from typing import List, Optional, Dict, Any
from datetime import datetime

from ..database import get_collection
from ..models.certification import (
    CertificationCreate,
    CertificationUpdate,
    CertificationResponse,
    CertificationInDB
)
from ..utils.auth import get_current_active_user

router = APIRouter()

@router.get("/", response_model=List[CertificationResponse])
async def get_certifications(
    skip: int = 0,
    limit: int = 10,
    issuer: Optional[str] = None,
    is_verified: Optional[bool] = None,
    search: Optional[str] = None
):
    """
    Get all certifications with optional filtering
    """
    certifications_collection = get_collection("certifications")
    
    # Build query
    query = {}
    if issuer:
        query["issuer"] = {"$regex": issuer, "$options": "i"}
    if is_verified is not None:
        query["is_verified"] = is_verified
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"issuer": {"$regex": search, "$options": "i"}},
            {"credential_id": {"$regex": search, "$options": "i"}}
        ]
    
    # Sort by issue_date in descending order (most recent first)
    cursor = certifications_collection.find(query).sort("issue_date", -1).skip(skip).limit(limit)
    certifications = await cursor.to_list(length=limit)
    
    return certifications

@router.post("/", response_model=CertificationResponse, status_code=status.HTTP_201_CREATED)
async def create_certification(
    certification: CertificationCreate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Create a new certification
    """
    certifications_collection = get_collection("certifications")
    
    # Check if certification with same credential ID already exists
    if certification.credential_id:
        existing_cert = await certifications_collection.find_one({
            "credential_id": certification.credential_id
        })
        if existing_cert:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A certification with this credential ID already exists"
            )
    
    # Create new certification
    new_certification = CertificationInDB(
        **certification.dict(),
        user_id=current_user["_id"],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    result = await certifications_collection.insert_one(jsonable_encoder(new_certification))
    created_certification = await certifications_collection.find_one({"_id": result.inserted_id})
    
    return created_certification

@router.get("/{certification_id}", response_model=CertificationResponse)
async def get_certification(certification_id: str):
    """
    Get a single certification by ID
    """
    certifications_collection = get_collection("certifications")
    
    certification = await certifications_collection.find_one({"_id": certification_id})
    if not certification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certification not found"
        )
    
    return certification

@router.put("/{certification_id}", response_model=CertificationResponse)
async def update_certification(
    certification_id: str,
    certification: CertificationUpdate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Update a certification
    """
    certifications_collection = get_collection("certifications")
    
    # Check if certification exists
    existing_certification = await certifications_collection.find_one({"_id": certification_id})
    if not existing_certification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certification not found"
        )
    
    # Check for duplicate credential ID
    if certification.credential_id and certification.credential_id != existing_certification.get("credential_id"):
        duplicate = await certifications_collection.find_one({
            "credential_id": certification.credential_id,
            "_id": {"$ne": certification_id}
        })
        if duplicate:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A certification with this credential ID already exists"
            )
    
    # Update certification
    update_data = certification.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await certifications_collection.update_one(
        {"_id": certification_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update certification"
        )
    
    updated_certification = await certifications_collection.find_one({"_id": certification_id})
    return updated_certification

@router.delete("/{certification_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_certification(
    certification_id: str,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Delete a certification
    """
    certifications_collection = get_collection("certifications")
    
    # Check if certification exists
    existing_certification = await certifications_collection.find_one({"_id": certification_id})
    if not existing_certification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certification not found"
        )
    
    # Delete certification
    result = await certifications_collection.delete_one({"_id": certification_id})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to delete certification"
        )
    
    return None

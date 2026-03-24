from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.encoders import jsonable_encoder
from typing import Optional, Dict, Any
import os
import shutil
from datetime import datetime

from ..database import get_collection
from ..models.personal_info import (
    PersonalInfoCreate,
    PersonalInfoUpdate,
    PersonalInfoResponse,
    PersonalInfoInDB
)
from ..utils.auth import get_current_active_user
from ..config import settings

router = APIRouter()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)

@router.get("/", response_model=PersonalInfoResponse)
async def get_personal_info():
    """
    Get personal information
    """
    personal_info_collection = get_collection("personal_info")
    
    # For now, we'll just get the first document
    # In a real app, you might want to filter by user_id
    personal_info = await personal_info_collection.find_one()
    
    if not personal_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Personal information not found"
        )
    
    return personal_info

@router.put("/", response_model=PersonalInfoResponse)
async def update_personal_info(
    personal_info: PersonalInfoUpdate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Update personal information
    """
    personal_info_collection = get_collection("personal_info")
    
    # Check if personal info exists
    existing_info = await personal_info_collection.find_one()
    
    update_data = personal_info.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    if existing_info:
        # Update existing
        result = await personal_info_collection.update_one(
            {"_id": existing_info["_id"]},
            {"$set": update_data}
        )
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to update personal information"
            )
        updated_info = await personal_info_collection.find_one({"_id": existing_info["_id"]})
    else:
        # Create new
        new_info = PersonalInfoInDB(**personal_info.dict(), user_id=current_user["_id"])
        result = await personal_info_collection.insert_one(jsonable_encoder(new_info))
        updated_info = await personal_info_collection.find_one({"_id": result.inserted_id})
    
    return updated_info

@router.post("/upload-avatar/")
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Upload profile picture
    """
    # Check file type
    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in [".jpg", ".jpeg", ".png", ".gif"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only image files are allowed (jpg, jpeg, png, gif)"
        )
    
    # Create a safe filename
    filename = f"avatar_{current_user['_id']}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_FOLDER, filename)
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Update the user's profile picture URL in the database
    personal_info_collection = get_collection("personal_info")
    await personal_info_collection.update_one(
        {"user_id": current_user["_id"]},
        {"$set": {"profile_picture": f"/uploads/{filename}"}},
        upsert=True
    )
    
    return {"filename": filename, "url": f"/uploads/{filename}"}

@router.post("/upload-resume/")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Upload resume/CV
    """
    # Check file type
    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in [".pdf", ".doc", ".docx"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF and Word documents are allowed"
        )
    
    # Create a safe filename
    filename = f"resume_{current_user['_id']}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_FOLDER, filename)
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Update the user's resume URL in the database
    personal_info_collection = get_collection("personal_info")
    await personal_info_collection.update_one(
        {"user_id": current_user["_id"]},
        {"$set": {"resume_url": f"/uploads/{filename}"}},
        upsert=True
    )
    
    return {"filename": filename, "url": f"/uploads/{filename}"}

from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.encoders import jsonable_encoder
from typing import List, Optional, Dict, Any
from datetime import datetime

from ..database import get_collection
from ..models.skill import (
    SkillCreate,
    SkillUpdate,
    SkillResponse,
    SkillInDB
)
from ..utils.auth import get_current_active_user

router = APIRouter()

@router.get("/", response_model=List[SkillResponse])
async def get_skills(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    search: Optional[str] = None
):
    """
    Get all skills with optional filtering
    """
    skills_collection = get_collection("skills")
    
    # Build query
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["is_featured"] = featured
    if search:
        query["name"] = {"$regex": search, "$options": "i"}
    
    # Get skills with pagination
    cursor = skills_collection.find(query).sort("proficiency", -1).skip(skip).limit(limit)
    skills = await cursor.to_list(length=limit)
    
    return skills

@router.get("/categories/", response_model=List[str])
async def get_skill_categories():
    """
    Get all unique skill categories
    """
    skills_collection = get_collection("skills")
    categories = await skills_collection.distinct("category")
    return categories

@router.post("/", response_model=SkillResponse, status_code=status.HTTP_201_CREATED)
async def create_skill(
    skill: SkillCreate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Create a new skill
    """
    skills_collection = get_collection("skills")
    
    # Check if skill with same name already exists
    existing_skill = await skills_collection.find_one({"name": skill.name, "category": skill.category})
    if existing_skill:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A skill with this name and category already exists"
        )
    
    # Create new skill
    new_skill = SkillInDB(
        **skill.dict(),
        user_id=current_user["_id"],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    result = await skills_collection.insert_one(jsonable_encoder(new_skill))
    created_skill = await skills_collection.find_one({"_id": result.inserted_id})
    
    return created_skill

@router.get("/{skill_id}", response_model=SkillResponse)
async def get_skill(skill_id: str):
    """
    Get a single skill by ID
    """
    skills_collection = get_collection("skills")
    
    skill = await skills_collection.find_one({"_id": skill_id})
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )
    
    return skill

@router.put("/{skill_id}", response_model=SkillResponse)
async def update_skill(
    skill_id: str,
    skill: SkillUpdate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Update a skill
    """
    skills_collection = get_collection("skills")
    
    # Check if skill exists
    existing_skill = await skills_collection.find_one({"_id": skill_id})
    if not existing_skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )
    
    # Update skill
    update_data = skill.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await skills_collection.update_one(
        {"_id": skill_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update skill"
        )
    
    updated_skill = await skills_collection.find_one({"_id": skill_id})
    return updated_skill

@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(
    skill_id: str,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Delete a skill
    """
    skills_collection = get_collection("skills")
    
    # Check if skill exists
    existing_skill = await skills_collection.find_one({"_id": skill_id})
    if not existing_skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )
    
    # Delete skill
    result = await skills_collection.delete_one({"_id": skill_id})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to delete skill"
        )
    
    return None

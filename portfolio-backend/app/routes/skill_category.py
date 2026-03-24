from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.encoders import jsonable_encoder
from typing import List, Optional, Dict, Any
from datetime import datetime

from ..database import get_collection
from ..models.skill_category import (
    SkillCategoryCreate,
    SkillCategoryUpdate,
    SkillCategoryResponse,
    SkillCategoryInDB
)
from ..utils.auth import get_current_active_user

router = APIRouter()

@router.get("/", response_model=List[SkillCategoryResponse])
async def get_skill_categories(
    is_active: Optional[bool] = None,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Get all skill categories
    """
    categories_collection = get_collection("skill_categories")
    
    # Build query
    query = {}
    if is_active is not None:
        query["is_active"] = is_active
    
    # Sort by order and name
    cursor = categories_collection.find(query).sort([("order", 1), ("name", 1)])
    categories = await cursor.to_list(length=100)
    
    return categories

@router.post("/", response_model=SkillCategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_skill_category(
    category: SkillCategoryCreate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Create a new skill category (admin only)
    """
    categories_collection = get_collection("skill_categories")
    
    # Check if category with same name already exists
    existing_category = await categories_collection.find_one({"name": category.name})
    if existing_category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A category with this name already exists"
        )
    
    # Create new category
    new_category = SkillCategoryInDB(
        **category.dict(),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    result = await categories_collection.insert_one(jsonable_encoder(new_category))
    created_category = await categories_collection.find_one({"_id": result.inserted_id})
    
    return created_category

@router.put("/{category_id}", response_model=SkillCategoryResponse)
async def update_skill_category(
    category_id: str,
    category: SkillCategoryUpdate,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Update a skill category (admin only)
    """
    categories_collection = get_collection("skill_categories")
    
    # Check if category exists
    existing_category = await categories_collection.find_one({"_id": category_id})
    if not existing_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    # Update category
    update_data = category.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await categories_collection.update_one(
        {"_id": category_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update category"
        )
    
    updated_category = await categories_collection.find_one({"_id": category_id})
    return updated_category

@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill_category(
    category_id: str,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Delete a skill category (admin only)
    """
    categories_collection = get_collection("skill_categories")
    skills_collection = get_collection("skills")
    
    # Check if category exists
    existing_category = await categories_collection.find_one({"_id": category_id})
    if not existing_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    # Check if category has associated skills
    skill_count = await skills_collection.count_documents({"category_id": category_id})
    if skill_count > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete category with associated skills"
        )
    
    # Delete category
    result = await categories_collection.delete_one({"_id": category_id})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to delete category"
        )
    
    return None

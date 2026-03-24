from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional, List
from datetime import datetime

from .user import PyObjectId

class SkillCategoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    icon: Optional[str] = None
    order: int = 0
    is_active: bool = True

class SkillCategoryCreate(SkillCategoryBase):
    pass

class SkillCategoryUpdate(SkillCategoryBase):
    name: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None

class SkillCategoryInDB(SkillCategoryBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class SkillCategoryResponse(SkillCategoryBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

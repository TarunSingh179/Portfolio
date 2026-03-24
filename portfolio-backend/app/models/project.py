from pydantic import BaseModel, Field, HttpUrl
from bson import ObjectId
from typing import Optional, List
from datetime import datetime
from .user import PyObjectId

class ProjectBase(BaseModel):
    title: str
    description: str
    technologies: List[str] = []
    link: Optional[HttpUrl] = None
    image: Optional[str] = None
    category: str = "Web Development"
    date: str
    featured: bool = False
    repo_url: Optional[HttpUrl] = None
    demo_url: Optional[HttpUrl] = None
    is_public: bool = True
    tags: List[str] = []

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    title: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    category: Optional[str] = None
    date: Optional[str] = None
    featured: Optional[bool] = None

class ProjectInDB(ProjectBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[PyObjectId] = None

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class ProjectResponse(ProjectBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime
    user_id: Optional[str] = None

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

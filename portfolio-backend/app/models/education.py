from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional, List
from datetime import datetime
from .user import PyObjectId

class EducationBase(BaseModel):
    degree: str
    institution: str
    field_of_study: str
    start_date: str
    end_date: Optional[str] = None
    gpa: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    activities: Optional[List[str]] = []
    achievements: Optional[List[str]] = []
    relevant_courses: Optional[List[str]] = []
    is_current: bool = False

class EducationCreate(EducationBase):
    pass

class EducationUpdate(EducationBase):
    degree: Optional[str] = None
    institution: Optional[str] = None
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class EducationInDB(EducationBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[PyObjectId] = None

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class EducationResponse(EducationBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime
    user_id: Optional[str] = None

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

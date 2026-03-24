from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional, List
from datetime import datetime
from .user import PyObjectId

class InternshipBase(BaseModel):
    company: str
    position: str
    location: str
    start_date: str
    end_date: Optional[str] = None
    is_current: bool = False
    description: str
    responsibilities: List[str] = []
    skills: List[str] = []
    company_website: Optional[str] = None
    company_logo: Optional[str] = None
    employment_type: str = "Full-time"  # Full-time, Part-time, Contract, etc.

class InternshipCreate(InternshipBase):
    pass

class InternshipUpdate(InternshipBase):
    company: Optional[str] = None
    position: Optional[str] = None
    start_date: Optional[str] = None
    description: Optional[str] = None

class InternshipInDB(InternshipBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[PyObjectId] = None

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class InternshipResponse(InternshipBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime
    user_id: Optional[str] = None

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

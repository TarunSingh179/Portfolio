from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from typing import Optional, Dict, List
from datetime import datetime
from .user import PyObjectId

class SocialLinks(BaseModel):
    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    website: Optional[str] = None
    gitlab: Optional[str] = None
    medium: Optional[str] = None
    devto: Optional[str] = None
    facebook: Optional[str] = None
    instagram: Optional[str] = None

class PersonalInfoBase(BaseModel):
    name: str
    title: str
    tagline: str
    bio: str
    email: EmailStr
    phone: Optional[str] = None
    location: Optional[str] = None
    social: Optional[SocialLinks] = SocialLinks()
    resume_url: Optional[str] = None
    profile_picture: Optional[str] = None
    cover_letter: Optional[str] = None
    available_for_work: bool = True
    available_for_freelance: bool = False

class PersonalInfoCreate(PersonalInfoBase):
    pass

class PersonalInfoUpdate(PersonalInfoBase):
    name: Optional[str] = None
    title: Optional[str] = None
    tagline: Optional[str] = None
    bio: Optional[str] = None
    email: Optional[EmailStr] = None

class PersonalInfoInDB(PersonalInfoBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class PersonalInfoResponse(PersonalInfoBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

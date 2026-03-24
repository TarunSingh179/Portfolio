from pydantic import BaseModel, Field, HttpUrl
from bson import ObjectId
from typing import Optional, List
from datetime import datetime
from .user import PyObjectId

class CertificationBase(BaseModel):
    name: str
    issuer: str
    issue_date: str
    expiration_date: Optional[str] = None
    credential_id: Optional[str] = None
    credential_url: Optional[HttpUrl] = None
    skills: List[str] = []
    description: Optional[str] = None
    image: Optional[str] = None
    is_verified: bool = True

class CertificationCreate(CertificationBase):
    pass

class CertificationUpdate(CertificationBase):
    name: Optional[str] = None
    issuer: Optional[str] = None
    issue_date: Optional[str] = None

class CertificationInDB(CertificationBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[PyObjectId] = None

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class CertificationResponse(CertificationBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime
    user_id: Optional[str] = None

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

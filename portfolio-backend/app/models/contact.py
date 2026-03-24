from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId
from datetime import datetime
from typing import Optional

from .user import PyObjectId

class ContactBase(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    is_read: bool = False

class ContactCreate(ContactBase):
    pass

class ContactInDB(ContactBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    status: str = "new"  # new, in_progress, completed, spam

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class ContactResponse(ContactBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    status: str

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

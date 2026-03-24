from pydantic import BaseModel, Field, validator, HttpUrl
from bson import ObjectId
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
from .user import PyObjectId

class SkillLevel(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"
    EXPERT = "Expert"

class SkillBase(BaseModel):
    name: str
    category_id: str  # Reference to SkillCategory
    proficiency: int = 50  # 0-100
    level: Optional[SkillLevel] = SkillLevel.BEGINNER
    icon: Optional[str] = None
    color: Optional[str] = "#4a90e2"  # Default blue color
    is_featured: bool = False
    is_technical: bool = True
    years_of_experience: Optional[float] = None
    last_used_year: Optional[int] = None
    description: Optional[str] = None
    related_skills: List[str] = []  # IDs of related skills
    projects_used: List[str] = []   # Project IDs where this skill was used
    certifications: List[str] = []   # Certification IDs related to this skill
    links: Dict[str, str] = {}      # e.g., {"documentation": "https://..."}

    @validator('proficiency')
    def validate_proficiency(cls, v):
        if v < 0 or v > 100:
            raise ValueError('Proficiency must be between 0 and 100')
        return v
    
    @validator('level', pre=True, always=True)
    def set_skill_level_based_on_proficiency(cls, v, values):
        if 'proficiency' not in values:
            return v
        proficiency = values['proficiency']
        if proficiency >= 80:
            return SkillLevel.EXPERT
        elif proficiency >= 60:
            return SkillLevel.ADVANCED
        elif proficiency >= 40:
            return SkillLevel.INTERMEDIATE
        return SkillLevel.BEGINNER

class SkillCreate(SkillBase):
    pass

class SkillUpdate(SkillBase):
    name: Optional[str] = None
    category: Optional[str] = None
    proficiency: Optional[int] = None

class SkillInDB(SkillBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[PyObjectId] = None

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class SkillResponse(SkillBase):
    id: str = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime
    user_id: Optional[str] = None

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

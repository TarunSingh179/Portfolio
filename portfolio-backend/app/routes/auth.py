from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import Any
import secrets

from ..database import get_collection
from ..models.user import UserCreate, UserResponse, Token, TokenData
from ..utils.auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
    get_current_active_user,
)
from ..config import settings

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate):
    users_collection = get_collection("users")
    
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash the password
    hashed_password = get_password_hash(user.password)
    
    # Create user document
    user_dict = user.dict()
    user_dict["hashed_password"] = hashed_password
    user_dict.pop("password", None)  # Remove the plain password
    user_dict["created_at"] = user_dict.get("created_at", None) or datetime.utcnow()
    user_dict["is_active"] = True
    
    # Insert user into database
    result = await users_collection.insert_one(user_dict)
    created_user = await users_collection.find_one({"_id": result.inserted_id})
    
    return {"_id": str(created_user["_id"]), "email": created_user["email"], "name": created_user["name"], "created_at": created_user["created_at"]}

@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    users_collection = get_collection("users")
    
    # Find user by email
    user = await users_collection.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: dict = Depends(get_current_active_user)):
    return {
        "_id": str(current_user["_id"]),
        "email": current_user["email"],
        "name": current_user["name"],
        "created_at": current_user["created_at"]
    }

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.database import connect_to_mongo, close_mongo_connection
from app.routes import (
    auth,
    personal_info,
    project,
    skill,
    education,
    certification,
    internship,
    ai,
    contact
)
from app.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="API for Portfolio Management System"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_FOLDER), name="uploads")

# Event handlers
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(personal_info.router, prefix="/api/personal-info", tags=["Personal Info"])
app.include_router(project.router, prefix="/api/projects", tags=["Projects"])
app.include_router(skill.router, prefix="/api/skills", tags=["Skills"])
app.include_router(education.router, prefix="/api/education", tags=["Education"])
app.include_router(certification.router, prefix="/api/certifications", tags=["Certifications"])
app.include_router(internship.router, prefix="/api/internships", tags=["Internships"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI Features"])
app.include_router(contact.router, prefix="/api/contacts", tags=["Contacts"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Portfolio Management API",
        "docs": "/docs",
        "redoc": "/redoc"
    }
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.encoders import jsonable_encoder
from typing import Dict, Any, Optional
from datetime import datetime

from ..database import get_collection
from ..models.contact import ContactCreate, ContactInDB, ContactResponse
from ..utils.auth import get_current_active_user

router = APIRouter()

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(
    contact: ContactCreate,
    request: Request,
    current_user: Optional[Dict[str, Any]] = Depends(get_current_active_user)
):
    """
    Create a new contact form submission
    """
    contacts_collection = get_collection("contacts")
    
    # Get client IP and user agent
    client_host = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    # Create new contact
    new_contact = ContactInDB(
        **contact.dict(),
        ip_address=client_host,
        user_agent=user_agent,
        created_at=datetime.utcnow()
    )
    
    # If user is logged in, associate with their account
    if current_user:
        new_contact.user_id = current_user["_id"]
    
    result = await contacts_collection.insert_one(jsonable_encoder(new_contact))
    created_contact = await contacts_collection.find_one({"_id": result.inserted_id})
    
    # Here you would typically send an email notification
    # await send_contact_notification(created_contact)
    
    return created_contact

@router.get("/", response_model=list[ContactResponse])
async def get_contacts(
    skip: int = 0,
    limit: int = 10,
    status: Optional[str] = None,
    is_read: Optional[bool] = None,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Get all contact form submissions (admin only)
    """
    contacts_collection = get_collection("contacts")
    
    # Build query
    query = {}
    if status:
        query["status"] = status
    if is_read is not None:
        query["is_read"] = is_read
    
    cursor = contacts_collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
    contacts = await cursor.to_list(length=limit)
    
    return contacts

@router.get("/{contact_id}", response_model=ContactResponse)
async def get_contact(
    contact_id: str,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Get a single contact form submission (admin only)
    """
    contacts_collection = get_collection("contacts")
    
    contact = await contacts_collection.find_one({"_id": contact_id})
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    
    # Mark as read when fetched
    await contacts_collection.update_one(
        {"_id": contact_id},
        {"$set": {"is_read": True}}
    )
    
    return contact

@router.put("/{contact_id}/status", response_model=ContactResponse)
async def update_contact_status(
    contact_id: str,
    status_data: dict,
    current_user: Dict[str, Any] = Depends(get_current_active_user)
):
    """
    Update contact status (admin only)
    """
    contacts_collection = get_collection("contacts")
    
    # Validate status
    valid_statuses = ["new", "in_progress", "completed", "spam"]
    if "status" not in status_data or status_data["status"] not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Status must be one of: {', '.join(valid_statuses)}"
        )
    
    # Update status
    result = await contacts_collection.update_one(
        {"_id": contact_id},
        {"$set": {"status": status_data["status"], "updated_at": datetime.utcnow()}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    
    updated_contact = await contacts_collection.find_one({"_id": contact_id})
    return updated_contact

# Add this to your main.py router includes
# app.include_router(contact.router, prefix="/api/contacts", tags=["Contacts"])

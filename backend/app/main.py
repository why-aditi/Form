from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from .models import FamilyMemberModel, FamilyMembersRequest
from .mongodb import connect_to_mongodb, close_mongodb_connection, get_database
from .config import settings

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongodb()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongodb_connection()

@app.post("/api/family-members", response_model=dict)
async def create_family_members(request: FamilyMembersRequest):
    try:
        db = get_database()
        # Create family members
        new_members = []
        for member in request.familyMembers:
            member_dict = member.dict(exclude={'id'})
            result = await db.family_members.insert_one(member_dict)
            new_members.append(str(result.inserted_id))
        
        return {"message": "Family members created successfully", "ids": new_members}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
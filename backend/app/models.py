from typing import List
from pydantic import BaseModel, Field
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid ObjectId')
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type='string')

class FamilyMemberModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias='_id')
    native_city: str = Field(..., min_length=1, description="City of origin")
    native_state: str = Field(..., min_length=1, max_length=1000, description="State of origin (2-letter code)")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "native_city": "New York",
                "native_state": "NY"
            }
        }

class FamilyMembersRequest(BaseModel):
    familyMembers: List[FamilyMemberModel]

    class Config:
        schema_extra = {
            "example": {
                "familyMembers": [
                    {"native_city": "New York", "native_state": "NY"},
                    {"native_city": "Los Angeles", "native_state": "CA"}
                ]
            }
        }
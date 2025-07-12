from pydantic import BaseModel, EmailStr
from typing import Optional

# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    username: str

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str

# Properties to return to client (never include password)
class User(UserBase):
    id: int
    points_balance: int

    class Config:
        from_attributes = True # Updated for Pydantic V2
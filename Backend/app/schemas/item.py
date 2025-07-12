from pydantic import BaseModel
from typing import Optional
from .user import User # Import User schema to nest it
from app.models.item import ItemStatus

class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    size: str
    condition: str

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    owner_id: int
    status: ItemStatus
    owner: User # Nested user information

    class Config:
        from_attributes = True
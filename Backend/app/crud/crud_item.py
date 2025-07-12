from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.item import Item
from app.schemas.item import ItemCreate

def get_item(db: Session, item_id: int) -> Optional[Item]:
    """
    Retrieves a single item by its ID.
    """
    return db.query(Item).filter(Item.id == item_id).first()

def get_items(db: Session, skip: int = 0, limit: int = 100) -> List[Item]:
    """
    Retrieves a list of items with pagination.
    """
    return db.query(Item).offset(skip).limit(limit).all()

def create_user_item(db: Session, item: ItemCreate, user_id: int) -> Item:
    """
    Creates a new item in the database and associates it with a user.
    """
    # The **item.model_dump() unpacks the Pydantic model into a dictionary
    db_item = Item(**item.model_dump(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
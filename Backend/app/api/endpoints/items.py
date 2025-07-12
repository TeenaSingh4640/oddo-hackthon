from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import models, schemas
from app.crud import crud_item
from app.api.endpoints.auth import get_db, get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.Item, status_code=status.HTTP_201_CREATED, summary="Create a new item")
def create_item(
    item: schemas.ItemCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Create a new item listing.
    - Requires authentication.
    - The item will be automatically associated with the logged-in user.
    """
    return crud_item.create_user_item(db=db, item=item, user_id=current_user.id)

@router.get("/", response_model=List[schemas.Item], summary="Get all listed items")
def read_items(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """
    Retrieve a list of all items. 
    - This is a public endpoint and does not require authentication.
    - Supports pagination with 'skip' and 'limit' query parameters.
    """
    items = crud_item.get_items(db, skip=skip, limit=limit)
    return items

@router.get("/{item_id}", response_model=schemas.Item, summary="Get a single item by ID")
def read_item(item_id: int, db: Session = Depends(get_db)):
    """
    Retrieve the details of a single item by its ID.
    - This is a public endpoint.
    """
    db_item = crud_item.get_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.post("/seed", summary="Seed sample data")
def seed_items(db: Session = Depends(get_db)):
    """
    Create sample items for testing.
    - This endpoint creates sample data for demonstration purposes.
    """
    sample_items = [
        {
            "title": "Vintage Denim Jacket",
            "description": "Classic blue denim jacket in excellent condition",
            "category": "Clothes",
            "size": "M",
            "condition": "Good",
            "owner_id": 1
        },
        {
            "title": "Leather Sneakers",
            "description": "Comfortable white leather sneakers",
            "category": "Footwear",
            "size": "42",
            "condition": "Like New",
            "owner_id": 1
        },
        {
            "title": "Silver Necklace",
            "description": "Elegant silver necklace with pendant",
            "category": "Accessories",
            "size": "One Size",
            "condition": "New",
            "owner_id": 1
        },
        {
            "title": "Cotton T-Shirt",
            "description": "Soft cotton t-shirt in navy blue",
            "category": "Clothes",
            "size": "L",
            "condition": "Good",
            "owner_id": 1
        },
        {
            "title": "Running Shoes",
            "description": "Lightweight running shoes for daily use",
            "category": "Footwear",
            "size": "41",
            "condition": "Fair",
            "owner_id": 1
        },
        {
            "title": "Wrist Watch",
            "description": "Classic analog wrist watch",
            "category": "Accessories",
            "size": "One Size",
            "condition": "Like New",
            "owner_id": 1
        }
    ]
    
    created_items = []
    for item_data in sample_items:
        item = schemas.ItemCreate(**item_data)
        created_item = crud_item.create_user_item(db=db, item=item, user_id=item_data["owner_id"])
        created_items.append(created_item)
    
    return {"message": f"Created {len(created_items)} sample items", "items": created_items}
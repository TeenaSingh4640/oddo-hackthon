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
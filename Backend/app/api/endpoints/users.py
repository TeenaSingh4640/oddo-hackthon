from fastapi import APIRouter, Depends

from app import models, schemas
from app.api.endpoints.auth import get_current_user

router = APIRouter()

@router.get("/me", response_model=schemas.User, summary="Get current user's profile")
def read_current_user(
    current_user: models.User = Depends(get_current_user)
):
    """
    Fetches the profile for the currently authenticated user.
    The `get_current_user` dependency handles the token verification and
    provides the user object.
    """
    return current_user
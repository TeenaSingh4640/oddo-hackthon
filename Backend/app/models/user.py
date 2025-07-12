from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    points_balance = Column(Integer, default=10) # Start with some points
    is_admin = Column(Boolean(), default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    items = relationship("Item", back_populates="owner")
from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.base import Base
import enum

class ItemStatus(str, enum.Enum):
    AVAILABLE = "available"
    PENDING = "pending"
    SWAPPED = "swapped"

class Item(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String)
    category = Column(String)
    size = Column(String)
    condition = Column(String)
    status = Column(Enum(ItemStatus), default=ItemStatus.AVAILABLE, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")
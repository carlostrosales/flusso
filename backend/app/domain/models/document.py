from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, UUID as SAUUID
from uuid import uuid
from app.core.db import Base

class Document(Base):
    __tablename__ = "documents"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    document = relationship("Document", back_populates="blocks")


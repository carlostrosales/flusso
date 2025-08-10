from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Text, UUID, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.core.db import Base


class Block(Base):
    __tablename__ = "blocks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id", ondelete="CASCADE"))
    role = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    document = relationship("Document", back_populates="blocks")

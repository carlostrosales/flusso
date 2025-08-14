from __future import annotations
from sqlalchemy.orm import relationship, mapped_column, Mapped
from sqlalchemy import String, Column, DateTime
from uuid import uuid
from app.core.db import Base
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .document import Block


class Document(Base):
    __tablename__ = "document"

    document_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    blocks: Mapped[List["Block"]] = relationship(
        back_populates="document", cascade="all, delete-orphan"
    )

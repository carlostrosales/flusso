from __future__ import annotations
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Column, String, Text, UUID, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.core.db import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .document import Document


class Block(Base):
    __tablename__ = "block"

    block_id: MappedColumn[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    document_id: Mapped[uuid:UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("documents.id", ondelete="CASCADE")
    )
    role: Mapped[str] = mapped_column(String, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    document: Mapped["Document"] = relationship(back_populates="blocks")

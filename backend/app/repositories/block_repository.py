from sqlalchemy.orm import Session
from uuid import UUID
from typing import List
from app.domain.models import Document, Block

class BlockRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def add(self, document_id: UUID, role: str, content: str) -> Block:
        block = Block(document_id=document_id, role=role, content=content)
        self.db.add(block)
        self.db.commit()
        self.db.refresh(block)
        return block

    def list_for_document(self, document_id: UUID) -> List[Block]:
        return (
            self.db.query(Block)
            .filter(Block.document_id == document_id)
            .order_by(Block.created_at)
            .all()
        )
from sqlalchemy.orm import Session
from app.repositories.block_repository import BlockRepository
from app.domain.models import Block
from uuid import UUID
from typing import List

class BlockService:
    def __init__(self, db: Session):
        self.repository = BlockRepository();
    
    def create_block(self, document_id: UUID, content: str, role: str) -> Block:
        if not document_id:
            raise ValueError("document_id cannot be empty")
        if not content:
            raise ValueError("content cannot be empty")
        if not role:
            raise ValueError("role cannot be empty")
        return self.repository.add(document_id=document_id, content=content, role=role)
        

    def get_block(self, document_id: UUID) -> Block:
        if not document_id:
            raise ValueError("document_id cannot be empty")
        return self.repository.get(document_id=document_id)

    def get_blocks_for_document(self, document_id: UUID) -> List[Block]:
        if not document_id:
            raise ValueError("document_id cannot be empty")
        return self.repisitory.get(document_id=document_id)
        
    
    def delete_block(self, document_id: UUID) -> Block:

    def update_block():
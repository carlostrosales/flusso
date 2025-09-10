from uuid import UUID
from typing import List, Optional
from sqlalchemy.orm import Session
from app.repositories.document_repository import DocumentRepository
from app.domain.models import Document

class DocumentService:
    def __init__(self, db: Session):
        self.repository = DocumentRepository(db);

    def create_document(self, title: str) -> Document:
        """Create a new document with validation"""
        if not title or title.strip() == "":
            raise ValueError("Document title cannot be empty.")
        
        return self.repository.create(title.strip())
    
    def get_document(self, doc_id: UUID) -> Document:
        """Get a document by ID"""
        return self.repository.get(doc_id)
    
    def get_all_documents(self) -> List[Document]:
        """Get all documents"""
        return self.repository.get_all()
    
    def update_document(self, doc_id: UUID, title: str) -> Optional[Document]:
        """Update document with validation"""
        if not title or title.strip() == "":
            raise ValueError("Document title cannot be empty.")
        document = self.repository.get(doc_id)
        if not document:
            return None
        return self.repository.update(doc_id, title.strip())

    def delete_document(self, doc_id: UUID) -> bool:
        """Delete a document by ID"""
        self.repository.delete(doc_id)
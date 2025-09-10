from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from app.domain.models import Document, Block


class DocumentRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def create(self, title: str) -> Document:
        doc = Document(title=title)
        self.db.add(doc)
        self.db.commit()
        self.db.refresh(doc)
        return doc

    def get(self, doc_id: UUID) -> Optional[Document]:
        return self.db.query(Document).filter(Document.id == doc_id).first()
    
    def get_all(self) -> List[Document]:
        return self.db.query(Document).all()
    
    def update(self, doc_id: UUID, title: str) -> Optional[Document]:
        doc = self.get(doc_id)
        if doc:
            doc.title = title
            self.db.commit()
            self.db.refresh(doc)
        return doc
    
    def delete(self, doc_id: UUID) -> bool:
        doc = self.get(doc_id)
        if doc:
            self.db.delete(doc)
            self.db.commit()
            return True
        return False

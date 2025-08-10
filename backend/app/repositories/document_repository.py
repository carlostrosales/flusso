from sqlalchemy.orm import Session
from uuid import UUID
from typing import List
from app.domain.models import Document, Block


class DocumentRepository:
    def __init__(self, db: Session) -> Document:
        self.db = db
    
    def create(self, title: str) -> Document:
        doc = Document(title=title)
        self.db.add(doc)
        self.db.commit()
        self.db.refresh(doc)
        return doc

    def get(self, doc_id: UUID) -> Document | None:
        return self.db.query(Document).filter(Document.id == doc_id).first()
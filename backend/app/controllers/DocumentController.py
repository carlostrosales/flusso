from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.service.DocumentService import DocumentService
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.db import get_db

router = APIRouter(prefix="/documents", tags=["documents"])

# DTOs (Data Transfer Objects)
class DocumentRequest(BaseModel):
    title: str

class DocumentResponse(BaseModel):
    id: str
    title: str

def get_document_service(db: Session = Depends(get_db)) -> DocumentService:
    return DocumentService(db)

# REST API Endpoints
@router.post("/")
async def create_document(title: str, service: DocumentService = Depends(get_document_service)):
    try:
        document = service.create_document(title)
        return { "id": str(document.document_id), "title": document.title}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{doc_id}")
async def get_document(doc_id: UUID, service: DocumentService = Depends(get_document_service)):
    document = service.get_document(doc_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document




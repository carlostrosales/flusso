from pydantic import BaseModel
from fastapi import HTTPException, APIRouter
from app.service.AskService import AskService
from typing import Optional

router = APIRouter(
    prefix="/asks",
    tags=["asks"],
    responses={404: {"description": "Document not found"}},
)

class AskRequest(BaseModel):
    question: str
    documentId: Optional[str] = None
    blockId: Optional[str] = None


class AskResponse(BaseModel):
    id: str
    answer: str

@router.post("/", response_model=AskResponse)
async def ask(request: AskRequest):
    if not request.question:
        raise HTTPException(
            status_code=400, detail="Client Error: Question not provided"
        )
    service = AskService()
    respId, answer = service.askQuestion(request.question)
    if not answer:
        raise HTTPException(
            status_code=502, detail="Gateway Error: Failed to get an answer"
        )
    return AskResponse(id=respId, answer=answer)
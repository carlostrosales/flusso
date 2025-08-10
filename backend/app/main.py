from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.routers import hello
from pydantic import BaseModel
from typing import Optional
from app.service.AskService import AskService


class AskRequest(BaseModel):
    question: str
    documentId: Optional[str] = None
    blockId: Optional[str] = None

class AskResponse(BaseModel):
    id: str
    answer: str


app = FastAPI(
    title="Flusso API",
    description="A FastAPI backend for Flusso application",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(hello.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Flusso API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/ask", response_model=AskResponse)
async def ask(request: AskRequest):
    if not request.question:
        raise HTTPException(status_code=400, detail="Client Error: Question not provided")
    service = AskService()
    respId, answer = service.askQuestion(request.question)
    if not answer:
        raise HTTPException(status_code=502, detail="Gateway Error: Failed to get an answer")
    return AskResponse(id=respId, answer=answer)

@app.post

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import DocumentController, AskController
from app.core.db import Base, engine


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

# Include routers (like registering controllers in other web frameworks)
app.include_router(DocumentController.router)
app.include_router(AskController.router)


@app.on_event("startup")
async def on_startup():
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully")


@app.get("/")
async def root():
    return {"message": "Welcome to Flusso API"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


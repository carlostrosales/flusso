from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import hello

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

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Flusso API"}

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_hello():
    response = client.get("/hello/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello from FastAPI"}

def test_hello_world():
    response = client.get("/hello/world")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World from FastAPI"}

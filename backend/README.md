# Flusso Backend

A FastAPI backend application for the Flusso project.

## Features

- FastAPI framework with automatic API documentation
- PostgreSQL database integration
- CORS support for frontend communication
- Docker containerization
- Test suite with pytest
- Health check endpoints

## Development

### Prerequisites

- Python 3.11+
- PostgreSQL (or use Docker)
- Docker and Docker Compose

### Local Development

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Run the application:

```bash
uvicorn app.main:app --reload --port 8080
```

3. Run tests:

```bash
pytest
```

### Docker Development

1. Build and run with Docker Compose:

```bash
docker-compose up --build
```

## API Documentation

Once the server is running, you can access:

- API Documentation (Swagger UI): http://localhost:8080/docs
- Alternative API Documentation (ReDoc): http://localhost:8080/redoc
- Health Check: http://localhost:8080/health

## Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /hello/` - Simple hello message
- `GET /hello/world` - Hello world message

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (set automatically in Docker Compose)

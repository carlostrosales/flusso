from fastapi import APIRouter

router = APIRouter(
    prefix="/hello",
    tags=["hello"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def hello():
    """
    Simple hello endpoint equivalent to the Java Quarkus version.
    Returns a plain text greeting message.
    """
    return {"message": "Hello from FastAPI"}

@router.get("/world")
async def hello_world():
    """
    Extended hello endpoint with world greeting.
    """
    return {"message": "Hello World from FastAPI"}

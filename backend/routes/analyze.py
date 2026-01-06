from fastapi import APIRouter
from backend.models.schemas import CodeRequest
from backend.services.solution_generator import generate_solutions

router = APIRouter()

@router.post("/")
def analyze_code(request: CodeRequest):
    return generate_solutions(request.code, request.language)

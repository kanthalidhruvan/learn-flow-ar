from fastapi import APIRouter
from backend.models.schemas import CodeRequest
from backend.services.solution_generator import generate_solutions
from backend.services.evaluator import evaluate_code

router = APIRouter()

@router.post("/")
def evaluate(request: CodeRequest):
    # Step 1: Analyze code (reuse same pipeline as /analyze)
    analysis_result = generate_solutions(
        request.code,
        request.language
    )

    # Step 2: Evaluate using analysis output
    evaluation = evaluate_code(
        request.code,
        request.language,
        analysis_result["analysis"]
    )

    return evaluation

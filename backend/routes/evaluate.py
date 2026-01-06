# from fastapi import APIRouter

# router = APIRouter()

# @router.post("/")
# def evaluate_code():
#     return {
#         "overallScore": 78,
#         "grade": "B+",
#         "metrics": [],
#         "feedback": {
#             "strengths": [],
#             "improvements": [],
#             "recommendations": []
#         },
#         "graphAnalysis": {
#             "astComplexity": 12,
#             "cfgComplexity": 8,
#             "semanticSimilarity": 87
#         }
#     }
from fastapi import APIRouter
#from models.schemas import CodeRequest
from backend.models.schemas import CodeRequest
from backend.services.evaluator import evaluate_code

router = APIRouter()

@router.post("/")
def evaluate(request: CodeRequest):
    return evaluate_code(request.code, request.language)

from fastapi import APIRouter

router = APIRouter()

@router.post("/")
def evaluate_code():
    return {
        "overallScore": 78,
        "grade": "B+",
        "metrics": [],
        "feedback": {
            "strengths": [],
            "improvements": [],
            "recommendations": []
        },
        "graphAnalysis": {
            "astComplexity": 12,
            "cfgComplexity": 8,
            "semanticSimilarity": 87
        }
    }

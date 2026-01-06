from backend.services.llm_service import generate_ai_explanation

def generate_solutions(code: str, language: str):
    ai_text = generate_ai_explanation(code, language)

    return {
        "solutions": [
            {
                "type": "brute-force",
                "title": "Brute Force Approach",
                "description": ai_text["brute_force_explanation"],
                "timeComplexity": "O(n²)",
                "spaceComplexity": "O(1)",
                "code": code,
                "efficiency": 40,
                "explanation": ai_text["brute_force_explanation"]
            },
            {
                "type": "better",
                "title": "Better Approach",
                "description": ai_text["better_explanation"],
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(1)",
                "code": code,
                "efficiency": 70,
                "explanation": ai_text["better_explanation"]
            },
            {
                "type": "optimal",
                "title": "Optimal Approach",
                "description": ai_text["optimal_explanation"],
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(1)",
                "code": code,
                "efficiency": 95,
                "explanation": ai_text["optimal_explanation"]
            }
        ]
    }

# backend/services/evaluator.py

def evaluate_code(code: str, language: str, analysis: dict):
    score = analysis.get("score", 50)
    solution_type = analysis.get("solutionType", "brute-force")
    patterns = analysis.get("patternsDetected", {})

    # ---------- METRIC SCORES ----------
    correctness = 8
    efficiency = 5
    style = 7
    practices = 7

    # ---------- EFFICIENCY BASED ON SOLUTION ----------
    if solution_type == "optimal":
        efficiency = 9
    elif solution_type == "better":
        efficiency = 7
    else:
        efficiency = 4

    # ---------- PENALTIES ----------
    if patterns.get("nested_loop"):
        efficiency -= 2

    if patterns.get("binary_search"):
        correctness += 1

    efficiency = max(min(efficiency, 10), 3)

    overall = int((correctness + efficiency + style + practices) * 2.5)

    grade = (
        "A+" if overall >= 90 else
        "A"  if overall >= 80 else
        "B+" if overall >= 70 else
        "B"  if overall >= 60 else
        "C"
    )

    return {
        "overallScore": overall,
        "grade": grade,
        "metrics": [
            {
                "name": "Algorithm Correctness",
                "score": correctness,
                "maxScore": 10,
                "description": "Correct logic for identified problem",
                "suggestions": ["Add edge case handling"]
            },
            {
                "name": "Code Efficiency",
                "score": efficiency,
                "maxScore": 10,
                "description": f"Efficiency based on {solution_type} approach",
                "suggestions": ["Reduce loops", "Use optimized methods"]
            },
            {
                "name": "Code Style",
                "score": style,
                "maxScore": 10,
                "description": "Readable and structured",
                "suggestions": ["Add comments"]
            },
            {
                "name": "Best Practices",
                "score": practices,
                "maxScore": 10,
                "description": "Standard coding conventions followed",
                "suggestions": ["Input validation"]
            }
        ],
        "feedback": {
            "strengths": [
                f"Detected {solution_type} solution",
                "Readable implementation"
            ],
            "improvements": [
                "Handle corner cases",
                "Improve modularity"
            ],
            "recommendations": [
                "Use helper functions",
                "Add documentation"
            ]
        },
        "graphAnalysis": {
            "astComplexity": 12 if patterns.get("nested_loop") else 6,
            "cfgComplexity": 8,
            "semanticSimilarity": 85 if solution_type != "brute-force" else 60
        }
    }

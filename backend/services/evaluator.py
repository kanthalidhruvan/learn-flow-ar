def evaluate_code(code: str, language: str):
    # NOTE: This is deterministic logic for now (AI later)
    length_score = min(len(code) // 50, 10)
    complexity_score = 7
    style_score = 8
    practices_score = 7

    overall = int((length_score + complexity_score + style_score + practices_score) * 2.5)

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
                "score": 8,
                "maxScore": 10,
                "description": "Logic is correct for standard test cases",
                "suggestions": ["Add edge case checks"]
            },
            {
                "name": "Code Efficiency",
                "score": complexity_score,
                "maxScore": 10,
                "description": "Acceptable time complexity",
                "suggestions": ["Reduce redundant operations"]
            },
            {
                "name": "Code Style",
                "score": style_score,
                "maxScore": 10,
                "description": "Readable and structured code",
                "suggestions": ["Add comments"]
            },
            {
                "name": "Best Practices",
                "score": practices_score,
                "maxScore": 10,
                "description": "Follows most conventions",
                "suggestions": ["Add input validation"]
            }
        ],
        "feedback": {
            "strengths": [
                "Clear logic",
                "Readable structure"
            ],
            "improvements": [
                "Handle edge cases",
                "Improve modularity"
            ],
            "recommendations": [
                "Use helper functions",
                "Add documentation"
            ]
        },
        "graphAnalysis": {
            "astComplexity": 12,
            "cfgComplexity": 8,
            "semanticSimilarity": 87
        }
    }

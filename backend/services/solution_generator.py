# services/solution_generator.py
def generate_solutions(code, language):
    return {
        "solutions": [
            {
                "type": "brute-force",
                "title": "Brute Force Approach",
                "description": "Simple iterative solution",
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(1)",
                "code": code,
                "efficiency": 45,
                "explanation": "Checks each element sequentially"
            },
            {
                "type": "better",
                "title": "Improved Approach",
                "description": "Reduced operations",
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(1)",
                "code": code,
                "efficiency": 70,
                "explanation": "Optimized loop usage"
            },
            {
                "type": "optimal",
                "title": "Optimal Approach",
                "description": "Best possible solution",
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(1)",
                "code": code,
                "efficiency": 95,
                "explanation": "Uses optimal logic"
            }
        ]
    }

# backend/services/solution_generator.py

# --------------------------------------------------
# IMPORTS
# --------------------------------------------------
from backend.services.problem_detector import detect_problem
from backend.services.handlers.linear_search import get_solutions as linear_search
from backend.services.handlers.array_max_min import get_solutions as array_max_min
from backend.services.handlers.sorting import get_solutions as sorting
from backend.services.handlers.merge_sort import get_solutions as merge_sort
from backend.services.handlers.quick_sort import get_solutions as quick_sort
from backend.services.ar_payload_generator import generate_ar_payload
from backend.services.ar_generator import generate_ar_payload
# --------------------------------------------------
# LANGUAGE DETECTION (FALLBACK LOGIC)
# --------------------------------------------------
def detect_language_from_code(code: str):
    code_lower = code.lower()

    if "def " in code_lower and ":" in code_lower:
        return "python"
    if "function" in code_lower or "=>" in code_lower or "let " in code_lower:
        return "javascript"
    if "public static" in code_lower or "system.out" in code_lower:
        return "java"
    if "#include" in code_lower and "printf" in code_lower:
        return "c"
    if "#include" in code_lower and ("std::" in code_lower or "cout" in code_lower):
        return "cpp"

    return "unknown"


# --------------------------------------------------
# PATTERN ANALYSIS (LANGUAGE-AGNOSTIC)
# --------------------------------------------------
def analyze_patterns(code: str, language: str):
    code_lower = code.lower()

    return {
        "nested_loop": (
            code_lower.count("for") >= 2
            or (code_lower.count("for") >= 1 and code_lower.count("while") >= 1)
        ),
        "single_loop": code_lower.count("for") == 1 and code_lower.count("while") == 0,
        "while_loop": "while" in code_lower,
        "recursion": (
            "def" in code_lower
            or "void" in code_lower
            or "int" in code_lower
        ) and code_lower.count("(") > 1,
        "built_in": any(
            x in code_lower
            for x in [
                "max(", "min(", "sorted(",
                "math.max", ".sort(",
                "collections.max", "arrays.sort",
                "std::max", "max_element"
            ]
        ),
        "binary_search": any(
            x in code_lower for x in ["binary_search", "low", "high", "mid"]
        ),
    }


# --------------------------------------------------
# CLASSIFICATION + SCORING
# --------------------------------------------------
def classify_solution(patterns):
    score = 50

    if patterns["nested_loop"]:
        return "brute-force", "O(n²)", 40

    if patterns["binary_search"]:
        return "optimal", "O(log n)", 90

    if patterns["built_in"]:
        return "optimal", "O(n)", 85

    if patterns["single_loop"]:
        return "better", "O(n)", 70

    return "brute-force", "O(n²)", 45


# --------------------------------------------------
# FALLBACK SOLUTION GENERATOR
# --------------------------------------------------
def generate_solution_variants(language: str):
    language = language.lower()

    if language == "python":
        return {
            "brute": "for i in range(n):\n    for j in range(n):\n        pass",
            "better": "for i in range(n):\n    pass",
            "optimal": "max(arr)"
        }

    if language == "javascript":
        return {
            "brute": "for(let i=0;i<n;i++){ for(let j=0;j<n;j++){} }",
            "better": "for(let i=0;i<n;i++){}",
            "optimal": "Math.max(...arr)"
        }

    if language == "java":
        return {
            "brute": "for(int i=0;i<n;i++){ for(int j=0;j<n;j++){} }",
            "better": "for(int i=0;i<n;i++){}",
            "optimal": "Collections.max(list);"
        }

    return {}


# --------------------------------------------------
# MAIN PIPELINE (USED BY /api/analyze)
# --------------------------------------------------
def generate_solutions(code: str, language: str):
    # 1. Detect language
    detected_language = detect_language_from_code(code)

    # 2. Detect problem
    problem = detect_problem(code)

    # 3. Analyze patterns
    patterns = analyze_patterns(code, detected_language)

    # 4. Classify solution
    solution_type, time_complexity, score = classify_solution(patterns)

    # 5. Select correct handler
    if problem == "linear_search":
       variants = linear_search(detected_language)
    elif problem == "array_max_min":
       variants = array_max_min(detected_language)
    elif problem == "sorting":
       variants = sorting(detected_language)
    elif problem == "merge_sort":
       variants = merge_sort(detected_language)
    elif problem == "quick_sort":
       variants = quick_sort(detected_language)
    else:
       variants = generate_solution_variants(detected_language)

    # if problem == "linear_search":
    #     variants = linear_search(detected_language)
    # elif problem == "array_max_min":
    #     variants = array_max_min(detected_language)
    # else:
    #     variants = generate_solution_variants(detected_language)

    # 6. Final response
    ar_payload = generate_ar_payload(problem, code)
    #ar_payload = generate_ar_payload(problem, code)
    return {
        "detectedLanguage": detected_language,
        "problemDetected": problem,
        "analysis": {
            "solutionType": solution_type,
            "timeComplexity": time_complexity,
            "score": score,
            "patternsDetected": patterns,
        },
        "solutions": [
            {
                "type": "brute-force",
                "title": "Brute Force Approach",
                "description": f"Brute force solution for {problem}.",
                "timeComplexity": "O(n²)",
                "spaceComplexity": "O(1)",
                "efficiency": 40,
                "code": variants.get("brute", ""),
                "explanation": "Checks all possible combinations."
            },
            {
                "type": "better",
                "title": "Better Approach",
                "description": f"Improved solution for {problem}.",
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(1)",
                "efficiency": 70,
                "code": variants.get("better", ""),
                "explanation": "Reduces unnecessary work."
            },
            {
                "type": "optimal",
                "title": "Optimal Approach",
                "description": f"Most efficient solution for {problem}.",
                "timeComplexity": time_complexity,
                "spaceComplexity": "O(1)",
                "efficiency": score,
                "code": variants.get("optimal", ""),
                "explanation": "Best known approach."
            }
        ],"arPayload": ar_payload
    }

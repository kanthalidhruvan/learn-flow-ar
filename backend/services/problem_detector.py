# backend/services/problem_detector.py

def detect_problem(code: str):
    code_lower = code.lower()

    # -------- Binary Search --------
    if (
        "mid" in code_lower and
        "low" in code_lower and
        "high" in code_lower and
        ("while" in code_lower or "for" in code_lower)
    ):
        return "binary_search"

    # -------- Linear Search --------
    if (
        "for" in code_lower and
        "if" in code_lower and
        ("==" in code_lower or "equals" in code_lower)
    ):
        return "linear_search"

    # -------- Sorting --------
    if (
        "swap" in code_lower or
        "arr[j] > arr[j+1]" in code_lower or
        "sorted(" in code_lower or
        ".sort(" in code_lower
    ):
        return "sorting"

    return "unknown"
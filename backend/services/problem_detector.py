# backend/services/problem_detector.py

def detect_problem(code: str):
    code_lower = code.lower()

    # ---------- BINARY SEARCH ----------
    if "low" in code_lower and "high" in code_lower and "mid" in code_lower:
        return "binary_search"

    # ---------- MERGE SORT ----------
    if (
        "merge" in code_lower
        and ("mid" in code_lower or "len(arr)//2" in code_lower)
        and ("def" in code_lower or "function" in code_lower)
    ):
        return "merge_sort"

    # ---------- QUICK SORT ----------
    if (
        "pivot" in code_lower
        and ("partition" in code_lower or "i<j" in code_lower)
    ):
        return "quick_sort"

    # ---------- BUBBLE / MANUAL SORT ----------
    if (
        code_lower.count("for") >= 2
        and "arr[j]" in code_lower
        and "arr[j+1]" in code_lower
    ):
        return "sorting"

    # ---------- ARRAY MAX / MIN ----------
    if (
        "max" in code_lower
        or "min" in code_lower
        or ("arr[i]" in code_lower and ">" in code_lower)
    ):
        return "array_max_min"

    # ---------- LINEAR SEARCH ----------
    if (
        "for" in code_lower
        and "if" in code_lower
        and "==" in code_lower
    ):
        return "linear_search"

    return "unknown"

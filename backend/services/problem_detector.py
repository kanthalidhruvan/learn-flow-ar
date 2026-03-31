# backend/services/problem_detector.py

def detect_problem(code: str):
    code_lower = code.lower()

    # -------- Binary Search --------
    if (
        ("mid" in code_lower or "middle" in code_lower) and
        ("low" in code_lower or "left" in code_lower) and
        ("high" in code_lower or "right" in code_lower)
    ):
        return "binary_search"

    # -------- Merge Sort --------
    if (
        "merge" in code_lower and
        ("sort" in code_lower or "divide" in code_lower)
    ):
        return "merge_sort"

    # -------- Quick Sort --------
    if (
        "pivot" in code_lower or
        "partition" in code_lower or
        ("quick" in code_lower and "sort" in code_lower)
    ):
        return "quick_sort"

    # -------- Sorting --------
    if (
        "swap" in code_lower or
        "bubble" in code_lower or
        "selection" in code_lower or
        "insertion" in code_lower or
        ".sort(" in code_lower or
        "sorted(" in code_lower or
        "arr[j] > arr[j+1]" in code_lower or
        "arr[j]>arr[j+1]" in code_lower
    ):
        return "sorting"

    # -------- Array Max Min --------
    if (
        ("max" in code_lower or "min" in code_lower) and
        ("arr" in code_lower or "array" in code_lower or "list" in code_lower) and
        ("for" in code_lower or "while" in code_lower)
    ):
        return "array_max_min"

    # -------- Linear Search --------
    if (
        ("for" in code_lower or "while" in code_lower) and
        ("==" in code_lower or "equals" in code_lower or "target" in code_lower or
         "search" in code_lower or "find" in code_lower) and
        ("return" in code_lower or "found" in code_lower)
    ):
        return "linear_search"

    # -------- Sum Array --------
    if (
        "sum" in code_lower and
        ("arr" in code_lower or "array" in code_lower or
         "list" in code_lower or "for" in code_lower)
    ):
        return "sum_array"

    # -------- Counting --------
    if (
        "count" in code_lower and
        ("arr" in code_lower or "array" in code_lower or
         "list" in code_lower or "for" in code_lower)
    ):
        return "counting"

    # -------- Loop (generic fallback) --------
    if "for" in code_lower or "while" in code_lower:
        return "loop"

    return "unknown"
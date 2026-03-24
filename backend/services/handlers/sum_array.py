def get_solutions(language: str):
    return {
        "brute": "count = 0\nfor i in arr:\n if i == target:\n  count += 1",
        "better": "arr.count(target)",
        "optimal": "collections.Counter(arr)"
    }
def get_solutions(language: str):
    return {
        "brute": "for i in range(n): print(i)",
        "better": "for i in range(n): pass",
        "optimal": "range(n)"
    }
# backend/services/handlers/quick_sort.py

def get_solutions(language: str):
    if language == "python":
        return {
            "brute": "Bubble sort",
            "better": "Quick sort with partition",
            "optimal": "sorted(arr)"
        }

    if language == "javascript":
        return {
            "brute": "Bubble sort",
            "better": "Quick sort recursion",
            "optimal": "arr.sort((a,b)=>a-b)"
        }

    if language == "java":
        return {
            "brute": "Bubble sort",
            "better": "Quick sort algorithm",
            "optimal": "Arrays.sort(arr)"
        }

    return {}

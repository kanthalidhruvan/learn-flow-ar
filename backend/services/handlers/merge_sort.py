# backend/services/handlers/merge_sort.py

def get_solutions(language: str):
    if language == "python":
        return {
            "brute": "Use bubble sort (nested loops)",
            "better": "Use merge sort with recursion",
            "optimal": "sorted(arr)  # TimSort (O(n log n))"
        }

    if language == "javascript":
        return {
            "brute": "Bubble sort using nested loops",
            "better": "Recursive merge sort",
            "optimal": "arr.sort((a,b)=>a-b)"
        }

    if language == "java":
        return {
            "brute": "Bubble sort",
            "better": "Merge sort implementation",
            "optimal": "Arrays.sort(arr)"
        }

    return {}

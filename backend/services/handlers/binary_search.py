# backend/services/handlers/binary_search.py

def get_solutions(language: str):
    if language == "python":
        return {
            "brute": "for i in range(len(arr)):\n    if arr[i] == x:\n        return i",
            "better": "for i, v in enumerate(arr):\n    if v == x:\n        return i",
            "optimal": (
                "low, high = 0, len(arr)-1\n"
                "while low <= high:\n"
                "    mid = (low+high)//2\n"
                "    if arr[mid] == x: return mid\n"
                "    elif arr[mid] < x: low = mid+1\n"
                "    else: high = mid-1"
            )
        }
    return {}

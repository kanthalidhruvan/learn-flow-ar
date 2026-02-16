# backend/services/handlers/sorting.py

def get_solutions(language: str):
    language = language.lower()

    if language == "python":
        return {
            "brute": (
                "for i in range(n):\n"
                "    for j in range(0, n-i-1):\n"
                "        if arr[j] > arr[j+1]:\n"
                "            arr[j], arr[j+1] = arr[j+1], arr[j]"
            ),
            "better": (
                "arr.sort()  # TimSort (optimized)"
            ),
            "optimal": (
                "sorted(arr)"
            )
        }

    if language == "javascript":
        return {
            "brute": (
                "for(let i=0;i<n;i++){\n"
                "  for(let j=0;j<n-i-1;j++){\n"
                "    if(arr[j]>arr[j+1]){\n"
                "      [arr[j],arr[j+1]]=[arr[j+1],arr[j]];\n"
                "    }\n"
                "  }\n"
                "}"
            ),
            "better": "arr.sort((a,b)=>a-b)",
            "optimal": "arr.sort((a,b)=>a-b)"
        }

    if language == "java":
        return {
            "brute": (
                "for(int i=0;i<n;i++){\n"
                "  for(int j=0;j<n-i-1;j++){\n"
                "    if(arr[j]>arr[j+1]){\n"
                "      int t=arr[j]; arr[j]=arr[j+1]; arr[j+1]=t;\n"
                "    }\n"
                "  }\n"
                "}"
            ),
            "better": "Arrays.sort(arr);",
            "optimal": "Arrays.sort(arr);"
        }

    return {}

# backend/services/handlers/linear_search.py

def get_solutions(language: str):
    language = language.lower()

    if language == "python":
        return {
            "brute": (
                "for i in range(len(arr)):\n"
                "    if arr[i] == x:\n"
                "        return i\n"
                "return -1"
            ),
            "better": (
                "for idx, val in enumerate(arr):\n"
                "    if val == x:\n"
                "        return idx\n"
                "return -1"
            ),
            "optimal": (
                "# Linear search is already optimal\n"
                "for i, v in enumerate(arr):\n"
                "    if v == x:\n"
                "        return i"
            )
        }

    if language == "javascript":
        return {
            "brute": "for(let i=0;i<arr.length;i++){ if(arr[i]===x) return i; }",
            "better": "return arr.indexOf(x);",
            "optimal": "return arr.indexOf(x);"
        }

    if language == "java":
        return {
            "brute": (
                "for(int i=0;i<arr.length;i++){\n"
                "    if(arr[i]==x) return i;\n"
                "}\nreturn -1;"
            ),
            "better": "return IntStream.range(0, arr.length).filter(i -> arr[i]==x).findFirst().orElse(-1);",
            "optimal": "return Arrays.asList(arr).indexOf(x);"
        }

    if language == "c":
        return {
            "brute": (
                "for(int i=0;i<n;i++){\n"
                "    if(arr[i]==x) return i;\n"
                "}\nreturn -1;"
            ),
            "better": "/* single loop search */",
            "optimal": "/* linear search is optimal */"
        }

    if language in ["cpp", "c++"]:
        return {
            "brute": (
                "for(int i=0;i<n;i++){\n"
                "    if(arr[i]==x) return i;\n"
                "}\nreturn -1;"
            ),
            "better": "auto it = find(arr.begin(), arr.end(), x);",
            "optimal": "return find(arr.begin(), arr.end(), x) - arr.begin();"
        }

    return {}

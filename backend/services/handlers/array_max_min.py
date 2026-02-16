# backend/services/handlers/array_max_min.py

def get_solutions(language: str):
    language = language.lower()

    if language == "python":
        return {
            "brute": (
                "max_val = arr[0]\n"
                "for i in range(len(arr)):\n"
                "    for j in range(len(arr)):\n"
                "        if arr[j] > max_val:\n"
                "            max_val = arr[j]"
            ),
            "better": (
                "max_val = arr[0]\n"
                "for v in arr:\n"
                "    if v > max_val:\n"
                "        max_val = v"
            ),
            "optimal": "max(arr)"
        }

    if language == "javascript":
        return {
            "brute": "for(let i=0;i<arr.length;i++){ for(let j=0;j<arr.length;j++){} }",
            "better": "let max=arr[0]; for(let v of arr){ if(v>max) max=v; }",
            "optimal": "Math.max(...arr)"
        }

    if language == "java":
        return {
            "brute": (
                "int max=arr[0];\n"
                "for(int i=0;i<arr.length;i++){\n"
                "  for(int j=0;j<arr.length;j++){\n"
                "    if(arr[j]>max) max=arr[j];\n"
                "  }\n}"
            ),
            "better": (
                "int max=arr[0];\n"
                "for(int v:arr){ if(v>max) max=v; }"
            ),
            "optimal": "Collections.max(list);"
        }

    if language == "c":
        return {
            "brute": "/* nested loop max */",
            "better": "/* single pass max */",
            "optimal": "/* single pass max */"
        }

    if language in ["cpp", "c++"]:
        return {
            "brute": "/* nested loop max */",
            "better": "int max=arr[0]; for(int v:arr) if(v>max) max=v;",
            "optimal": "*max_element(arr.begin(), arr.end())"
        }

    return {}

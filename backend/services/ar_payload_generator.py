# backend/services/ar_payload_generator.py

from backend.services.ar_animation_engine import (
    generate_linear_search_animation,
    generate_binary_search_animation,
    generate_sorting_animation,
    generate_array_max_min_animation
)


def generate_ar_payload(problem: str, code: str, language: str):

    # ─────────────────────────────────────────
    # LINEAR SEARCH
    # ─────────────────────────────────────────
    if problem == "linear_search":
        arr = [5, 8, 3, 7, 2]
        target = 7
        animations, explanations = generate_linear_search_animation(arr, target)
        nodes = [
            {"id": i, "label": str(val), "type": "array_element",
             "position": [i * 2, 0, 0], "color": "blue", "scale": 1}
            for i, val in enumerate(arr)
        ]
        return {
            "visualizationType": "array_traversal",
            "scene": "LinearSearchScene",
            "cameraPosition": [0, 5, -12],
            "metadata": {
                "problem": problem,
                "language": language,
                "totalSteps": len(animations)
            },
            "nodes": nodes,
            "edges": [],
            "animations": animations,
            "explanationOverlay": explanations
        }

    # ─────────────────────────────────────────
    # BINARY SEARCH
    # ─────────────────────────────────────────
    if problem == "binary_search":
        arr = [1, 3, 5, 7, 9, 11, 13]
        target = 9
        animations, explanations = generate_binary_search_animation(arr, target)
        nodes = [
            {"id": i, "label": str(val), "type": "array_element",
             "position": [i * 2, 0, 0], "color": "blue", "scale": 1}
            for i, val in enumerate(arr)
        ]
        return {
            "visualizationType": "divide_and_conquer",
            "scene": "BinarySearchScene",
            "cameraPosition": [0, 6, -14],
            "metadata": {
                "problem": problem,
                "language": language,
                "totalSteps": len(animations)
            },
            "nodes": nodes,
            "edges": [],
            "animations": animations,
            "explanationOverlay": explanations
        }

    # ─────────────────────────────────────────
    # SORTING (Bubble Sort)
    # ─────────────────────────────────────────
    if problem == "sorting":
        arr = [5, 2, 8, 1, 4]
        animations, explanations = generate_sorting_animation(arr)
        nodes = [
            {"id": i, "label": str(val), "type": "array_element",
             "position": [i * 2, 0, 0], "color": "blue", "scale": 1}
            for i, val in enumerate(arr)
        ]
        return {
            "visualizationType": "swap_animation",
            "scene": "SortingScene",
            "cameraPosition": [0, 6, -12],
            "metadata": {
                "problem": problem,
                "language": language,
                "totalSteps": len(animations)
            },
            "nodes": nodes,
            "edges": [],
            "animations": animations,
            "explanationOverlay": explanations
        }

    # ─────────────────────────────────────────
    # ARRAY MAX MIN
    # ─────────────────────────────────────────
    if problem == "array_max_min":
        arr = [5, 8, 3, 7, 2]
        animations, explanations = generate_array_max_min_animation(arr)
        nodes = [
            {"id": i, "label": str(val), "type": "array_element",
             "position": [i * 2, 0, 0], "color": "blue", "scale": 1}
            for i, val in enumerate(arr)
        ]
        return {
            "visualizationType": "array_traversal",
            "scene": "ArrayMaxMinScene",
            "cameraPosition": [0, 5, -12],
            "metadata": {
                "problem": problem,
                "language": language,
                "totalSteps": len(animations)
            },
            "nodes": nodes,
            "edges": [],
            "animations": animations,
            "explanationOverlay": explanations
        }

    # ─────────────────────────────────────────
    # MERGE SORT
    # ─────────────────────────────────────────
    if problem == "merge_sort":
        arr = [4, 2, 7, 1, 5]
        nodes = [
            {"id": i, "label": str(val), "type": "array_element",
             "position": [i * 2, 0, 0], "color": "blue", "scale": 1}
            for i, val in enumerate(arr)
        ]
        animations = [
            {"type": "highlight_range", "low": 0, "high": 4, "color": "yellow", "duration": 1},
            {"type": "highlight_range", "low": 0, "high": 1, "color": "red", "duration": 1},
            {"type": "highlight_range", "low": 2, "high": 4, "color": "red", "duration": 1},
            {"type": "highlight_range", "low": 0, "high": 4, "color": "green", "duration": 1},
        ]
        explanations = [
            "Split full array [4, 2, 7, 1, 5] into two halves",
            "Recursively sorting left half [4, 2]",
            "Recursively sorting right half [7, 1, 5]",
            "Merging both sorted halves into final array"
        ]
        return {
            "visualizationType": "divide_and_conquer",
            "scene": "MergeSortScene",
            "cameraPosition": [0, 6, -14],
            "metadata": {
                "problem": problem,
                "language": language,
                "totalSteps": len(animations)
            },
            "nodes": nodes,
            "edges": [],
            "animations": animations,
            "explanationOverlay": explanations
        }

    # ─────────────────────────────────────────
    # QUICK SORT
    # ─────────────────────────────────────────
    if problem == "quick_sort":
        arr = [3, 6, 8, 10, 1]
        nodes = [
            {"id": i, "label": str(val), "type": "array_element",
             "position": [i * 2, 0, 0], "color": "blue", "scale": 1}
            for i, val in enumerate(arr)
        ]
        animations = [
            {"type": "highlight", "node": 4, "color": "yellow", "duration": 1},
            {"type": "compare", "nodeA": 0, "nodeB": 4, "color": "red", "duration": 0.8},
            {"type": "compare", "nodeA": 1, "nodeB": 4, "color": "red", "duration": 0.8},
            {"type": "compare", "nodeA": 2, "nodeB": 4, "color": "red", "duration": 0.8},
            {"type": "highlight", "node": 4, "color": "green", "duration": 1},
            {"type": "highlight_range", "low": 0, "high": 4, "color": "green", "duration": 1},
        ]
        explanations = [
            "Select pivot: last element (value 1)",
            "Compare index 0 (value 3) with pivot",
            "Compare index 1 (value 6) with pivot",
            "Compare index 2 (value 8) with pivot",
            "Pivot placed in its correct sorted position",
            "Array fully partitioned and sorted"
        ]
        return {
            "visualizationType": "partition",
            "scene": "QuickSortScene",
            "cameraPosition": [0, 6, -12],
            "metadata": {
                "problem": problem,
                "language": language,
                "totalSteps": len(animations)
            },
            "nodes": nodes,
            "edges": [],
            "animations": animations,
            "explanationOverlay": explanations
        }

    # ─────────────────────────────────────────
    # LOOP
    # ─────────────────────────────────────────
    if problem == "loop":
        arr = [1, 2, 3, 4, 5]
        nodes = [
            {"id": i, "label": str(val), "type": "array_element",
             "position": [i * 2, 0, 0], "color": "blue", "scale": 1}
            for i, val in enumerate(arr)
        ]
        animations = [
            {"type": "highlight", "node": i, "color": "red", "duration": 0.7}
            for i in range(len(arr))
        ]
        explanations = [f"Loop iteration {i+1}: visiting index {i} (value {arr[i]})" for i in range(len(arr))]
        return {
            "visualizationType": "array_traversal",
            "scene": "LoopScene",
            "cameraPosition": [0, 5, -10],
            "metadata": {
                "problem": problem,
                "language": language,
                "totalSteps": len(animations)
            },
            "nodes": nodes,
            "edges": [],
            "animations": animations,
            "explanationOverlay": explanations
        }

    # ─────────────────────────────────────────
    # COUNTING
    # ─────────────────────────────────────────
    if problem == "counting":
        arr = [2, 3, 2, 5, 3]
        nodes = [
            {"id": i, "label": str(val), "type": "array_element",
             "position": [i * 2, 0, 0], "color": "blue", "scale": 1}
            for i, val in enumerate(arr)
        ]
        animations = [
            {"type": "highlight", "node": i, "color": "yellow", "duration": 0.7}
            for i in range(len(arr))
        ]
        explanations = [f"Counting element at index {i} (value {arr[i]})" for i in range(len(arr))]
        return {
            "visualizationType": "array_traversal",
            "scene": "CountingScene",
            "cameraPosition": [0, 5, -10],
            "metadata": {
                "problem": problem,
                "language": language,
                "totalSteps": len(animations)
            },
            "nodes": nodes,
            "edges": [],
            "animations": animations,
            "explanationOverlay": explanations
        }

    # ─────────────────────────────────────────
    # SUM ARRAY
    # ─────────────────────────────────────────
    if problem == "sum_array":
        arr = [1, 4, 2, 8, 3]
        running_sum = 0
        animations = []
        explanations = []
        for i, val in enumerate(arr):
            running_sum += val
            animations.append({"type": "highlight", "node": i, "color": "green", "duration": 0.7})
            explanations.append(f"Add {val} → running sum = {running_sum}")
        nodes = [
            {"id": i, "label": str(val), "type": "array_element",
             "position": [i * 2, 0, 0], "color": "blue", "scale": 1}
            for i, val in enumerate(arr)
        ]
        return {
            "visualizationType": "array_traversal",
            "scene": "SumArrayScene",
            "cameraPosition": [0, 5, -10],
            "metadata": {
                "problem": problem,
                "language": language,
                "totalSteps": len(animations)
            },
            "nodes": nodes,
            "edges": [],
            "animations": animations,
            "explanationOverlay": explanations
        }

    # ─────────────────────────────────────────
    # GENERIC FALLBACK (safe — no arr reference)
    # ─────────────────────────────────────────
    return {
        "visualizationType": "generic_algorithm",
        "scene": "GenericScene",
        "cameraPosition": [0, 5, -10],
        "metadata": {
            "problem": problem,
            "language": language,
            "totalSteps": 0
        },
        "nodes": [],
        "edges": [],
        "animations": [],
        "explanationOverlay": ["Generic algorithm — no specific visualization available."]
    }
# backend/services/ar_payload_generator.py

def generate_ar_payload(problem: str, code: str):

    if problem == "linear_search":
        return {
            "visualizationType": "array_traversal",
            "scene": "LinearSearchScene",
            "cameraPosition": [0, 5, -10],
            "nodes": [
                {"id": "arr[0]", "type": "array_element"},
                {"id": "arr[1]", "type": "array_element"},
                {"id": "arr[2]", "type": "array_element"},
                {"id": "arr[3]", "type": "array_element"}
            ],
            "edges": [],
            "animationSteps": [
                {"step": 1, "action": "highlight", "target": "arr[0]"},
                {"step": 2, "action": "highlight", "target": "arr[1]"},
                {"step": 3, "action": "highlight", "target": "arr[2]"},
                {"step": 4, "action": "found", "target": "arr[2]"}
            ],
            "explanationOverlay": "Linear search checks each element sequentially."
        }

    if problem == "binary_search":
        return {
            "visualizationType": "divide_and_conquer",
            "scene": "BinarySearchScene",
            "cameraPosition": [0, 7, -12],
            "nodes": [
                {"id": "low", "type": "pointer"},
                {"id": "mid", "type": "pointer"},
                {"id": "high", "type": "pointer"}
            ],
            "edges": [],
            "animationSteps": [
                {"step": 1, "action": "move_mid"},
                {"step": 2, "action": "eliminate_half"},
                {"step": 3, "action": "move_pointers"}
            ],
            "explanationOverlay": "Binary search eliminates half of the array every step."
        }

    if problem == "sorting":
        return {
            "visualizationType": "swap_animation",
            "scene": "SortingScene",
            "cameraPosition": [0, 6, -10],
            "nodes": [
                {"id": "arr[i]", "type": "array_element"},
                {"id": "arr[j]", "type": "array_element"}
            ],
            "edges": [],
            "animationSteps": [
                {"step": 1, "action": "compare"},
                {"step": 2, "action": "swap"},
                {"step": 3, "action": "reorder"}
            ],
            "explanationOverlay": "Sorting algorithms compare and swap elements."
        }

    return {
        "visualizationType": "generic_algorithm",
        "scene": "GenericScene",
        "cameraPosition": [0, 5, -10],
        "nodes": [],
        "edges": [],
        "animationSteps": [],
        "explanationOverlay": "Generic algorithm visualization."
    }

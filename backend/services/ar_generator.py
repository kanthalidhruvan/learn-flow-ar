def generate_ar_payload(problem: str, code: str):

    # Dummy extracted array (for demo)
    sample_array = [5, 2, 9, 1, 6]

    if problem == "linear_search":
        return {
            "visualizationType": "array_search",
            "scene": "ArrayScene",
            "cameraPosition": [0, 5, -10],
            "nodes": sample_array,
            "edges": [],
            "animationSteps": [
                {"step": 1, "highlightIndex": 0, "description": "Checking index 0"},
                {"step": 2, "highlightIndex": 1, "description": "Checking index 1"},
                {"step": 3, "highlightIndex": 2, "description": "Checking index 2"},
            ],
            "explanationOverlay": "Linear search checks each element sequentially."
        }

    if problem == "array_max_min":
        return {
            "visualizationType": "array_max",
            "scene": "ArrayScene",
            "cameraPosition": [0, 5, -10],
            "nodes": sample_array,
            "edges": [],
            "animationSteps": [
                {"step": 1, "highlightIndex": 0, "description": "Start with first element"},
                {"step": 2, "highlightIndex": 2, "description": "New max found at index 2"},
            ],
            "explanationOverlay": "We update maximum when larger value is found."
        }

    return {
        "visualizationType": "generic_algorithm",
        "scene": "GenericScene",
        "cameraPosition": [0, 5, -10],
        "nodes": sample_array,
        "edges": [],
        "animationSteps": [],
        "explanationOverlay": "Generic algorithm visualization."
    }

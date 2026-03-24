# backend/services/ar_payload_generator.py

from backend.services.ar_animation_engine import generate_linear_search_animation


# def generate_ar_payload(problem: str, code: str):
def generate_ar_payload(problem: str, code: str, language: str):
    # ---------------------------------------------------
    # LINEAR SEARCH (Advanced Animated Version)
    # ---------------------------------------------------
    if problem == "linear_search":

        arr = [5, 8, 3, 7, 2]
        target = 7

        animations, explanations = generate_linear_search_animation(arr, target)

        nodes = [
            {
                "id": i,
                "label": f"{val}",
                "type": "array_element",
                "position": [i * 2, 0, 0],
                "color": "blue",
                "scale": 1
            }
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

    # ---------------------------------------------------
    # BINARY SEARCH (Advanced Animated Version)
    # ---------------------------------------------------
    if problem == "binary_search":

        arr = [1, 3, 5, 7, 9, 11, 13]
        target = 9

        nodes = [
            {
                "id": i,
                "label": f"{val}",
                "type": "array_element",
                "position": [i * 2, 0, 0],
                "color": "blue",
                "scale": 1
            }
            for i, val in enumerate(arr)
        ]

        animations = [
            {
                "type": "highlight_range",
                "low": 0,
                "high": 6,
                "color": "yellow",
                "duration": 1
            },
            {
                "type": "highlight",
                "node": 3,
                "color": "green",
                "duration": 1.2
            }
        ]

        explanations = [
            "Initial search range from index 0 to 6",
            "Middle element found and matches target"
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

    # ---------------------------------------------------
    # SORTING (Advanced Swap Animation Version)
    # ---------------------------------------------------
    if problem == "sorting":

        arr = [5, 2, 8, 1]

        nodes = [
            {
                "id": i,
                "label": f"{val}",
                "type": "array_element",
                "position": [i * 2, 0, 0],
                "color": "blue",
                "scale": 1
            }
            for i, val in enumerate(arr)
        ]

        animations = [
            {
                "type": "compare",
                "nodeA": 0,
                "nodeB": 1,
                "color": "red",
                "duration": 0.8
            },
            {
                "type": "swap",
                "nodeA": 0,
                "nodeB": 1,
                "duration": 1.2
            },
            {
                "type": "highlight",
                "node": 1,
                "color": "green",
                "duration": 0.8
            }
        ]

        explanations = [
            "Comparing first two elements",
            "Swapping because 5 > 2",
            "Element repositioned"
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

    # ---------------------------------------------------
    # GENERIC FALLBACK
    # ---------------------------------------------------
    return {
        "visualizationType": "generic_algorithm",
        "scene": "GenericScene",
        "cameraPosition": [0, 5, -10],

        "metadata": {
    "problem": problem,
    "language": language,
    "totalSteps": len(animations)
},

        "nodes": [],
        "edges": [],
        "animations": [],
        "explanationOverlay": ["Generic algorithm visualization."]
    }
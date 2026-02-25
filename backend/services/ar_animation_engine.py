def generate_linear_search_animation(arr, target):
    animations = []
    explanations = []

    for i, val in enumerate(arr):
        animations.append({
            "type": "highlight",
            "node": i,
            "color": "red",
            "duration": 0.8
        })

        explanations.append(f"Checking index {i}")

        if val == target:
            animations.append({
                "type": "highlight",
                "node": i,
                "color": "green",
                "duration": 1.2
            })
            explanations.append("Target Found")
            break

    return animations, explanations
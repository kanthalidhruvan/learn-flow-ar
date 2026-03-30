# backend/services/ar_animation_engine.py

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
        explanations.append(f"Checking index {i} (value {val})")

        if val == target:
            animations.append({
                "type": "highlight",
                "node": i,
                "color": "green",
                "duration": 1.2
            })
            explanations.append(f"Target {target} found at index {i}!")
            break

    return animations, explanations


def generate_binary_search_animation(arr, target):
    animations = []
    explanations = []
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        animations.append({
            "type": "highlight_range",
            "low": low,
            "high": high,
            "color": "yellow",
            "duration": 1
        })
        explanations.append(f"Search range: index {low} to {high}")

        animations.append({
            "type": "highlight",
            "node": mid,
            "color": "red",
            "duration": 0.8
        })
        explanations.append(f"Checking mid = index {mid} (value {arr[mid]})")

        if arr[mid] == target:
            animations.append({
                "type": "highlight",
                "node": mid,
                "color": "green",
                "duration": 1.2
            })
            explanations.append(f"Target {target} found at index {mid}!")
            break
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return animations, explanations


def generate_sorting_animation(arr):
    animations = []
    explanations = []
    a = arr[:]

    for i in range(len(a)):
        for j in range(0, len(a) - i - 1):
            animations.append({
                "type": "compare",
                "nodeA": j,
                "nodeB": j + 1,
                "color": "red",
                "duration": 0.6
            })
            explanations.append(f"Comparing index {j} ({a[j]}) and index {j+1} ({a[j+1]})")

            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                animations.append({
                    "type": "swap",
                    "nodeA": j,
                    "nodeB": j + 1,
                    "duration": 0.8
                })
                explanations.append(f"Swapping — {a[j+1]} > {a[j]}, moving left")

    animations.append({
        "type": "highlight_range",
        "low": 0,
        "high": len(a) - 1,
        "color": "green",
        "duration": 1
    })
    explanations.append("Array fully sorted!")
    return animations, explanations


def generate_array_max_min_animation(arr):
    animations = []
    explanations = []
    current_max = arr[0]
    current_min = arr[0]

    animations.append({
        "type": "highlight",
        "node": 0,
        "color": "green",
        "duration": 0.8
    })
    explanations.append(f"Start: assume max = min = {arr[0]}")

    for i in range(1, len(arr)):
        animations.append({
            "type": "highlight",
            "node": i,
            "color": "red",
            "duration": 0.6
        })
        explanations.append(f"Checking index {i} (value {arr[i]})")

        if arr[i] > current_max:
            current_max = arr[i]
            animations.append({
                "type": "highlight",
                "node": i,
                "color": "green",
                "duration": 0.8
            })
            explanations.append(f"New max found: {current_max} at index {i}")

        if arr[i] < current_min:
            current_min = arr[i]
            animations.append({
                "type": "highlight",
                "node": i,
                "color": "yellow",
                "duration": 0.8
            })
            explanations.append(f"New min found: {current_min} at index {i}")

    return animations, explanations
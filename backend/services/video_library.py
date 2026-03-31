# backend/services/video_library.py

VIDEO_LIBRARY = {

    "linear_search": {
        "title": "Linear Search – Striver DSA Series",
        "description": "Detailed explanation of Linear Search with dry run and complexity analysis.",
        "youtubeId": "C3H1pXyXv7w",
        "duration": "15:20",
        "difficulty": "beginner",
        "topics": [
            "Linear Search",
            "Time Complexity",
            "Brute Force Approach",
            "Array Traversal",
            "Edge Cases"
        ]
    },

    "binary_search": {
        "title": "Binary Search – Striver DSA Series",
        "description": "Complete binary search explanation with iterative and recursive methods.",
        "youtubeId": "f6UU7V3szVw",
        "duration": "22:10",
        "difficulty": "intermediate",
        "topics": [
            "Binary Search",
            "Divide and Conquer",
            "Iterative Method",
            "Recursive Method",
            "Edge Conditions"
        ]
    },

    "sorting": {
        "title": "Sorting Algorithms Overview – Aditya Verma",
        "description": "Understanding Bubble, Selection and Insertion Sort with complexity analysis.",
        "youtubeId": "kPRA0W1kECg",
        "duration": "18:45",
        "difficulty": "beginner",
        "topics": [
            "Bubble Sort",
            "Selection Sort",
            "Insertion Sort",
            "Time Complexity",
            "Stable Sorting"
        ]
    },

    "merge_sort": {
        "title": "Merge Sort – Striver DSA Series",
        "description": "Deep dive into merge sort using divide and conquer strategy.",
        "youtubeId": "JSceec-wEyw",
        "duration": "24:30",
        "difficulty": "advanced",
        "topics": [
            "Merge Sort",
            "Recursion",
            "Divide and Conquer",
            "O(n log n)",
            "Stable Sorting"
        ]
    },

    "quick_sort": {
        "title": "Quick Sort – Striver DSA Series",
        "description": "Understanding partition logic and recursion in Quick Sort.",
        "youtubeId": "Hoixgm4-P4M",
        "duration": "21:40",
        "difficulty": "advanced",
        "topics": [
            "Quick Sort",
            "Partitioning",
            "Recursion",
            "In-place Sorting",
            "Worst Case Analysis"
        ]
    },

    "array_max_min": {
        "title": "Find Max & Min in Array – Striver",
        "description": "Efficient approaches to find maximum and minimum elements.",
        "youtubeId": "lXVy6YWFcRM",
        "duration": "14:10",
        "difficulty": "beginner",
        "topics": [
            "Array Traversal",
            "Single Pass Optimization",
            "Edge Cases",
            "Time Complexity"
        ]
    },
    "loop": {
    "title": "Loops in Programming – Basics",
    "description": "Understanding for loops, while loops and iteration patterns.",
    "youtubeId": "95kNbCTDPcw",
    "duration": "12:00",
    "difficulty": "beginner",
    "topics": ["For Loop", "While Loop", "Iteration", "Traversal"]
},
"counting": {
    "title": "Counting Elements in an Array",
    "description": "How to count occurrences of elements using hash maps and arrays.",
    "youtubeId": "8hly31xKli0",
    "duration": "10:00",
    "difficulty": "beginner",
    "topics": ["Counting", "Frequency", "HashMap", "Array"]
},
"sum_array": {
    "title": "Array Sum – Prefix Sum Technique",
    "description": "Calculating array sum efficiently using prefix sum approach.",
    "youtubeId": "XD1QOIOjB8w",
    "duration": "11:30",
    "difficulty": "beginner",
    "topics": ["Sum", "Prefix Sum", "Traversal", "Optimization"]
},
    "unknown": {
        "title": "Algorithm Fundamentals – DSA Foundation",
        "description": "Understanding algorithm thinking, complexity and optimization techniques.",
        "youtubeId": "8hly31xKli0",
        "duration": "16:00",
        "difficulty": "beginner",
        "topics": [
            "Algorithms",
            "Big-O Notation",
            "Optimization",
            "Problem Solving Strategy"
        ]
    }
}
    # Mapping from detected problem → VisuAlgo URL
VISUALGO_LINKS = {
    "linear_search":  "https://visualgo.net/en/array",
    "binary_search":  "https://visualgo.net/en/bst",
    "sorting":        "https://visualgo.net/en/sorting",
    "merge_sort":     "https://visualgo.net/en/sorting",
    "quick_sort":     "https://visualgo.net/en/sorting",
    "array_max_min":  "https://visualgo.net/en/array",
    "loop":           "https://visualgo.net/en/array",
    "counting":       "https://visualgo.net/en/sorting",
    "sum_array":      "https://visualgo.net/en/array",
    "unknown":        "https://visualgo.net/en",
    }

from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_video(language: str, concept: str = "algorithm"):
    # Simple academic mapping (no API key needed)
    video_map = {
        "python": {
            "title": "Python Algorithms Explained",
            "youtubeId": "pkYVOmU3MgA",
            "duration": "15:20",
            "difficulty": "beginner",
            "topics": ["Python", "Algorithms", "Time Complexity"]
        },
        "javascript": {
            "title": "JavaScript Algorithm Optimization",
            "youtubeId": "sJYl3w0U7sI",
            "duration": "12:45",
            "difficulty": "beginner",
            "topics": ["JavaScript", "Arrays", "Optimization"]
        },
        "java": {
            "title": "Java DSA Explained",
            "youtubeId": "AqxY4Rk1s1Y",
            "duration": "18:10",
            "difficulty": "intermediate",
            "topics": ["Java", "DSA", "Performance"]
        },
        "cpp": {
            "title": "C++ Algorithm Efficiency",
            "youtubeId": "8jLOx1hD3_o",
            "duration": "20:00",
            "difficulty": "intermediate",
            "topics": ["C++", "Algorithms", "STL"]
        }
    }

    selected = video_map.get(language, video_map["python"])

    return {
        "title": selected["title"],
        "description": f"Conceptual explanation of {concept} in {language}",
        "youtubeId": selected["youtubeId"],
        "duration": selected["duration"],
        "difficulty": selected["difficulty"],
        "topics": selected["topics"]
    }

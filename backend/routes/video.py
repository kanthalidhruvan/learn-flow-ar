from fastapi import APIRouter, Query
from backend.services.video_library import VIDEO_LIBRARY

router = APIRouter()

@router.get("/")
def get_video(
    language: str = Query(...),
    concept: str = Query(...)
):
    video = VIDEO_LIBRARY.get(concept, VIDEO_LIBRARY["unknown"])
    return video

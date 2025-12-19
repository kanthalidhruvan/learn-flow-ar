from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import analyze, evaluate, video, ar

app = FastAPI(title="Learn-Flow-AR Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/api/analyze")
app.include_router(evaluate.router, prefix="/api/evaluate")
app.include_router(video.router, prefix="/api/video")
app.include_router(ar.router, prefix="/api/ar")

@app.get("/")
def health():
    return {"status": "Backend running"}

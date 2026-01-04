const API_BASE_URL = "http://localhost:8000/api";

export async function analyzeCode(code: string, language: string) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze code");
  }

  return response.json();
}
export async function evaluateCode(code: string, language: string) {
  const response = await fetch("http://localhost:8000/api/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) {
    throw new Error("Failed to evaluate code");
  }

  return response.json();
}
export async function fetchVideo(language: string, concept: string) {
  const response = await fetch(
    `http://localhost:8000/api/video?language=${language}&concept=${concept}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch video");
  }

  return response.json();
}

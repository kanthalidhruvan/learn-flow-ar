// src/lib/api.ts

const API_BASE_URL = "http://127.0.0.1:8001/api";

/* ---------- Analyze Code ---------- */
export async function analyzeCode(code: string, language: string) {
  const response = await fetch(`${API_BASE_URL}/analyze/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Analyze API error:", errorText);
    throw new Error("Failed to analyze code");
  }

  return response.json();
}

/* ---------- Evaluate Code ---------- */
export async function evaluateCode(code: string, language: string) {
  const response = await fetch(`${API_BASE_URL}/evaluate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Evaluate API error:", errorText);
    throw new Error("Failed to evaluate code");
  }

  return response.json();
}

/* ---------- Fetch Video ---------- */
export async function fetchVideo(language: string, concept: string) {
  const response = await fetch(
    `${API_BASE_URL}/video/?language=${encodeURIComponent(
      language
    )}&concept=${encodeURIComponent(concept)}`
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Video API error:", errorText);
    throw new Error("Failed to fetch video");
  }

  return response.json();
}

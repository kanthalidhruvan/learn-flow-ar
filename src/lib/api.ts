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

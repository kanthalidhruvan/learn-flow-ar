def generate_ai_explanation(code: str, language: str):
    """
    Simulated LLM response (academic-safe).
    Can be replaced with OpenAI / Local LLM later.
    """

    brute_force = (
        f"The brute force approach in {language} checks all possible "
        f"elements or combinations sequentially. It is easy to understand "
        f"but inefficient for large inputs due to higher time complexity."
    )

    better = (
        f"The better approach improves performance by reducing redundant "
        f"operations. It uses smarter iteration or built-in constructs "
        f"to make the solution cleaner and faster."
    )

    optimal = (
        f"The optimal solution uses the most efficient algorithmic strategy "
        f"for this problem. It minimizes time and space complexity while "
        f"handling edge cases effectively."
    )

    return {
        "brute_force_explanation": brute_force,
        "better_explanation": better,
        "optimal_explanation": optimal
    }

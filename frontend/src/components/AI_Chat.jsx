import { useState } from "react";
import sendPrompt from "../data/ai.js";
import { useNavigate } from "react-router-dom";

export default function AI_Chat() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const normalizedPrompt = prompt.trim();

    if (!normalizedPrompt) {
      setError("Please write a prompt first.");
      setResult("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const aiResult = await sendPrompt(normalizedPrompt);

      if (!aiResult || aiResult === "NOT_FOUND") {
        setError("No restaurant match found for that prompt.");
        setResult("");
        return;
      }

      setResult(aiResult);
    } catch (err) {
      setError(err.message || "AI request failed.");
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 mb-4">
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm max-w-xl">
        <p className="text-sm font-semibold mb-2">AI restaurant suggestion</p>
        <p className="text-xs text-gray-500 mb-3">
          Try something like: “I crave fast food”, “I want sushi”, or “I want pizza”.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder='"I crave fast food"'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm"
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Checking..." : "Ask AI"}
          </button>
        </div>

        {error ? <p className="text-sm text-red-500 mt-3">{error}</p> : null}

        {result ? (
          <div className="mt-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
            <p className="text-sm font-medium">AI found a restaurant match.</p>
            <button
              type="button"
              className="mt-3 bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
              onClick={() => navigate(`/restaurants/${result}`)}
            >
              Go To Restaurant
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

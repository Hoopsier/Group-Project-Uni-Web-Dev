/// Returns a restaurant id by asking the backend AI route.
const sendPrompt = async (prompt) => {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const { output } = await res.json();
    return output;
  } catch (e) {
    console.error('AI ERROR:', e);
    return null;
  }
};

export default sendPrompt;

/// returns restaurant object route by asking the AI for a restaurant
//  Example: await sendPrompt({ prompt: "I want some pizza" })
const sendPrompt = async (prompt) => {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prompt)
    })
    if (!res.ok) {
      throw new Error('HTTP error:', res.status)
    }
    const { output } = await res.json();
    return output;
  }
  catch (e) {
    console.error("AI ERROR: " + e)
    return null
  }
}
export default sendPrompt

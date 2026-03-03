import { useEffect } from "react"
import { sendPrompt } from "../data/ai.js"
///The prompt window
export default function AI_Chat() {
  const [prompt, setPrompt] = useEffect("")
  return (
    <div>
      <input type="text"
        placeholder='"I crave fastfood"'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            sendPrompt(prompt);
        }}
      />
    </div>
  )
}


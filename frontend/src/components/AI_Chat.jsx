import { useState } from "react"
import sendPrompt from "../data/ai.js"
import { useNavigate } from "react-router-dom"
///The prompt window
export default function AI_Chat() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const navigate = useNavigate()
  return (
    <div>
      <p>Result: {(result !== "") && (<button onClick={() => {
        console.log("should nav to", result)
        navigate(`/${result}`)
      }}>Go To Resaurant</button>)}</p>
      <input type="text"
        placeholder='"I crave fastfood"'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter")
            setResult(await sendPrompt(prompt))
        }}
      />
    </div>
  )
}


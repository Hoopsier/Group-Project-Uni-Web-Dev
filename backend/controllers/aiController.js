const model = require("../config/gemini.js");
const mongoose = require('mongoose');
const isObjectId = (s) => mongoose.Types.ObjectId.isValid(s);
const Restaurant = require("../models/restaurantModel.js")

const parseModelOutput = (text) => {
  const t = String(text || '').trim();
  if (!t) return { type: 'error', value: 'EMPTY_RESPONSE' };
  if (t === 'NOT_FOUND') return { type: 'not_found', value: null };

  // If it's a single id string
  if (isObjectId(t)) return { type: 'single', value: t };

  // Fallback: extract one or more 24-hex sequences from text
  const matches = t.match(/[a-fA-F0-9]{24}/g);
  if (matches && matches.length === 1) return { type: 'single', value: matches[0] };
  if (matches && matches.length > 1) return { type: 'array', value: matches };

  return { type: 'unknown', value: t };
};

const aiRouter = async (req, res) => {
  const { prompt } = req.body
  console.log(prompt)
  const data = await Restaurant.getAllItems();
  console.log(data)
  // Instruction prompt for Gemini: use the provided prompt value to
  // determine which Mongoose ObjectId(s) should be returned. The model
  // should reply with either a single ObjectId string, or a JSON array
  // of ObjectId strings. If no matching record exists, respond with NOT_FOUND.
  ///NOTE:Temporary test boolean
  const test = false
  if (test) {
    return res.status(200).json({ output: "698eeb564ce9258475e6ecda" })
  }
  const promptAI = `You are an assistant that uses the items of the given short query to assume which restaurant's id to return.
If a restaurant has no items, there is no reason to concider returning it.
If a restaurant doesn't have the item in the query, there is no reason to concider returining it's id.
Query: "${prompt}". Task: Determine the matching Mongoose ObjectId for the record identified by the Query.
Output rules: Respond with ONE of the following only: 
a single 24-character ObjectId string (for example "507f1f77bcf86cd799439011\").
If there are no matches, respond with the exact text NOT_FOUND.
Do not include any explanation or extra text—only the id or NOT_FOUND.
Try EXTRA HARD to not return NOT_FOUND.
Here's the data you have: ${data}.`;
  console.log(promptAI)
  try {
    const result = await model(promptAI);
    const parsed = parseModelOutput(result.text);

    if (parsed.type === 'not_found') return res.json({ output: 'NOT_FOUND' });
    if (parsed.type === 'single') return res.json({ output: parsed.value });

    // Unknown/invalid format: return raw text but indicate format issue
    return res.status(502).json({ error: 'Invalid model response format', raw: result.text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = aiRouter;

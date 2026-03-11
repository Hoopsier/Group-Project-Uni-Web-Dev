const model = require('../config/gemini.js');
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurantModel.js');

const isObjectId = (s) => mongoose.Types.ObjectId.isValid(s);

const parseModelOutput = (text) => {
  const t = String(text || '').trim();
  if (!t) return { type: 'error', value: 'EMPTY_RESPONSE' };
  if (t === 'NOT_FOUND') return { type: 'not_found', value: null };

<<<<<<< HEAD
=======
  // Try JSON parse first (expecting an array of ids)
  if (t.startsWith('[')) {
    try {
      const arr = JSON.parse(t);
      if (Array.isArray(arr) && arr.every(isObjectId)) return { type: 'array', value: arr };
    } catch (e) {
      // fall through to regex extraction
    }
  }

  // If it's a single id string
>>>>>>> origin
  if (isObjectId(t)) return { type: 'single', value: t };

  const matches = t.match(/[a-fA-F0-9]{24}/g);
  if (matches && matches.length === 1)
    return { type: 'single', value: matches[0] };
  if (matches && matches.length > 1) return { type: 'array', value: matches };

  return { type: 'unknown', value: t };
};

const aiRouter = async (req, res) => {
<<<<<<< HEAD
  const { prompt } = req.body;

  if (!prompt || !String(prompt).trim()) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const data = await Restaurant.getAllItems();
  const promptAI = `You are an assistant that must return the MongoDB ObjectId of the single best restaurant match for the user's food preference.

Rules:
- Only return one 24-character MongoDB ObjectId string.
- If there is no valid match, return exactly NOT_FOUND.
- Do not include explanations, punctuation, markdown, JSON, or extra text.
- Prefer restaurants whose menu items clearly match the user's request.
- Ignore restaurants that do not have relevant menu items.

User query: "${prompt}"
Restaurant data: ${data}`;
=======
  const promptVal = String(req.query.prompt || '').trim();
  const data = await Restaurant.getAll();
  console.log(data)
  // Instruction prompt for Gemini: use the provided prompt value to
  // determine which Mongoose ObjectId(s) should be returned. The model
  // should reply with either a single ObjectId string, or a JSON array
  // of ObjectId strings. If no matching record exists, respond with NOT_FOUND.
  const prompt = `You are an assistant that maps short query keys to database records.
Query: "${promptVal}". Task: Determine the matching Mongoose ObjectId(s) for the record(s) identified by the Query.
Output rules: Respond with ONE of the following only: a single 24-character ObjectId string;
or a JSON array of 24-character ObjectId strings (for example [\"507f1f77bcf86cd799439011\"]).
If there are no matches, respond with the exact text NOT_FOUND.
Do not include any explanation or extra text—only the id or NOT_FOUND.
Here's the data you have: ${data}.`;
>>>>>>> origin

  try {
    const result = await model(prompt);
    const parsed = parseModelOutput(result.text);

<<<<<<< HEAD
    if (parsed.type === 'not_found') {
      return res.json({ output: 'NOT_FOUND' });
    }
=======
    if (parsed.type === 'not_found') return res.json({ output: 'NOT_FOUND' });
    if (parsed.type === 'single') return res.json({ output: parsed.value });
    if (parsed.type === 'array') return res.json({ output: parsed.value });
>>>>>>> origin

    if (parsed.type === 'single') {
      return res.json({ output: parsed.value });
    }

    return res.status(502).json({
      error: 'Invalid model response format',
      raw: result.text,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = aiRouter;

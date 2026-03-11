const model = require('../config/gemini.js');
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurantModel.js');

const isObjectId = (s) => mongoose.Types.ObjectId.isValid(s);

const parseModelOutput = (text) => {
  const t = String(text || '').trim();
  if (!t) return { type: 'error', value: 'EMPTY_RESPONSE' };
  if (t === 'NOT_FOUND') return { type: 'not_found', value: null };

  if (isObjectId(t)) return { type: 'single', value: t };

  const matches = t.match(/[a-fA-F0-9]{24}/g);
  if (matches && matches.length === 1)
    return { type: 'single', value: matches[0] };
  if (matches && matches.length > 1) return { type: 'array', value: matches };

  return { type: 'unknown', value: t };
};

const aiRouter = async (req, res) => {
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

  try {
    const result = await model(promptAI);
    const parsed = parseModelOutput(result.text);

    if (parsed.type === 'not_found') {
      return res.json({ output: 'NOT_FOUND' });
    }

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

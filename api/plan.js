export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { career, hours } = req.body;

  const prompt = `Create a 7-day weekly study plan for someone learning ${career}, studying ${hours} hours per day. Format as exactly: "Day 1: [topic]", "Day 2: [topic]", etc. One line per day. No explanations, no extra text, no markdown.`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4 }
        })
      }
    );

    const data = await geminiRes.json();
    const planText = data.candidates[0].content.parts[0].text;

    res.status(200).json({ plan: planText });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong generating the plan.' });
  }
}

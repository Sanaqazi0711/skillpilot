export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { career, hours } = req.body;

  const totalHoursNeeded = {
    "Data Science": 400,
    "Data Analyst": 250,
    "Backend Developer": 300
  };

  const totalHours = totalHoursNeeded[career] || 300;
  const hoursPerDay = Number(hours);
  const totalDays = Math.ceil(totalHours / hoursPerDay);
  const totalMonths = Math.max(1, Math.ceil(totalDays / 30));

  const prompt = `Create a study plan for someone learning ${career}, who can study ${hoursPerDay} hours per day. The plan should span exactly ${totalMonths} months.

Break the plan into months. Each month should be broken into 4 weekly themes. Each week needs a short theme (a few words) and a 1-2 sentence description of what to focus on that week.

Return ONLY valid JSON, with no markdown formatting, no code fences, no extra text before or after. Use exactly this structure:

{
  "totalMonths": ${totalMonths},
  "months": [
    {
      "monthNumber": 1,
      "title": "short phase title for this month",
      "weeks": [
        { "weekNumber": 1, "theme": "short theme", "description": "1-2 sentence description" }
      ]
    }
  ]
}`;

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
    let planText = data.candidates[0].content.parts[0].text;

    planText = planText.replace(/```json/g, '').replace(/```/g, '').trim();

    const planJson = JSON.parse(planText);

    res.status(200).json({ plan: planJson, totalMonths: totalMonths });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong generating the plan.' });
  }
}

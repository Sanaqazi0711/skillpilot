const CAREER_DATA = {
  "Data Science": {
    totalHours: 400,
    curriculum: `
Beginner: Python fundamentals; basic statistics & probability (mean, variance, distributions); basic linear algebra & calculus concepts (vectors, matrices, derivatives).
Intermediate: pandas & NumPy for data manipulation; Matplotlib/Seaborn for visualization; SQL fundamentals; exploratory data analysis (EDA) on real datasets.
Advanced: Machine learning fundamentals with scikit-learn (regression, classification, evaluation metrics); an end-to-end ML project combining EDA, feature engineering, and model comparison.`
  },
  "Data Analyst": {
    totalHours: 220,
    curriculum: `
Beginner: Excel/Google Sheets (formulas, pivot tables, charts); basic statistics (mean, median, variance, correlation).
Intermediate: SQL (SELECT, WHERE, JOIN, GROUP BY, subqueries, window functions); Python basics with pandas for data cleaning.
Advanced: Building dashboards in Power BI or Tableau; data storytelling and presenting insights to stakeholders.`
  },
  "Backend Developer": {
    totalHours: 320,
    curriculum: `
Beginner: One programming language deeply (Python, JavaScript/Node, or Java); fundamentals (variables, functions, OOP); Git & GitHub basics; HTTP/REST basics.
Intermediate: Relational databases & SQL (CRUD operations); building REST APIs with a framework; authentication & authorization basics.
Advanced: Caching basics (Redis); containerization basics (Docker); CI/CD basics with GitHub Actions; deploying an app to a free host like Render or Vercel.`
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { career, hours } = req.body;
  const data = CAREER_DATA[career] || CAREER_DATA["Backend Developer"];

  const hoursPerDay = Number(hours);
  const totalDays = Math.ceil(data.totalHours / hoursPerDay);

  const prompt = `Create a study plan for someone learning ${career}, who can study ${hoursPerDay} hours per day. The plan should cover approximately ${totalDays} total days of study.

Base the plan strictly on this curriculum, covering topics in this order (beginner topics first, then intermediate, then advanced):
${data.curriculum}

Break the plan into sequential topics. Each topic needs a clear title, a 1-2 sentence description of what to learn, and an estimated number of days needed (topics can vary in length based on difficulty). The days across all topics should add up to approximately ${totalDays} days total.

Do NOT mention specific resources, tools, courses, tutorials, links, or project ideas — only the topic name, description, and days needed.

Return ONLY valid JSON, with no markdown formatting, no code fences, no extra text before or after. Use exactly this structure:

{
  "totalDays": ${totalDays},
  "topics": [
    { "topicNumber": 1, "title": "short topic title", "description": "1-2 sentence description", "days": 7 }
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

    const result = await geminiRes.json();
    let planText = result.candidates[0].content.parts[0].text;
    planText = planText.replace(/```json/g, '').replace(/```/g, '').trim();
    const planJson = JSON.parse(planText);

    res.status(200).json({ plan: planJson });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong generating the plan.' });
  }
}

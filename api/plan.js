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

Return ONLY valid JSON, with no markdown formatting, no code fences, no extra text before or after. Use exactly this structure:Hard constraint: Do not invent new topics, reorder the skill buckets, or substitute different resources. Use ONLY the topics and resources listed below. Your job is to take this fixed structure and turn it into a realistic weekly schedule with time allocation — not to redesign the curriculum or find new links.

My constraints


I can study ~10–12 hours/week
I'm a first-year CS student, beginner-level, comfortable with basic JS/Next.js already
I want the plan to end with the 3 project ideas listed at the bottom, placed at the correct point in the timeline (only after Beginner-bucket topics are done)


Fixed Skill Structure (use exactly this, in this order)

BEGINNER BUCKET


Internet/HTTP basics

MDN – HTTP overview: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview



JavaScript/Node.js fundamentals

freeCodeCamp – JavaScript Algorithms and Data Structures Certification: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
Official Node.js Docs – Introduction: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs



Git & GitHub

freeCodeCamp – Git and GitHub for Beginners Crash Course (YouTube): https://www.youtube.com/watch?v=RGOj5yH7evk



SQL & relational databases

freeCodeCamp – SQL Tutorial: Full Database Course for Beginners (YouTube): https://www.youtube.com/watch?v=HXV3zeQKqGY





INTERMEDIATE BUCKET


Express.js / Node backend framework in depth

freeCodeCamp – Node.js and Express.js Full Course (YouTube, 8 hrs): https://www.youtube.com/watch?v=Oe421EPjeBE



REST API design principles

roadmap.sh – REST API guide: https://roadmap.sh/guides/rest-api



Authentication & authorization (JWT)

jwt.io Introduction: https://jwt.io/introduction



ORMs & database design (Prisma)

Prisma Official Docs – Getting Started: https://www.prisma.io/docs/getting-started



Testing

Jest Official Docs: https://jestjs.io/docs/getting-started



Docker fundamentals

freeCodeCamp – Docker Tutorial for Beginners, Full DevOps Course (YouTube): https://youtu.be/fqMOX6JJhGo





ADVANCED BUCKET


System design fundamentals

GitHub – donnemartin/system-design-primer: https://github.com/donnemartin/system-design-primer



Advanced database topics (indexing, N+1, scaling)

roadmap.sh Backend roadmap ("More about Databases" section): https://roadmap.sh/backend



Caching (Redis)

Official Redis Docs – Introduction: https://redis.io/docs/latest/develop/get-started/



Security hardening

OWASP Top 10 Official Page: https://owasp.org/www-project-top-ten/





Beginner Projects (place after Beginner bucket is complete, before moving deep into Intermediate)


To-Do List REST API (plain CRUD, no auth)
Expense Tracker API (categories, filtering, aggregation)
GitHub User Activity CLI/API (consume an external API)

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

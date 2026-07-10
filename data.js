const CAREER_CONTENT = {
  "Data Science": {
    videos: [
      { name: "StatQuest with Josh Starmer", url: "https://www.youtube.com/@statquest", desc: "Statistics and machine learning concepts explained visually and simply." },
      { name: "3Blue1Brown", url: "https://www.youtube.com/@3blue1brown", desc: "Intuitive visual explanations of linear algebra and calculus." },
      { name: "Krish Naik", url: "https://www.youtube.com/@krishnaik06", desc: "Practical data science and machine learning tutorials." }
    ],
    webTutorials: [
      { name: "Kaggle Learn", url: "https://www.kaggle.com/learn", desc: "Free bite-sized courses in Python, SQL, and Machine Learning with real datasets." },
      { name: "scikit-learn Documentation", url: "https://scikit-learn.org/stable/getting_started.html", desc: "Official docs for the most widely used Python machine learning library." },
      { name: "Khan Academy — Statistics", url: "https://www.khanacademy.org/math/statistics-probability", desc: "Free lessons and practice for core statistics and probability." }
    ],
    practiceSites: [
      { name: "Kaggle Datasets & Competitions", url: "https://www.kaggle.com/datasets", desc: "Real datasets to practice exploratory analysis and build ML projects." },
      { name: "Google Colab", url: "https://colab.research.google.com", desc: "Free, browser-based Python notebook — no installation needed to practice." },
      { name: "HackerRank — Python", url: "https://www.hackerrank.com/domains/python", desc: "Coding practice problems to build Python fluency." }
    ],
    certifications: [
      { name: "Kaggle Learn Certificates", desc: "Free micro-course certificates in Python, Pandas, and Machine Learning." },
      { name: "Great Learning Academy — Data Science", desc: "Free beginner courses with completion certificates covering Python, ML, and visualization." },
      { name: "HP LIFE — Data Science & Analytics", desc: "A short, free introductory course with certificate." }
    ],
    projects: [
      { level: "Beginner", title: "Exploratory analysis on a Kaggle dataset", desc: "Clean a public dataset and create visualizations that reveal patterns." },
      { level: "Intermediate", title: "Build a classification model", desc: "Use scikit-learn to predict an outcome and evaluate its accuracy." },
      { level: "Advanced", title: "End-to-end ML mini-project", desc: "Combine EDA, feature engineering, and model comparison into one report." }
    ]
  },
  "Data Analyst": {
    videos: [
      { name: "Leila Gharani", url: "https://www.youtube.com/@LeilaGharani", desc: "Hands-on Excel and data analysis tutorials with real-world examples." },
      { name: "Alex The Analyst", url: "https://www.youtube.com/@AlexTheAnalyst", desc: "SQL, Excel, and data analyst career-focused tutorials." },
      { name: "freeCodeCamp — SQL Course", url: "https://www.youtube.com/@freecodecamp", desc: "Full-length free SQL courses for beginners." }
    ],
    webTutorials: [
      { name: "Microsoft Learn — Excel", url: "https://learn.microsoft.com/en-us/training/", desc: "Free official courses covering Excel formulas, pivot tables, and data tools." },
      { name: "SQLBolt", url: "https://sqlbolt.com", desc: "Interactive, browser-based lessons for learning SQL step by step." },
      { name: "W3Schools — SQL", url: "https://www.w3schools.com/sql", desc: "A free, simple reference for SQL syntax and examples." }
    ],
    practiceSites: [
      { name: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial", desc: "Practice real SQL queries directly in the browser." },
      { name: "Kaggle Datasets", url: "https://www.kaggle.com/datasets", desc: "Free datasets to practice cleaning and analysis." },
      { name: "HackerRank — SQL", url: "https://www.hackerrank.com/domains/sql", desc: "SQL practice problems with instant feedback." }
    ],
    certifications: [
      { name: "Kaggle Learn Certificates", desc: "Free certificates for Python, SQL, and data visualization micro-courses." },
      { name: "HackerRank SQL Certification", desc: "Free skill certification badge you can add directly to LinkedIn." },
      { name: "Great Learning Academy — Data Analytics", desc: "Free beginner courses with certificates covering Excel, SQL, and Tableau." }
    ],
    projects: [
      { level: "Beginner", title: "Sales dataset analysis", desc: "Analyze a sample sales dataset in Excel or Sheets and summarize key trends." },
      { level: "Intermediate", title: "Customer behavior analysis with SQL", desc: "Write SQL queries to segment customers and find purchasing patterns." },
      { level: "Advanced", title: "Interactive dashboard project", desc: "Build a dashboard in Power BI or Tableau that tells a clear data story." }
    ]
  },
  "Backend Developer": {
    videos: [
      { name: "freeCodeCamp", url: "https://www.youtube.com/@freecodecamp", desc: "Full-length free courses on backend languages, databases, and APIs." },
      { name: "CodeWithHarry", url: "https://www.youtube.com/@CodeWithHarry", desc: "Beginner-friendly tutorials covering backend fundamentals." },
      { name: "Traversy Media", url: "https://www.youtube.com/@TraversyMedia", desc: "Practical crash courses across backend frameworks and tools." }
    ],
    webTutorials: [
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org", desc: "Free, project-based curriculum including a full Backend Development certification." },
      { name: "MDN Web Docs — HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP", desc: "The definitive free reference for how HTTP and REST APIs work." },
      { name: "roadmap.sh — Backend", url: "https://roadmap.sh/backend", desc: "A visual, checklist-style roadmap to track your backend learning progress." }
    ],
    practiceSites: [
      { name: "HackerRank", url: "https://www.hackerrank.com", desc: "Practice problems and free skill certifications." },
      { name: "Replit", url: "https://replit.com", desc: "Free, browser-based coding environment — build and run backend code with no setup." },
      { name: "GitHub", url: "https://github.com", desc: "Where you'll host and showcase every backend project you build." }
    ],
    certifications: [
      { name: "freeCodeCamp — Back End Development and APIs", desc: "A fully free, project-based certification recognized in the dev community." },
      { name: "HackerRank Skill Certifications", desc: "Free, verified badges in SQL, Problem Solving, and specific languages." },
      { name: "Great Learning Academy — Programming", desc: "Free beginner courses with certificates covering programming fundamentals." }
    ],
    projects: [
      { level: "Beginner", title: "REST API for a recipe or book collection", desc: "Build basic CRUD endpoints using a simple framework." },
      { level: "Intermediate", title: "Authentication system", desc: "Add signup/login with JWT tokens and protect routes based on user roles." },
      { level: "Advanced", title: "Deployed full backend service", desc: "Add caching, connect a real database, and deploy it live on a free host." }
    ]
  }
};

function getSelectedCareer() {
  return localStorage.getItem("selectedCareer") || "Data Science";
}

function setSelectedCareer(career) {
  localStorage.setItem("selectedCareer", career);
}

function initHamburger() {
  const btn = document.getElementById("hamburgerBtn");
  const drawer = document.getElementById("navDrawer");
  btn.addEventListener("click", function () {
    drawer.classList.toggle("open");
  });
}

function renderCareerPills(container, currentCareer, onSelect) {
  container.innerHTML = "";
  const careers = ["Data Science", "Data Analyst", "Backend Developer"];
  careers.forEach(function (career) {
    const pill = document.createElement("button");
    pill.className = "career-pill" + (career === currentCareer ? " active" : "");
    pill.textContent = career;
    pill.addEventListener("click", function () {
      setSelectedCareer(career);
      onSelect(career);
    });
    container.appendChild(pill);
  });
}

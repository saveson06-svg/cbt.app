// exam.js

async function loadQuestions() {
  const res = await fetch("/questions");
  const questions = await res.json();

  const container = document.getElementById("exam-container");
  container.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-block");

    div.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${q.question}</p>
      <label><input type="radio" name="q${q.id}" value="A"> ${q.option_a}</label><br>
      <label><input type="radio" name="q${q.id}" value="B"> ${q.option_b}</label><br>
      <label><input type="radio" name="q${q.id}" value="C"> ${q.option_c}</label><br>
      <label><input type="radio" name="q${q.id}" value="D"> ${q.option_d}</label><br>
    `;

    container.appendChild(div);
  });

  document.getElementById("submit-btn").onclick = () => submitAnswers(questions);
}

async function submitAnswers(questions) {
  const answers = questions.map(q => {
    const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
    return { id: q.id, answer: selected ? selected.value : null };
  });

  const res = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers })
  });

  const result = await res.json();
  document.getElementById("result").innerHTML =
    `<h2>Score: ${result.score} / ${result.total}</h2>`;
}

// Load questions on page start
window.onload = loadQuestions;

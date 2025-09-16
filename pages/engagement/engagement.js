// ================= INITIALIZE SIDEBAR =================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Core (sidebar, nav links, toggle, etc.)
    if (typeof initializeCore === 'function') {
        initializeCore();
    }

    // Initialize Engagement page functionalities
    setupQuizUI();
    setupQuizEvents();
    setupPollEvents();
    setupHeritageEvents();
    setupGameEvents();
});

// ================= QUIZ SECTION =================
const quizData = [
    {
        q: "In which year did the Liberation War of Bangladesh occur?",
        options: ["1965", "1971", "1975", "1980"],
        answer: "1971"
    },
    {
        q: "Who declared the independence of Bangladesh?",
        options: [
            "Sheikh Mujibur Rahman",
            "Tajuddin Ahmad",
            "Ziaur Rahman",
            "M. A. G. Osmani"
        ],
        answer: "Sheikh Mujibur Rahman"
    },
    {
        q: "What was the operation launched on March 25, 1971?",
        options: ["Operation Searchlight", "Operation Thunder", "Operation Freedom", "Operation Sunrise"],
        answer: "Operation Searchlight"
    }
];

let currentQ = 0;
let score = 0;
let timer;
const questionBox = document.createElement("div");
const optionsBox = document.createElement("div");
const nextBtn = document.createElement("button");
const scoreBox = document.createElement("div");

function setupQuizUI() {
    const quizContainer = document.getElementById("quizContainer");
    if (!quizContainer) return;

    questionBox.id = "questionBox";
    optionsBox.id = "optionsBox";
    nextBtn.id = "nextQuestion";
    nextBtn.className = "btn btn-success mt-2";
    nextBtn.innerText = "Next";
    scoreBox.id = "quizScore";
    scoreBox.className = "mt-2 fw-bold";

    quizContainer.appendChild(questionBox);
    quizContainer.appendChild(optionsBox);
    quizContainer.appendChild(nextBtn);
    quizContainer.appendChild(scoreBox);

    nextBtn.style.display = "none";
}

function setupQuizEvents() {
    document.getElementById("startQuiz")?.addEventListener("click", () => {
        currentQ = 0;
        score = 0;
        loadQuestion();
        startTimer();
    });

    nextBtn.onclick = () => {
        currentQ++;
        loadQuestion();
    };
}

function loadQuestion() {
    if (currentQ >= quizData.length) {
        questionBox.innerHTML = "<h5>🎉 Quiz Completed!</h5>";
        optionsBox.innerHTML = "";
        nextBtn.style.display = "none";
        scoreBox.innerHTML = `Final Score: ${score}/${quizData.length}`;
        clearInterval(timer);
        return;
    }

    const qData = quizData[currentQ];
    questionBox.innerHTML = `<strong>Q${currentQ + 1}: </strong>${qData.q}`;
    optionsBox.innerHTML = "";

    qData.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary m-1";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        optionsBox.appendChild(btn);
    });

    scoreBox.innerHTML = `Score: ${score}`;
    nextBtn.style.display = "inline-block";
}

function checkAnswer(selected) {
    if (selected === quizData[currentQ].answer) {
        score++;
    }
    currentQ++;
    loadQuestion();
}

function startTimer() {
    let timeLeft = 30;
    const timerBox = document.createElement("div");
    timerBox.id = "timerBox";
    timerBox.className = "fw-bold text-danger mt-2";
    questionBox.parentElement.appendChild(timerBox);

    timer = setInterval(() => {
        timerBox.innerHTML = `⏱ Time Left: ${timeLeft}s`;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            questionBox.innerHTML = "<h5>⏳ Time's up!</h5>";
            optionsBox.innerHTML = "";
            nextBtn.style.display = "none";
        }
    }, 1000);
}

// ================= POLL SECTION =================
function setupPollEvents() {
    const pollForm = document.getElementById("pollForm");
    const pollResult = document.getElementById("pollResult");

    let votes = { "Exhibit A": 0, "Exhibit B": 0, "Exhibit C": 0 };

    pollForm?.addEventListener("submit", e => {
        e.preventDefault();
        const choice = pollForm.vote.value;
        if (choice) {
            votes[choice]++;
            renderPollChart(votes);
        }
    });
}

function renderPollChart(votes) {
    const pollResult = document.getElementById("pollResult");
    pollResult.innerHTML = `<canvas id="pollChart" height="150"></canvas>`;
    const ctx = document.getElementById("pollChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(votes),
            datasets: [
                {
                    label: "Votes",
                    data: Object.values(votes),
                    backgroundColor: ["#006a4e", "#f00", "#555"]
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });
}

// ================= HERITAGE CHALLENGE =================
function setupHeritageEvents() {
    const heritageInput = document.getElementById("heritageInput");
    const submitHeritage = document.getElementById("submitHeritage");
    const heritageList = document.getElementById("heritageList");

    submitHeritage?.addEventListener("click", () => {
        const text = heritageInput.value.trim();
        if (!text) return;
        const storyCard = document.createElement("div");
        storyCard.className = "card p-2 mb-2 shadow-sm";
        storyCard.innerHTML = `
            <p>${text}</p>
            <div class="small text-muted">${new Date().toLocaleString()}</div>
        `;
        heritageList.appendChild(storyCard);
        heritageInput.value = "";
    });
}

// ================= GAMES PLACEHOLDER =================
function setupGameEvents() {
    document.getElementById("guessArtifact")?.addEventListener("click", () => {
        alert("🔎 Guess the Artifact game coming soon!");
    });
    document.getElementById("timelineBuilder")?.addEventListener("click", () => {
        alert("📅 Timeline Builder game coming soon!");
    });
}

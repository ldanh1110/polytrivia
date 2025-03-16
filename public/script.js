const questions = [
    {
        question: "HTML là viết tắt của gì?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correct: "Hyper Text Markup Language"
    },
    {
        question: "CSS được sử dụng để làm gì?",
        options: ["Định dạng trang web", "Lập trình ứng dụng", "Quản lý cơ sở dữ liệu", "Tạo game"],
        correct: "Định dạng trang web"
    },
    {
        question: "JavaScript được sử dụng cho?",
        options: ["Phát triển web", "Chỉnh sửa ảnh", "Soạn thảo văn bản", "Tạo file PDF"],
        correct: "Phát triển web"
    }
];

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.querySelector(".progress");
const resultText = document.getElementById("result-text");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Tiếp tục";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, option, currentQuestion.correct));
        answerButtons.appendChild(button);
    });

    updateProgress();
}

function resetState() {
    nextButton.style.display = "none";
    resultText.innerText = "";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(button, selectedAnswer, correctAnswer) {
    const buttons = answerButtons.querySelectorAll(".btn");
    buttons.forEach(btn => btn.disabled = true);

    if (selectedAnswer === correctAnswer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }

    nextButton.style.display = "block";
}

function updateProgress() {
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progressPercent + "%";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    resetState();
    questionText.innerText = `Bạn đã hoàn thành quiz!`;
    resultText.innerText = `Điểm số: ${score}/${questions.length}`;
    nextButton.innerText = "Chơi lại";
    nextButton.style.display = "block";

    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
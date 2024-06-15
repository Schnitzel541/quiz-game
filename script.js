const questionBox = document.getElementById("question");
const answerInput = document.getElementById("answerInput");
const resultBox = document.getElementById("resultBox");
const correct = document.getElementById("correctCount");
const incorrect = document.getElementById("incorrectCount");

// Long list of questions
const mainQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Who wrote 'Hamlet'?", answer: "William Shakespeare" },
  { question: "What gas do plants absorb from the atmosphere?", answer: "Carbon dioxide",},
  { question: "What is the chemical symbol for water?", answer: "H2O" },
  { question: "What year did the Titanic sink?", answer: "1912" },
  { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  { question: "What planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal?", answer: "Blue whale" },
  { question: "What is the hardest natural substance on Earth?", answer: "Diamond",},
  { question: "What is the main ingredient in guacamole?", answer: "Avocado" },
  { question: "What is the smallest country in the world?", answer: "Vatican City",},
  { question: "What element does 'O' represent on the periodic table?", answer: "Oxygen",},
  { question: "In what country would you find the ancient city of Petra?", answer: "Jordan",},
  { question: "What is the longest river in the world?", answer: "Nile" },
  { question: "What is the name of the first artificial Earth satellite?", answer: "Sputnik 1",},
  { question: "Which organ in the human body produces insulin?", answer: "Pancreas",},
  { question: "What novel features the character Jay Gatsby?", answer: "The Great Gatsby",},
  { question: "Who was the first woman to win a Nobel Prize (in 1903)?", answer: "Marie Curie",},
  { question: "What is the capital of Australia?", answer: "Canberra" },
];
const additionalQuestions = [
  { question: "What is the smallest bone in the human body?", answer: "Stapes",},
  { question: "What chemical element has the symbol 'Na'?", answer: "Sodium" },
  { question: "What is the longest-running Broadway show?", answer: "The Phantom of the Opera",},
  { question: "What year did the Berlin Wall fall?", answer: "1989" },
  { question: "Who is the author of '1984'?", answer: "George Orwell" },
  { question: "What planet is closest to the Sun?", answer: "Mercury" },
  { question: "What is the capital of Japan?", answer: "Tokyo" },
  { question: "What language has the most speakers worldwide?", answer: "Mandarin",},
  { question: "What country has the largest population?", answer: "China" },
  { question: "Who painted 'Starry Night'?", answer: "Vincent van Gogh" },
  { question: "What is the periodic table symbol for gold?", answer: "Au" },
  { question: "What is the largest organ in the human body?", answer: "Skin" },
  { question: "Who wrote 'Pride and Prejudice'?", answer: "Jane Austen" },
  { question: "What is the capital of Egypt?", answer: "Cairo" },
  { question: "What is the hardest known natural material in the universe?", answer: "Nuclear pasta",},
  { question: "What is the fastest land animal?", answer: "Cheetah" },
  { question: "Who discovered penicillin?", answer: "Alexander Fleming" },
  { question: "What year did World War I begin?", answer: "1914" },
  { question: "Who composed the music for the opera 'Carmen'?", answer: "Georges Bizet",},
  { question: "What is the currency of the United Kingdom?",answer: "Pound Sterling",},
];

const questions = [...mainQuestions, ...additionalQuestions];

let correctCount = parseInt(localStorage.getItem("correctCount")) || 0;
let incorrectCount = parseInt(localStorage.getItem("incorrectCount")) || 0;
let currentQuestion = localStorage.getItem("currentQuestion");
let timeout = 1000;

correct.textContent = `Correct: ${correctCount}`;
incorrect.textContent = `Incorrect: ${incorrectCount}`;

const totalQuestions = questions.length;

const getRandomIndex = () => {
  const randomIndex = Math.floor(Math.random() * totalQuestions);
  localStorage.setItem("currentQuestion", randomIndex);
  return randomIndex;
};

const getRandomQuestion = () => {
  let randomIndex = getRandomIndex();
  currentQuestion = questions[randomIndex];
  questionBox.textContent = questions[randomIndex].question;
  answerInput.value = "";
  resultBox.textContent = "";
  failCountOnQuestion = 0;
};

const getCurrentQuestion = () => {
  let currentQuestion = localStorage.getItem("currentQuestion");
  questionBox.textContent = questions[currentQuestion].question;
  answerInput.value = "";
  resultBox.textContent = "";
  if (currentQuestion === null) {
    getRandomQuestion();
  }
};

failCountOnQuestion = 0;

const submitAnswer = () => {
  let currentIndex = parseInt(localStorage.getItem("currentQuestion"));
  let currentQuestion = questions[currentIndex];
  let answer = answerInput.value.trim();
  let isQuestionScheduled = false;

  if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    resultBox.textContent = "Correct!";
    if (!isQuestionScheduled) {
      isQuestionScheduled = true;
      correctCount++;
      failCountOnQuestion = 0;
      correct.textContent = `Correct: ${correctCount}`;
      localStorage.setItem("correctCount", correctCount.toString());
      setTimeout(getRandomQuestion, timeout);
    }
  } else {
    resultBox.textContent = `That is incorrect, guess again! (${
      failCountOnQuestion + 1
    } attempts)`;
    failCountOnQuestion++;
    incorrectCount++;
    incorrect.textContent = `Incorrect: ${incorrectCount}`;
    localStorage.setItem("incorrectCount", incorrectCount.toString());
    answerInput.value = "";
  }
};

const resetScore = () => {
  correctCount = 0;
  correct.textContent = `Correct: ${0}`;
  incorrectCount = 0;
  incorrect.textContent = `Incorrect: ${0}`;
  localStorage.setItem("incorrectCount", (incorrectCount = 0));
  localStorage.setItem("correctCount", (correctCount = 0));
  getRandomQuestion();
};

answerInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitAnswer();
  }
});

const switchMode = () => {
  let darkModeSwitch = document.getElementById("darkModeSwitch");
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    darkModeSwitch.textContent = "Light Mode";
  } else {
    darkModeSwitch.textContent = "Dark Mode";
    localStorage.setItem("darkMode", "disabled");
  }
};

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeSwitch.textContent = "Light Mode";
}

if (
  localStorage.getItem("currentQuestion") === null ||
  localStorage.getItem("currentQuestion") === "null"
) {
  window.onload = getRandomQuestion;
} else {
  window.onload = getCurrentQuestion;
}

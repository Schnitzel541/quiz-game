const questionBox = document.getElementById("question");
const answerInput = document.getElementById("answerInput");
const resultBox = document.getElementById("resultBox");


const mainQuestions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "Who wrote 'Hamlet'?", answer: "William Shakespeare" },
    { question: "What gas do plants absorb from the atmosphere?",  answer: "Carbon dioxide",},
    { question: "What is the chemical symbol for water?", answer: "H2O" },
    { question: "What year did the Titanic sink?", answer: "1912" },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    { question: "What planet is known as the Red Planet?", answer: "Mars" },
    { question: "What is the largest mammal?", answer: "Blue whale" },
    { question: "What is the hardest natural substance on Earth?",  answer: "Diamond",},
    { question: "What is the main ingredient in guacamole?", answer: "Avocado" },
    { question: "What is the smallest country in the world?",  answer: "Vatican City",},
    { question: "What element does 'O' represent on the periodic table?",  answer: "Oxygen",},
    { question: "In what country would you find the ancient city of Petra?",  answer: "Jordan",},
    { question: "What is the longest river in the world?", answer: "Nile" },
    { question: "What is the name of the first artificial Earth satellite?", answer: "Sputnik 1" },
    { question: "Which organ in the human body produces insulin?",answer: "Pancreas",},
    { question: "What novel features the character Jay Gatsby?",answer: "The Great Gatsby",},
    { question: "Who was the first woman to win a Nobel Prize (in 1903)?",answer: "Marie Curie",},
    { question: "What is the capital of Australia?", answer: "Canberra" },
  ];

  const additionalQuestions = [
    { question: "What is the smallest bone in the human body?", answer: "Stapes" },
    { question: "What chemical element has the symbol 'Na'?", answer: "Sodium" },
    { question: "What is the longest-running Broadway show?", answer: "The Phantom of the Opera" },
    { question: "What year did the Berlin Wall fall?", answer: "1989" },
    { question: "Who is the author of '1984'?", answer: "George Orwell" },
    { question: "What planet is closest to the Sun?", answer: "Mercury" },
    { question: "What is the capital of Japan?", answer: "Tokyo" },
    { question: "What language has the most speakers worldwide?", answer: "Mandarin" },
    { question: "What country has the largest population?", answer: "China" },
    { question: "Who painted 'Starry Night'?", answer: "Vincent van Gogh" },
    { question: "What is the periodic table symbol for gold?", answer: "Au" },
    { question: "What is the largest organ in the human body?", answer: "Skin" },
    { question: "Who wrote 'Pride and Prejudice'?", answer: "Jane Austen" },
    { question: "What is the capital of Egypt?", answer: "Cairo" },
    { question: "What is the hardest known natural material in the universe?", answer: "Nuclear pasta" },
    { question: "What is the fastest land animal?", answer: "Cheetah" },
    { question: "Who discovered penicillin?", answer: "Alexander Fleming" },
    { question: "What year did World War I begin?", answer: "1914" },
    { question: "Who composed the music for the opera 'Carmen'?", answer: "Georges Bizet" },
    { question: "What is the currency of the United Kingdom?", answer: "Pound Sterling" }
];

const questions = [...mainQuestions, ...additionalQuestions]

let currentQuestion = null;
let timeout = 800

const getRandomQuestion = () => {
  const totalQuestions = questions.length;
  const randomIndex = Math.floor(Math.random() * totalQuestions);
  currentQuestion = questions[randomIndex];
  questionBox.textContent = questions[randomIndex].question;
  answerInput.value = "";
  resultBox.textContent = "";
};

const submitAnswer = () => {
  let answer = answerInput.value.trim();
  if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    resultBox.textContent = "Correct!";
    setTimeout(getRandomQuestion, timeout);
  } else {
    resultBox.textContent = "That is incorrect, guess again!";
  }
};

answerInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitAnswer();
  }
});

window.onload(getRandomQuestion());

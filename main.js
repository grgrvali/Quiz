const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");
const optionElements = document.querySelectorAll(".option");

const question = document.querySelector("#question"); // вопрос

const numberOfQuestion = document.querySelector("#number-of-question"); // номер вопроса
const numberOfAllQuestions = document.querySelector("#number-of-all-questions"); //количество

let indexOfQuestion = 0; // текущий вопрос
let indexOfPage = 0; // страница

const answersTracker = document.querySelector("#answers-tracker"); //обертка для трекера
const btnNext = document.querySelector("#btn-next"); //кнопка далее

let score = 0; // итоговый результат

const correctAnswer = document.querySelector("#correct-answer"); // кол-во правильных ответов
const numberOfAllQuestions2 = document.querySelector(
  "#number-of-all-questions-2"
); //кол-во всех вопросов в м.о
const btnTryAgain = document.querySelector("#btn-try-again"); //кнопка начать заново

const questions = [
  {
    question: "HTML - это ...",
    options: [
      "Язык программирования",
      "Каскадная таблица стилей",
      "Язык разметки",
      "Нет правильного ответа",
    ],
    rightAnswer: 2,
  },
  {
    question: "Как создать заголовок?",
    options: ["тег p", "тег h", "тег div", "Нет правильного ответа"],
    rightAnswer: 1,
  },
  {
    question: "Дорогу осилит ...",
    options: ["Умнейший", "Каждый", "Сильнейший", "Идущий"],
    rightAnswer: 3,
  },
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question;

  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1; //номер сраницы
  indexOfPage++; //увеличение индекса стр
};

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDublicate = false;

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDublicate = true;
        }
      });
      if (hitDublicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Ответьте на вопрос!");
  } else {
    randomQuestion();
    enableOptions();
  }
};

const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);

btnNext.addEventListener("click", () => {
  validate();
});

window.addEventListener("load", () => {
  randomQuestion();
  answerTracker();
});

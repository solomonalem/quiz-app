// DOM ELEMENTS
var startBtn = document.querySelector("#btn-start");
var questionContainer = document.querySelector("#question-container");
var result = document.querySelector("#result");
var resultValue = document.getElementById("set-result");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector("#answers");
var score = 0;
var currentQn = 0;

var startQuiz = function () {
  console.log("game started");
  result.textContent = "";
  questionContainer.classList.remove("hide");
  nextQuestion(currentQn);
};

startBtn.addEventListener("click", startQuiz);

var nextQuestion = function (currentQn) {
  resetQuestionArea();

  questionEl.innerText = questions[currentQn].question;
  var arrAnswer = questions[currentQn].answers;

  for (var i = 0; i < arrAnswer.length; i++) {
    const answerButton = document.createElement("button");
    answerButton.innerText = `${i + 1}. ${arrAnswer[i].text}`;
    answerButton.classList.add("btn");
    if (arrAnswer[i].correct) {
      answerButton.dataset.correct = arrAnswer[i].correct;
    }

    answerButton.addEventListener("click", chooseAnswer);
    answerEl.appendChild(answerButton);
  }
};

var resetQuestionArea = function () {
  result.textContent = "";
  while (answerEl.firstChild) {
    answerEl.removeChild(answerEl.firstChild);
  }
};

var chooseAnswer = function (event) {
  var selectedButton = event.target;
  var correct = selectedButton.dataset.correct;
  console.log(result);
  setResult(result, correct);
  currentQn++;

  if (questions.length > currentQn + 1) {
    next;
  }
  else{
      
  }

  // Calls the nextQuestion function after 2sec
  var next = setTimeout(() => {
    nextQuestion(currentQn);
  }, 2000);
};

var setResult = function (element, correct) {
  clearResult(element);
  if (correct) {
    element.textContent = "correct";
    score = score + 7;
  } else {
    element.textContent = "wrong";
  }
};

var clearResult = function (element) {
  element.textContent = "";
};

var questions = [
  {
    question: "Which of the following is not a valid JavaScript variable name?",
    answers: [
      {
        text: "2names",
        correct: true,
      },
      {
        text: "_first_and_last_names",
        correct: false,
      },
      {
        text: "FirstAndLast",
        correct: false,
      },
      {
        text: "None of the above",
        correct: false,
      },
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      {
        text: "<js>",
        correct: false,
      },
      {
        text: "scripting>",
        correct: false,
      },
      {
        text: "<script>",
        correct: true,
      },
      {
        text: "<javascript>",
        correct: false,
      },
    ],
  },
  {
    question:
      "______method evaluates a string of JavaScript code in the context of the specified object?",
    answers: [
      {
        text: "Eval",
        correct: true,
      },
      {
        text: "ParseInt>",
        correct: false,
      },
      {
        text: "ParseFloat",
        correct: false,
      },
      {
        text: "Efloat",
        correct: false,
      },
    ],
  },
];

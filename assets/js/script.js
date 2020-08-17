// DOM ELEMENTS
var startBtn = document.querySelector("#btn-start");
var questionContainer = document.querySelector("#question-container");
var result = document.querySelector("#result");
var resultValue = document.getElementById("set-result");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector("#answers");
var initialEl = document.getElementById("initials");
var highScoreEL = document.getElementById("high-score");
var goBack = document.getElementById("go-back");
var clearScore = document.getElementById("clear-score");
var highScoreUlEl = document.getElementById("high-score-ul");
var viewScore = document.getElementById("score");
var timeEl = document.getElementById("timer");

var highScore = [];
var score = 0;
var currentQn = 0;
//-------------    FUNCTION START ---------------------------------
var startQuiz = function () {
  currentQn = 0;
  highScoreEL.classList.add("hide");

  result.textContent = "";
  questionContainer.classList.remove("hide");
  timer();
  nextQuestion(currentQn);
};

startBtn.addEventListener("click", startQuiz);

// -------------FUNCTION NEXT-QUESTION ----------------------------
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

// ------------- FUNCTION RESET QUESTION AREA ------------------------
var resetQuestionArea = function () {
  result.textContent = "";
  while (answerEl.firstChild) {
    answerEl.removeChild(answerEl.firstChild);
  }
};

// ------- FUNCTION CHOOSE ANSWER ----------------------------------------
var chooseAnswer = function (event) {
  var selectedButton = event.target;
  var correct = selectedButton.dataset.correct;

  setResult(result, correct);
  currentQn++;

  if (questions.length > currentQn) {
    // Calls the nextQuestion function after 2sec
    setTimeout(() => {
      nextQuestion(currentQn);
    }, 1000);
  } else {
    //stop timer
    stopTimer();
    //save high score
    storeHighScore(score);
  }
};

var setResult = function (element, correct) {
  clearResult(element);
  if (correct) {
    element.innerHTML = "<h3>correct !</h3>";
    score = score + 7;
  } else {
    element.innerHTML = "<h3>wrong !</h3>";
    timeleft = timeleft - 10;
  }
};

// ------------- FUNCTION CLEAR RESULT --------------------
var clearResult = function (element) {
  element.textContent = "";
};

// ------------  FUNCTION STORE RESULT --------------------
var storeHighScore = function (score) {
  questionContainer.textContent = "";
  result.textContent = "";

  // create MAIN DIV element
  var scoreContainer = document.createElement("div");

  //create h1 element
  var scoreHeader = document.createElement("h1");
  scoreHeader.innerText = "All done !";

  //create h2 element
  var scoreFinal = document.createElement("h2");

  // displaying the score to the h2 element
  scoreFinal.innerText = `Your final score is : ${score}`;

  //create inner div elemrnt to hold the input and submit button
  var scoreInputContainer = document.createElement("div");

  initialEl.classList.remove("hide");

  // create span for the input element
  var scoreInputLabel = document.createElement("span");
  scoreInputLabel.innerText = "Enter Initials : ";

  //create submit  button
  var scoreInputButton = document.createElement("button");
  scoreInputButton.innerHTML = "submit";
  scoreInputButton.classList.add("btn");

  // append the input, buttn span elements to the INNER DIV element
  scoreInputContainer.appendChild(scoreInputLabel);
  scoreInputContainer.appendChild(initialEl);
  scoreInputContainer.appendChild(scoreInputButton);

  // append inner div to the MAIN DIV container
  scoreContainer.appendChild(scoreHeader);
  scoreContainer.appendChild(scoreFinal);
  scoreContainer.appendChild(scoreInputContainer);
  scoreContainer.classList.add("score-container");

  // APPEND TO THE PAGE  QUESTION CONTAINER
  questionContainer.appendChild(scoreContainer);

  //when submit button clicked
  scoreInputButton.addEventListener("click", saveScores);
};

var saveScores = function () {
  questionContainer.textContent = "";
  var initials = initialEl.value.trim();
  var highScoreObject = {
    initial: initials,
    score: score,
  };

  if (initials === "") {
    alert("initials cannot be blank");
  } else {
    // Save score and initials to localStorage and render the last registered.

    highScore.push(highScoreObject);
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }

  loadScore(highScoreObject);
};

var loadScore = function (highScoreObject) {
  highScoreEL.classList.remove("hide");
  var scoreListItem = document.createElement("li");
  scoreListItem.innerHTML =
    "<span>" +
    highScoreObject.initial +
    "</span>- <span>" +
    highScoreObject.score +
    "</span>";
  highScoreUlEl.append(scoreListItem);
  questionContainer.appendChild(highScoreEL);
};

// --- TIMER FUNCTION --------

var timeleft = 59;
var timer = function () {
  setInterval(function () {
    if (timeleft <= 0) {
      stopTimer();
      timeEl.innerHTML = `STOP`;
    } else {
      timeEl.innerHTML = `00:${timeleft}`;
    }
    timeleft -= 1;
  }, 1000);
};

var stopTimer = function () {
  clearInterval(timer);
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
  {
    question: "Choose the client-side JavaScript object?",
    answers: [
      {
        text: "Database",
        correct: false,
      },
      {
        text: "Cursor>",
        correct: false,
      },
      {
        text: "Client",
        correct: false,
      },
      {
        text: "FileUpLoad",
        correct: true,
      },
    ],
  },
];

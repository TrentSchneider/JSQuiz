var timerEl = document.getElementById("runningTimer"),
  timeLeft = 60,
  score,
  beginning = document.getElementById("intro"),
  middle = document.getElementById("stage2"),
  end = document.getElementById("end"),
  starter = document.querySelector("#start"),
  submitScore = document.querySelector("#submit"),
  qSpace = document.querySelector(".questionSpace"),
  aSpace = document.querySelector(".answerSpace"),
  rSpace = document.querySelector(".resultSpace"),
  questionCount = 0;

starter.addEventListener("click", function () {
  beginning.classList.add("hide");
  middle.classList.remove("hide");
  timeLeft = 30;

  // sets the timer
  function timer() {
    var timerInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      if (timeLeft <= 0 || questionCount === quizInfo.length) {
        middle.classList.add("hide");
        end.classList.remove("hide");
        clearInterval(timerInterval);
        if (timeLeft < 0) {
          timeLeft = 0;
        }
      }
    }, 1000);
  }
  timer();

  // loads the questions and answers

  function loadQs() {
    var questionInsert = document.createElement("h5");
    questionInsert.textContent = quizInfo[questionCount].question;
    qSpace.appendChild(questionInsert);

    // adds the answers to their own buttons
    for (let i = 0; i < quizInfo[questionCount].choices.length; i++) {
      var answerDiv = document.createElement("div");
      var answerInsert = document.createElement("button");
      var qNum = i + 1;
      answerInsert.textContent =
        qNum + ". " + quizInfo[questionCount].choices[i];
      answerDiv.setAttribute("id", i);
      aSpace.appendChild(answerDiv);
      answerDiv.appendChild(answerInsert);
    }
    // pull the answer from the button selection
    aSpace.addEventListener("click", function (event) {
      event.preventDefault();
      if (event.target.matches("button")) {
        event.target.onclick = null;
        var userPick =
          quizInfo[questionCount].choices[event.target.parentElement.id];

        console.log(userPick);
        var correctA = "Correct!",
          incorrectA = "Incorrect!",
          answer;

        if (userPick === quizInfo[questionCount].answer) {
          answer = correctA;
        } else {
          answer = incorrectA;
          timeLeft = timeLeft - 10;
        }
        function displayAnswer() {
          var result = document.createElement("p");
          result.textContent = answer;
          rSpace.appendChild(result);
        }
        displayAnswer();
        setTimeout(function () {
          questionCount++;
        }, 3000);
      }
    });
  }
  loadQs();
});

// creates and stores initials and score followed by sending the user to highscore.html
submitScore.addEventListener("click", function () {
  event.preventDefault();
  var scoreArray = JSON.parse(localStorage.getItem("highScore"));
  if (scoreArray === null) {
    scoreArray = [];
  }
  var initialToArray = document.querySelector("#initials").value;

  scoreArray.push({ initials: initialToArray, score: timeLeft });
  console.log(scoreArray);
  var initialToStor = JSON.stringify(scoreArray);
  console.log(scoreArray);
  localStorage.setItem("highScore", initialToStor);
  window.location.href = "highscore.html";
});

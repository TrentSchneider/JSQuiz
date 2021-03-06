var timerEl = document.getElementById("runningTimer"),
	timeDivEl = document.querySelector(".timerStyle"),
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
	showScore = document.querySelector("#scoreDisp"),
	questionCount = 0;

//transitions from quiz to high score initial entry
function endGame() {
	middle.classList.add("hide");
	end.classList.remove("hide");
	showScore.textContent = timeLeft;
	// clearInterval(timerInterval);
	timeDivEl.remove();
}

// transitions from initial prompt to the quiz
starter.addEventListener("click", function () {
	beginning.classList.add("hide");
	middle.classList.remove("hide");
	timeLeft = 60;

	// sets the timer
	function timer() {
		var timerInterval = setInterval(function () {
			timeLeft--;
			timerEl.textContent = timeLeft;
			if (timeLeft <= 0) {
				timeLeft = 0;
			}
			if (timeLeft === 0) {
				endGame();
				clearInterval(timerInterval);
			}
		}, 1000);
	}
	timer();
});

// loads the questions and answers
function loadQs() {
	var questionInsert = document.createElement("h4");
	questionInsert.textContent = quizInfo[questionCount].question;
	questionInsert.setAttribute("class", "text-left");
	qSpace.appendChild(questionInsert);

	// adds the answer choices to their own buttons
	for (let i = 0; i < quizInfo[questionCount].choices.length; i++) {
		var answerDiv = document.createElement("div");
		var answerInsert = document.createElement("button");
		var qNum = i + 1;
		answerInsert.setAttribute("type", "button");
		answerInsert.setAttribute("class", "btn btn-info text-left");
		answerInsert.textContent = qNum + ". " + quizInfo[questionCount].choices[i];
		answerDiv.setAttribute("id", i);
		answerDiv.setAttribute("class", "float-left");
		answerInsert.setAttribute("id", i);
		aSpace.appendChild(answerDiv);
		answerDiv.appendChild(answerInsert);
	}
}

// compares the user answer to the answer in the array and responds accordingly
function displayAnswer() {
	var userPick = quizInfo[questionCount].choices[event.target.parentElement.id];
	var correctA = "Correct!",
		incorrectA = "Incorrect!",
		answer;

	if (userPick === quizInfo[questionCount].answer) {
		answer = correctA;
	} else {
		answer = incorrectA;
		timeLeft = timeLeft - 10;
	}

	// Displays whether the answer was correct or incorrect and then sets timer to remove message
	rSpace.innerHTML = answer;
	rSpace.setAttribute("class", "font-weight-light");
	if (rSpace.innerHTML !== "") {
		setTimeout(function () {
			rSpace.innerHTML = "";
		}, 1000);
	}
}
loadQs();

// pull the answer from the button selection and loads the next question
function setupAs() {
	aSpace.addEventListener("click", function (event) {
		event.preventDefault();
		if (event.target.matches("button")) {
			event.target.onclick = null;
			displayAnswer();
			qSpace.innerHTML = "";
			aSpace.innerHTML = "";
			questionCount++;
			if (questionCount == quizInfo.length) {
				endGame();
			} else if (
				questionCount < quizInfo.length ||
				quizInfo[questionCount] != null
			) {
				loadQs();
			}
		}
	});
}
setupAs();

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

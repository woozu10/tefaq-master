import {
getQuestionCount
} from "../services/settingsService.js";

import {
QuestionPalette
} from "../components/QuestionPalette.js";

import {
getCategory
} from "../services/categoryService.js";

import {
saveWrongQuestion,
removeWrongQuestion
} from "../services/wrongNoteService.js";

import {
addFavorite,
isFavorite
} from "../services/favoriteService.js";

import {
getMode
} from "../services/modeService.js";

import {
saveResult
} from "../services/statisticsService.js";

import {
getQuizQuestions,
clearQuizQuestions
} from "../services/quizService.js";

import {
setReviewQuestions
} from "../services/reviewService.js";

import {
App
} from "../App.js";

import {
Timer
} from "../components/Timer.js";

import {
ProgressBar
} from "../components/ProgressBar.js";

import {
QuestionCard
} from "../components/QuestionCard.js";

import {
loadQuestions
} from "../services/loadQuestions.js";

import {
createExamQuestions
} from "../services/examService.js";

import {
shuffleChoices
} from "../services/shuffleService.js";


/* =========================================================
CE STATE
========================================================= */

let questionBank = [];

let examQuestions = [];

let currentQuestion = 0;

let score = 0;

let message = "";

let answered = false;

let selectedAnswer = -1;


/* =========================================================
JSON LOADING STATE
========================================================= */

let loaded = false;

let loading = false;

let loadError = "";


/* =========================================================
RENDER
========================================================= */

function renderCE() {

const app =
document.getElementById("app");

if (app) {

app.innerHTML =
App();

}

}


/* =========================================================
SAVE EXAM PROGRESS
========================================================= */

function saveExamProgress() {

if (
!Array.isArray(examQuestions) ||
examQuestions.length === 0
) {

return;

}

localStorage.setItem(
"ceSavedExamQuestions",
JSON.stringify(examQuestions)
);

localStorage.setItem(
"ceSavedCurrentQuestion",
String(currentQuestion)
);

localStorage.setItem(
"ceSavedScore",
String(score)
);

localStorage.setItem(
"ceSavedAnswered",
String(answered)
);

localStorage.setItem(
"ceSavedSelectedAnswer",
String(selectedAnswer)
);

localStorage.setItem(
"ceSavedMessage",
message
);

}


/* =========================================================
LOAD SAVED EXAM PROGRESS
========================================================= */

function restoreExamProgress() {

const savedQuestions =
localStorage.getItem(
"ceSavedExamQuestions"
);

if (!savedQuestions) {

return false;

}

try {

const parsed =
JSON.parse(savedQuestions);

if (
!Array.isArray(parsed) ||
parsed.length === 0
) {

return false;

}

examQuestions =
parsed;

currentQuestion =
Number(
localStorage.getItem(
"ceSavedCurrentQuestion"
) || 0
);

score =
Number(
localStorage.getItem(
"ceSavedScore"
) || 0
);

answered =
localStorage.getItem(
"ceSavedAnswered"
) === "true";

selectedAnswer =
Number(
localStorage.getItem(
"ceSavedSelectedAnswer"
) || -1
);

message =
localStorage.getItem(
"ceSavedMessage"
) || "";

if (
currentQuestion < 0 ||
currentQuestion >=
examQuestions.length
) {

currentQuestion = 0;

}

return true;

} catch (error) {

console.error(
"Cannot restore saved CE exam:",
error
);

clearSavedExam();

return false;

}

}


/* =========================================================
CLEAR SAVED EXAM
========================================================= */

function clearSavedExam() {

localStorage.removeItem(
"ceSavedExamQuestions"
);

localStorage.removeItem(
"ceSavedCurrentQuestion"
);

localStorage.removeItem(
"ceSavedScore"
);

localStorage.removeItem(
"ceSavedAnswered"
);

localStorage.removeItem(
"ceSavedSelectedAnswer"
);

localStorage.removeItem(
"ceSavedMessage"
);

}


/* =========================================================
LOAD CE B2 JSON
========================================================= */

async function loadQuestionBank() {

if (
loaded ||
loading
) {

return;

}

loading = true;

loadError = "";

try {

const data =
await loadQuestions(
"ce",
"B2"
);

if (
!Array.isArray(data)
) {

throw new Error(
"B2.json must contain a JSON array."
);

}

if (
data.length === 0
) {

throw new Error(
"B2.json contains no questions."
);

}

questionBank =
data;

loaded =
true;

} catch (error) {

console.error(
"CE question loading error:",
error
);

loadError =
error?.message ||
"Unable to load CE B2 questions.";

} finally {

loading =
false;

renderCE();

}

}


/* =========================================================
CREATE CE EXAM
========================================================= */

function createCEExam() {

const customQuiz =
getQuizQuestions();

if (
Array.isArray(customQuiz) &&
customQuiz.length > 0
) {

examQuestions =
customQuiz.map(
question =>
shuffleChoices(question)
);

clearQuizQuestions();

currentQuestion = 0;

score = 0;

message = "";

answered = false;

selectedAnswer = -1;

saveExamProgress();

return;

}


const category =
getCategory();

let questions =
[...questionBank];


if (
category &&
category !== "ALL"
) {

questions =
questions.filter(
question =>
question.category ===
category
);

}


if (
questions.length === 0
) {

console.warn(
  `No CE questions found for category: ${category}. Using ALL.`
);

questions =
[...questionBank];

}


examQuestions =
createExamQuestions(
questions,
getQuestionCount()
).map(
question =>
shuffleChoices(question)
);


currentQuestion = 0;

score = 0;

message = "";

answered = false;

selectedAnswer = -1;

saveExamProgress();

}


/* =========================================================
RESET CURRENT EXAM
========================================================= */

function resetExamState() {

examQuestions = [];

currentQuestion = 0;

score = 0;

message = "";

answered = false;

selectedAnswer = -1;

}
/* =========================================================
CE PAGE
========================================================= */

export function CE() {

if (!loaded) {

if (
!loading &&
!loadError
) {

loadQuestionBank();

}

if (loadError) {

return `
<main class="content">

<h2>
Compréhension Écrite
</h2>

<div class="card">

<h3>
❌ Question Loading Error
</h3>

<p>
$`{loadError}
</p>

<br>

<p>

Check:
<strong>

public/data/ce/B2.json

</strong>

</p>

<br>

<button
onclick="retryCELoad()"
>

Retry

</button>

</div>

</main>
`;

}

return `

<main class="content">

<h2>

Compréhension Écrite

</h2>

<div class="card">

<h3>

Loading Questions...

</h3>

<p>

B2 question bank is loading.

</p>

</div>

</main>

`;

}

if (
examQuestions.length === 0
) {

const restored =
restoreExamProgress();

if (!restored) {

createCEExam();

}

}

if (
examQuestions.length === 0
) {

return `

<main class="content">

<h2>

Compréhension Écrite

</h2>

<div class="card">

<h3>

No Questions

</h3>

<p>

No CE questions are available.

</p>

</div>

</main>

`;

}

const q =
examQuestions[currentQuestion];

const mode =
getMode();

const renderButton = (index) => {

let style = "";

if (
answered &&
mode === "practice"
) {

if (
index === q.answer
) {

style =
"background:#4CAF50;color:white;";

} else if (
index === selectedAnswer
) {

style =
"background:#F44336;color:white;";

}

}

return `

<button

style="`${style}"

onclick="checkCEAnswer($`{index})"

`${answered ? "disabled" : ""}

>

$`{q.choices[index]}

</button>

`;

};

return `

<main class="content">

<h2>

Compréhension Écrite

</h2>

<h3>

Question

`${currentQuestion + 1}

/

$`{examQuestions.length}

</h3>

`${QuestionPalette(

examQuestions,

currentQuestion

)}

$`{Timer(60)}

`${ProgressBar(

currentQuestion + 1,

examQuestions.length

)}

$`{

mode === "practice"

? `

<p>

<strong>

Score : `${score}

</strong>

</p>

`

: ""

}

<div

style="

display:flex;

gap:10px;

flex-wrap:wrap;

margin-bottom:15px;

"

>

<button onclick="pauseCEExam()">

⏸ Pause

</button>

<button onclick="startNewCEExam()">

🔄 New Exam

</button>

</div>

<div class="card">

<h3>

📖 Reading

</h3>

<p style="line-height:1.8">

$`{q.text}

</p>

</div>

`${QuestionCard(

q.question,

q.choices,

renderButton

)}

<p

style="

font-size:20px;

font-weight:bold;

"

>

${message}

</p>
$`{

answered &&
mode === "practice"

? `

<div class="card">

<h3>

📖 Explanation

</h3>

<p>

`${

q.explanation ||

"No explanation available."

}

</p>

$`{

Array.isArray(q.vocabulary) &&

q.vocabulary.length > 0

? `

<hr>

<h4>

Vocabulary

</h4>

<p>

`${q.vocabulary.join(" · ")}

</p>

`

: ""

}

</div>

`

: ""

}

<hr>

<button onclick="favoriteCEQuestion()">

$`{

isFavorite(q.id)

? "⭐ Added"

: "☆ Favorite"

}

</button>

<button

onclick="nextCEQuestion()"

`${answered ? "" : "disabled"}

>

Next →

</button>

</main>

`;

}


/* =========================================================
CHECK ANSWER
========================================================= */

window.checkCEAnswer = function(index){

if(answered) return;

const q = examQuestions[currentQuestion];

selectedAnswer = index;

q.userAnswer = index;

if(index===q.answer){

score++;

removeWrongQuestion(q.id);

message="✅ Correct!";

}else{

saveWrongQuestion(q);

message="❌ Incorrect!";

}

answered=true;

saveExamProgress();

document.getElementById("app").innerHTML=App();

};


/* =========================================================
NEXT QUESTION
========================================================= */

window.nextCEQuestion=function(){

currentQuestion++;

if(currentQuestion>=examQuestions.length){

setReviewQuestions(examQuestions);

localStorage.setItem(

"lastExamQuestions",

JSON.stringify(examQuestions)

);

saveResult(

score,

examQuestions.length

);

localStorage.setItem("score",score);

localStorage.setItem("total",examQuestions.length);

localStorage.setItem("currentPage","result");

clearSavedExam();

resetExamState();

location.reload();

return;

}

answered=false;

selectedAnswer=-1;

message="";

saveExamProgress();

document.getElementById("app").innerHTML=App();

};


/* =========================================================
PAUSE
========================================================= */

window.pauseCEExam=function(){

saveExamProgress();

localStorage.setItem("currentPage","ce");

alert("Progress saved.");

};


/* =========================================================
NEW EXAM
========================================================= */

window.startNewCEExam=function(){

clearSavedExam();

resetExamState();

document.getElementById("app").innerHTML=App();

};


/* =========================================================
FAVORITE
========================================================= */

window.favoriteCEQuestion=function(){

addFavorite(examQuestions[currentQuestion]);

saveExamProgress();

document.getElementById("app").innerHTML=App();

};


/* =========================================================
RETRY
========================================================= */

window.retryCELoad=function(){

loadError="";

loaded=false;

loading=false;

questionBank=[];

loadQuestionBank();

};


/* =========================================================
PALETTE
========================================================= */

window.goQuestion=function(index){

currentQuestion=index;

document.getElementById("app").innerHTML=App();

};

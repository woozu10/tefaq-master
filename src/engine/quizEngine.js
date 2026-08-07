let currentQuestion = 0;
let score = 0;

export function getQuestionIndex() {
    return currentQuestion;
}

export function getScore() {
    return score;
}

export function addScore() {
    score++;
}

export function nextQuestion(total) {

    currentQuestion++;

    if (currentQuestion >= total) {

        currentQuestion = 0;
        score = 0;

        return true;
    }

    return false;
}

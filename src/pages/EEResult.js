export function EEResult(){

const topic=
JSON.parse(
localStorage.getItem("eeTopic")
);

const answer=
localStorage.getItem("eeAnswer")||"";

return `

<main class="content">

<h2>

📝 Writing Submitted

</h2>

<div class="card">

<h3>

${topic.title}

</h3>

<p>

${topic.instruction}

</p>

</div>

<div class="card">

<pre
style="
white-space:pre-wrap;
"
>

${answer}

</pre>

</div>

<button
onclick="history.back()"
>

← Back

</button>

</main>

`;

}

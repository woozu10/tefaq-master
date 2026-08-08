import {
  getVoiceSpeed,
  setVoiceSpeed,
  getQuestionCount,
  setQuestionCount
} from "../services/settingsService.js";

import { setCurrentPage } from "../services/router.js";

window.changeVoiceSpeed=function(speed){

    setVoiceSpeed(Number(speed));

    location.reload();

};

window.changeQuestionCount=function(count){

    setQuestionCount(Number(count));

    location.reload();

};

window.backDashboard=function(){

    setCurrentPage("dashboard");

    location.reload();

};

export function Settings(){

return`

<main class="content">

<h2>⚙ Settings</h2>

<div class="card">

<h3>Voice Speed</h3>

<select onchange="changeVoiceSpeed(this.value)">

<option value="0.8" ${getVoiceSpeed()==0.8?"selected":""}>0.8x</option>

<option value="1.0" ${getVoiceSpeed()==1?"selected":""}>1.0x</option>

<option value="1.2" ${getVoiceSpeed()==1.2?"selected":""}>1.2x</option>

</select>

</div>

<div class="card">

<h3>Question Count</h3>

<select onchange="changeQuestionCount(this.value)">

<option value="20" ${getQuestionCount()==20?"selected":""}>20</option>

<option value="40" ${getQuestionCount()==40?"selected":""}>40</option>

<option value="60" ${getQuestionCount()==60?"selected":""}>60</option>

</select>

</div>

<br>

<button onclick="backDashboard()">

← Dashboard

</button>

</main>

`;

}

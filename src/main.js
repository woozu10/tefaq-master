import { App } from "./App.js";
import { getCurrentPage } from "./services/router.js";

document.getElementById("app").innerHTML = App(getCurrentPage());

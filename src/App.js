import { Dashboard } from "./pages/Dashboard.js";
import { CO } from "./pages/CO.js";

export function App(page = "dashboard") {

  switch(page){

    case "co":
      return CO();

    default:
      return Dashboard();

  }

}

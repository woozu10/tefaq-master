import { Dashboard } from "./pages/Dashboard.js";
import { CO } from "./pages/CO.js";
import { getCurrentPage } from "./services/router.js";

export function App() {

  switch (getCurrentPage()) {

    case "co":
      return CO();

    default:
      return Dashboard();

  }

}

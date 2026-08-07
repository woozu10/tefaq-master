import { Dashboard } from "./pages/Dashboard.js";
import { COHome } from "./pages/COHome.js";
import { COPractice } from "./pages/COPractice.js";
import { CO } from "./pages/CO.js";
import { Result } from "./pages/Result.js";
import { getCurrentPage } from "./services/router.js";

export function App() {

  const page = getCurrentPage();

  switch (page) {

    case "co":
      return COHome();

    case "co-practice":
      return COPractice();

    case "co-quiz":
      return CO();

    case "result": {

      const score = Number(localStorage.getItem("score"));
      const total = Number(localStorage.getItem("total"));

      return Result(score, total);
    }

    default:
      return Dashboard();

  }

}

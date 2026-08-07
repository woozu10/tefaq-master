import { Statistics } from "./pages/Statistics.js";
import { Dashboard } from "./pages/Dashboard.js";
import { COHome } from "./pages/COHome.js";
import { COPractice } from "./pages/COPractice.js";
import { COExam } from "./pages/COExam.js";
import { CO } from "./pages/CO.js";
import { Favorites } from "./pages/Favorites.js";
import { WrongNotes } from "./pages/WrongNotes.js";
import { Statistics } from "./pages/Statistics.js";
import { Result } from "./pages/Result.js";
import { getCurrentPage } from "./services/router.js";

export function App() {

  const page = getCurrentPage();

  switch (page) {

      case "statistics":
  return Statistics();

    case "co":
      return COHome();

    case "co-practice":
      return COPractice();

    case "co-exam":
      return COExam();

    case "co-quiz":
      return CO();

    case "favorites":
      return Favorites();

    case "wrong-notes":
      return WrongNotes();

    case "statistics":
      return Statistics();

    case "result": {

      const score = Number(localStorage.getItem("score"));
      const total = Number(localStorage.getItem("total"));

      return Result(score, total);

    }

    default:
      return Dashboard();

  }

}

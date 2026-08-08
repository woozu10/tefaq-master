import { EEResult } from "./pages/EEResult.js";
import { EE } from "./pages/EE.js";
import { Review } from "./pages/Review.js";
import { Dashboard } from "./pages/Dashboard.js";

import { COHome } from "./pages/COHome.js";
import { COPractice } from "./pages/COPractice.js";
import { COExam } from "./pages/COExam.js";
import { CO } from "./pages/CO.js";

import { CEHome } from "./pages/CEHome.js";
import { CEPractice } from "./pages/CEPractice.js";
import { CEExam } from "./pages/CEExam.js";
import { CE } from "./pages/CE.js";

import { Favorites } from "./pages/Favorites.js";
import { WrongNotes } from "./pages/WrongNotes.js";
import { Statistics } from "./pages/Statistics.js";
import { Result } from "./pages/Result.js";
import { Settings } from "./pages/Settings.js";
import { Admin } from "./pages/Admin.js";

import { getCurrentPage } from "./services/router.js";

export function App() {

  const page = getCurrentPage();

  switch (page) {

    case "review":
      return Review();

    // ======================
    // CO
    // ======================

    case "co":
      return COHome();

    case "co-practice":
      return COPractice();

    case "co-exam":
      return COExam();

    case "co-quiz":
      return CO();

    // ======================
    // CE
    // ======================

    case "ce":
      return CEHome();

    case "ce-practice":
      return CEPractice();

    case "ce-exam":
      return CEExam();

    case "ce-quiz":
      return CE();

    // ======================
    // Common
    // ======================

    case "favorites":
      return Favorites();

    case "wrong-notes":
      return WrongNotes();

    case "statistics":
      return Statistics();

    case "settings":
      return Settings();

    case "admin":
      return Admin();

    case "result": {

      const score =
        Number(localStorage.getItem("score"));

      const total =
        Number(localStorage.getItem("total"));

      return Result(score, total);

    }
      case "ee-quiz":
    return EE();
      case "ee-result":
    return EEResult();

    default:
      return Dashboard();

  }

}

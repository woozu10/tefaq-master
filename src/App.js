import { Review } from "./pages/Review.js";
import { Dashboard } from "./pages/Dashboard.js";

import { COHome } from "./pages/COHome.js";
import { COPractice } from "./pages/COPractice.js";
import { COExam } from "./pages/COExam.js";
import { CO } from "./pages/CO.js";

import { Favorites } from "./pages/Favorites.js";
import { WrongNotes } from "./pages/WrongNotes.js";
import { Statistics } from "./pages/Statistics.js";
import { Result } from "./pages/Result.js";
import { Settings } from "./pages/Settings.js";
import { Admin } from "./pages/Admin.js";

/* 새 페이지 */
import { Speaking } from "./pages/Speaking.js";
import { Writing } from "./pages/Writing.js";
import { ObjectiveHome } from "./pages/ObjectiveHome.js";
import { ObjectiveQuiz } from "./pages/ObjectiveQuiz.js";
import { Search } from "./pages/Search.js";
import { Library } from "./pages/Library.js";

import {
  getCurrentPage
} from "./services/router.js";

export function App() {

  const page = getCurrentPage();

  switch (page) {

    case "review":
      return Review();

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

    case "speaking":
      return Speaking();

    case "writing":
      return Writing();

    case "objective":
      return ObjectiveHome();

    case "objective-quiz":
      return ObjectiveQuiz();

    case "search":
      return Search();

    case "library":
      return Library();

    case "settings":
      return Settings();

    case "admin":
      return Admin();

    case "result": {

      const score = Number(
        localStorage.getItem("score")
      );

      const total = Number(
        localStorage.getItem("total")
      );

      return Result(score, total);
    }

    default:
      return Dashboard();
  }

}

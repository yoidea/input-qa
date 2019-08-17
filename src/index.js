import $ from "jquery";
import correctPath from "./se/correct.mp3";
import incorrectPath from "./se/incorrect.mp3";
import finishPath from "./se/finish.mp3";

const se = {
  correct: new Audio(correctPath),
  incorrect: new Audio(incorrectPath),
  finish: new Audio(finishPath)
};

function playse(se) {
  se.volume = 1;
  se.currentTime = 0;
  se.play();
}

$(() => {
  const state = [];
  $("input[data-ans]").each((i, e) => {
    state.push(false);
    const ans = $(e)
      .data("ans")
      .toString();
    $(e).bind("keyup", () => {
      if ($(e).val().length < ans.length) return;
      if ($(e).val() === ans) {
        $(e).addClass("is-valid");
        $(e).prop("disabled", true);
        playse(se.correct);
        state[i] = true;
        if (state.reduce((a, c) => a && c)) {
          playse(se.finish);
        } else {
          $("input[data-ans]:enabled")
            .first()
            .focus();
        }
      } else {
        $(e).addClass("is-invalid");
        playse(se.incorrect);
        setTimeout(() => {
          $(e).removeClass("is-invalid");
          $(e).val("");
        }, 1000);
      }
    });
  });
});

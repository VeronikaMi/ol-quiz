export const API =
  "http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db";

export const sortByNonnumericalValues = (a, b) => {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
};

export const formateDate = (date) => {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}  ${String(date.getUTCDate()).padStart(2, "0")} / ${String(
    date.getMonth() + 1
  ).padStart(2, "0")} / ${date.getFullYear()}`;
};

export const saveToLocalStorageAndDeleteAfter10Min = (data) => {
  localStorage.setItem("questions", JSON.stringify(data));
  setTimeout(() => {
    localStorage.removeItem("questions");
  }, 600000);
};

export const manageSelectedAnswerAndDisabledButtons = (btns, answerStatus) => {
  btns.current.childNodes.forEach((btn) => {
    if (btn.classList.contains("selected")) {
      btn.classList.add(`${answerStatus}`);
    }
    if (answerStatus) {
      btn.disabled = true;
    }
  });
};

export const manageSingleSelect = (e, btns) => {
  if (!e.target.classList.contains("selected")) {
    e.target.classList.add("selected");
  }

  btns.current.childNodes.forEach((btn) => {
    if (btn.id !== e.target.id && btn.classList.contains("selected"))
      btn.classList.remove("selected");
  });
};

export const saveToLocalStorage = (score) => {
  let history = [];
  let date = new Date();
  let currentRecord = {
    score: score,
    time: formateDate(date),
    timeForCompare: date.getTime(),
  };

  if (localStorage.getItem("history")) {
    history = [...JSON.parse(localStorage.getItem("history"))];
  }
  history.push({ ...currentRecord, id: history.length + 1 });
  localStorage.setItem("history", JSON.stringify(history));
};

export const sortHistory = (records) => {
  records.sort((a, b) => {
    if (b.score === a.score) {
      return sortByNonnumericalValues(a.timeForCompare, b.timeForCompare);
    } else {
      return b.score - a.score;
    }
  });
};

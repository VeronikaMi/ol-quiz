export const API =
  "http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db";

export const mySort = (a, b) => {
  console.log("sort");
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

export const manageLocalStorage = (data) => {
  localStorage.setItem("questions", JSON.stringify(data));
  setTimeout(() => {
    localStorage.removeItem("questions");
    console.log("deleted");
  }, 600000);
};

export const manageSelectedAnswerAndDisabledBtns = (btns, answerStatus) => {
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

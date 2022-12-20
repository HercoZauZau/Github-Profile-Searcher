export const elements = {
  profile: document.querySelector(".profile"),
  input: document.querySelector("input"),
  repoList: document.querySelector(".repo-list"),
  repo: document.querySelector(".repo"),
  errorMsg: document.querySelector(".errorMsg"),
  repoSpan: document.querySelectorAll(".repo span"),
  repoItem: "",
  newUser: "",
};

export const clearUI = () => {
  elements.profile.innerHTML = "";
};

/**
 * Ao clicar num "elements.repoSpan", deixa o elemento com uma cor de destaque e uma cor mais apagada para os outros semelhantes
*/
export const repoSpanColor = (nr) => {
  elements.repoSpan.forEach((e, i) => {
    e.style.color = i == nr ? "var(--cor-tercearia)" : "var(--cor-logo-dark)";
  });
};

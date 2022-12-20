import User from "./models/User.js";
import Repo from "./models/Repo.js";
import Followers from "./models/Followers.js";
import Following from "./models/Following.js";

import * as userView from "./views/userView.js";
import * as repoView from "./views/repoView.js";

import { clearUI, elements } from "./views/base.js";

import "../css/styles.css";

const state = {};

/**
 * Cria um novo repositório(objecto) no Model(classe Repo) e renderiza no View(RepoView)
 *
 */
const controlRepositories = async (url) => {
  try {
    state.repositories = new Repo(url);

    await state.repositories.getRepositories();

    repoView.renderRepositories(state.repositories.repos);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Cria um novo objecto(followers) no Model(classe Followers) e renderiza no View(RepoView)
 *
 */
const controlFollowers = async (url) => {
  try {
    state.followers = new Followers(url);

    await state.followers.getFollowers();

    repoView.renderFollowers(state.followers.follow);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Cria um novo objecto(following) no Model(classe Following) e renderiza no View(RepoView)
 *
 */
const controlFollowing = async (url) => {
  try {
    state.following = new Following(url);

    await state.following.getFollowing();

    repoView.renderFollowing(state.following.follow);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Recebe o valor do input e cria um objecto User (usuário), caso o usuário não seja criado com sucesso, implementa a função "renderUserUndefined"
 * O usuário não será criado com sucesso caso não exista um usuário correspondente no github, o limite de requisições da API tenha esgotado ou ocorra um erro de conexão
 */
const controlSearch = async (event) => {
  event.preventDefault();

  try {
    const searched = elements.input.value;

    state.user = new User(searched);

    await state.user.getUser();

    /**
     * Remove os elementos gerados no HTML pelas funções de renderização
    */
    clearUI();

    if (!state.user.defined) {
      userView.renderUserUndefined();
    } else {
      userView.renderUser(state.user);
      await controlRepositories(state.user.repos_url);
    }

    elements.input.value = "";
  } catch (error) {
    console.log(error);
  }
};


/**
 * Recebe o valor do "elements.newUser" da classe "base.js" e cria um usuário
 * Logicamente esse usuário existe no github então o erro que pode ocorrer é de conexão ou limite de requisição da API
 */
export const controlDirect = async () => {
  try {
    const searched = elements.newUser;

    state.user = new User(searched);

    await state.user.getUser();

    clearUI();

    if (!state.user.defined) {
      userView.renderUserUndefined();
    } else {
      userView.renderUser(state.user);
      await controlRepositories(state.user.repos_url);
    }

    elements.input.value = "";
  } catch (error) {
    console.log(error);
  }
};

/**
 * Cada um dos "elements.repoSpan" gera sua própria renderização ao ser clicado
 * 
 * 0 - Renderiza os repositórios
 * 1 - Renderiza os followers (seguidores)
 * 2 - Renderiza os following (seguidos)
 * 
 * Todas essas funções são chamadas da View (repoView)
*/

elements.repoSpan[0].addEventListener("click", async () => {
  try {
    repoView.renderRepositories(state.repositories.repos);
  } catch (error) {
    console.log(error);
  }
});

elements.repoSpan[1].addEventListener("click", async () => {
  try {
    await controlFollowers(state.user.followers_url);
  } catch (error) {
    console.log(error);
  }
});

elements.repoSpan[2].addEventListener("click", async () => {
  try {
    await controlFollowing(state.user.following_url);
  } catch (error) {
    console.log(error);
  }
});


/**
 * Esta função será chamada e só terá efeito após a renderização na repoView
 * 
 * Cada renderização feita (repositórios, seguidores e seguindo) gera elementos HTML (repoItem) que executam (cada um) a função "controlDirect" ao disparar o evento "click"
*/
export const activateRepoItem = () => {
  elements.repoItem = document.querySelectorAll(".repoItem");

  elements.repoItem.forEach((e) => {
    e.addEventListener("click", () => {
      try {
        elements.newUser = e.textContent.trim();
        controlDirect();
      } catch (error) {
        console.log(error);
      }
    });
  });
};

window.addEventListener("submit", controlSearch);
window.addEventListener("load", controlSearch);

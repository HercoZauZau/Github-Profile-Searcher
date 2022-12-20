import { elements, repoSpanColor } from "./base.js";
import { activateRepoItem } from "../index.js";

export const renderRepositories = (repositories) => {
  let markup = "";

  repositories.forEach(({ html_url, name, forks, stargazers_count }) => {
    markup += `
    <a href="${html_url}" class="repo-url" target="_blank">
      <div class="repoItem">
        <p class="repoName"> ${name} </p>
        <article>
          <p>${stargazers_count}  stars</p>
          <p>${forks} forks</p>
        </article>
      </div>
    </a>
    `;
  });

  elements.repoList.innerHTML = markup;
  repoSpanColor(0);
};

export const renderFollowers = (followers) => {
  let markup = "";

  followers.forEach(({ login, avatar_url }) => {
    markup += `
      <div class="repoItem">
        <img class="followerAvatar" src="${avatar_url}" alt="Avatar">
        <p class="repoName">${login}</p>
      </div>
    `;
  });

  elements.repoList.innerHTML = markup;
  repoSpanColor(1);
  activateRepoItem();
};

export const renderFollowing = (following) => {
  let markup = "";

  following.forEach(({ login, avatar_url }) => {
    markup += `
      <div class="repoItem">
        <img class="followerAvatar" src="${avatar_url}" alt="Avatar">
        <p class="repoName">${login}</p>
      </div>
    `;
  });

  elements.repoList.innerHTML = markup;
  repoSpanColor(2);
  activateRepoItem();
};

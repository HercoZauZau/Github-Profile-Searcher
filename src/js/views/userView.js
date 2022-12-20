import { elements } from "./base.js";

export const renderUser = ({
  name,
  user_name,
  bio,
  email,
  location,
  avatar_url,
  html_url,
  public_repos,
  followers,
  following,
}) => {
  const markup = `
  <div class="profileMain">
  <div class="profile-header">
    <img src="${avatar_url}" alt="Avatar" />
    <div class="profileData">
      <a href="${html_url}" target="_blank"><h1>${user_name}</h1></a>
      <p>Nome: ${name}</p>
      <p>Biografia: ${bio}</p>
      <p>Endereço: ${location}</p>
      <p>Email: ${email}</p>
    </div>
  </div>

  <div class="vercel">
    <img
      src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user_name}&layout=demo&langs_count=6&theme=github_dark"
    />
  </div>
  </div>

  <footer class="iconsHeader">
  <article>
    <img src="https://cdn-icons-png.flaticon.com/512/51/51319.png" alt="" />
    <p>${public_repos}</p>
    <p>Repositórios</p>
  </article>
  <article>
    <img src="https://cdn-icons-png.flaticon.com/512/2077/2077502.png" alt="" />
    <p>${followers}</p>
    <p>Seguidores</p>
  </article>
  <article>
    <img src="https://cdn-icons-png.flaticon.com/512/7542/7542137.png" alt="" />
    <p>${following}</p>
    <p>Seguindo</p>
  </article>
  </footer>
  `;

  elements.repo.style.display = "initial";
  elements.profile.insertAdjacentHTML("afterbegin", markup);
  elements.errorMsg.innerHTML = "";
};

export const renderUserUndefined = () => {
  const markup = `
<div class="notFound">
  <p>Usuário não encontrado!</p>
  <img src="https://octodex.github.com/images/jetpacktocat.png" alt="img" />
</div>
`;
  elements.repo.style.display = "none";
  elements.errorMsg.innerHTML = markup;
};

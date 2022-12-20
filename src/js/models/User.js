export default class User {
  constructor(user) {
    this.user = user;
  }

  /**
   * Documentação oficial da API: https://docs.github.com/pt/rest?api
  */

  async getUser() {
    try {
      const apiUrl = `https://api.github.com/users/${this.user}`;
      const apiUrlRepos = `https://api.github.com/users/${this.user}/repos`;
      const apiUrlFollowers = `https://api.github.com/users/${this.user}/followers`;
      const apiUrlFollowing = `https://api.github.com/users/${this.user}/following`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.status >= 400 && response.status < 500) {
        this.defined = false;
      } else {
        this.defined = true;

        for (let key in result) {
          result[key] = result[key] == null ? " - " : result[key];
        }

        this.name = result.name;
        this.user_name = result.login;
        this.location = result.location;
        this.email = result.email;
        this.bio = result.bio;
        this.avatar_url = result.avatar_url;
        this.followers = result.followers;
        this.following = result.following;
        this.public_repos = result.public_repos;
        this.html_url = result.html_url;
        this.repos_url = apiUrlRepos;
        this.followers_url = apiUrlFollowers;
        this.following_url = apiUrlFollowing;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default class Followers {
  constructor(url) {
    this.url = url;
  }

  async getFollowers() {
    try {
      const response = await fetch(this.url);
      this.follow = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default class Following {
  constructor(url) {
    this.url = url;
  }

  async getFollowing() {
    try {
      const response = await fetch(this.url);
      this.follow = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

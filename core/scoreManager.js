export class ScoreManager {
  constructor() {
    this.scores = [];
  }
  add(entry) {
    this.scores.push(entry);
  }
  top(n=10) {
    return this.scores.slice(0,n);
  }
}

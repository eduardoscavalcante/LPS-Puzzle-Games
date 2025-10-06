export class ScoreManager {
  constructor() {
    this.scores = [];
  }

  save(name, score) {
    this.scores.push({ name, score });
    console.log("Pontuação salva:", this.scores);
  }

  getAll() {
    return this.scores;
  }
}

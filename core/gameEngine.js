export class GameEngine {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
  addScore(points) {
    this.score += points;
    console.log(`${this.name} - Pontos: ${this.score}`);
  }
  reset() {
    this.score = 0;
    console.log(`${this.name} reiniciado.`);
  }
}

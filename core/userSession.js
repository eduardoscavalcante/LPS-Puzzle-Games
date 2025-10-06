export class UserSession {
  constructor() {
    this.name = 'Anon';
  }
  setName(n) { this.name = n; }
  getName() { return this.name; }
}

export class TestClass {
  private state = $state(0);

  constructor() {}

  public increase(amount = 1) {
    this.state++;
  }
}

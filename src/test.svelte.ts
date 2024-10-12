export class TestClass {
  public state = $state(1);

  constructor() {}

  public increase(amount = 1) {
    this.state++;
  }
}

export const testState = $state(42);

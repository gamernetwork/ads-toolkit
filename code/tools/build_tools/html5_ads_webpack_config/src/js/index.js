import '../scss/main.scss'

class TestClass {
  constructor () {
    this.value = 'Test Class Works!';
  }
  testFunc () {
    this.testDiv = document.createElement('div');
    this.testDiv.innerHTML = this.value;
    document.body.appendChild(this.testDiv);
  }
}

const test = new TestClass();

test.testFunc();

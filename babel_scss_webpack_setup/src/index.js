import './scss/main.scss';

class TestClass {
  constructor() {
    this.name = 'Testing Injection';
  }

  printName() {
    const el = document.createElement('h1');
    el.innerHTML = this.name;
    el.style.opacity = 1;
    document.body.appendChild(el);
  }
}

const testFunc = () => {
  const tClass = new TestClass();
  tClass.printName();
};

testFunc();

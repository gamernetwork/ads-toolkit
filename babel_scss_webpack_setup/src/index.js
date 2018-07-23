class TestClass {
  constructor() {
    this.name = 'Testing...';
  }

  printName() {
    const el = document.createElement('h1');
    el.innerHTML = this.name;
    el.style.opacity = 0.9;
    document.body.appendChild(el);
  }
}

const testFunc = () => {
  const tClass = new TestClass();
  tClass.printName();
};

testFunc();

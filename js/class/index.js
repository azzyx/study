/**
 * this关键字总是指向函数所在的当前对象，es6又新增了另一个类似的关键字super，指向当前对象的原型对象
 */
// 1、简介开始
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    // this.color = color;   // 1.这个会报错，因为只有调用了super之后，才能使用this关键字
    super(x, y, color);
    this.color = color;
    console.log('this.color', this);
  }
  toString() {
    return `${this.color}'  '${super.toString()}`
  }
}
// 1. let cp = new ColorPoint(25, 8, 'green');

let cp = new ColorPoint(25, 8, 'green');
console.log(cp instanceof ColorPoint, cp instanceof Point);

// 父类的静态方法， 也会被子类继承
class A {
  static hello() {
    console.log('hello, world');
  }
}

class B extends A {
  constructor(props) {
    console.log('props', props);
    super(props);
  }
}
B.hello();
// 1、简介结束

// 2、Object.getPrototypeOf() 开始
/**
 * Object.getPrototype方法可以用来获取父类
 */
console.log(Object.getPrototypeOf(ColorPoint) === Point);
// 2、Object.getPrototypeOf() 结束

// 3、super关键字
/**
 * super这个关键字，既可以当做函数使用，也可以当做对象使用。在这两种情况下，它的用法完全不同。
 * 3.1、第一种情况，super作为函数调用时，代表父类的构造函数。ES6要求，子类的构造函数必须执行一次super函数。
 *      作为函数的时候只能用在子类的构造函数之中，用在其他地方会报错
 */
class A3 {
  constructor() {
    console.log(new.target.name);
  }
}
class B3 extends A3 {
  constructor(props) {
    super(props)
  }
  m() {
    // super();
    /**报错 作为函数的时候只能在子类的构造函数中
     * super() is only valid inside a class constructor of a subclass. 
     * Maybe a typo in the method name ('constructor') or not extending another class
     */
  }
}
console.log('3.1--A', new A3);
console.log('3.1--B', new B3);
/**
 * super虽然代表了父类A的构造函数，但是返回的是子类B的实例，
 * 即super内部的this指的是B的实例，
 * super在这里相当于A.prototype.constructor.call(this)
 */

// 3.2 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
class A3_2 {
  p() {
    return 2;
  }
}
class B3_2 extends A3_2 {
  constructor() {
    super();
    console.log(super.p);
    /**
     * 此时的super在普通的方法中，是被当做对象使用，指向A.prototype
     * 所以super.p()相当于A.prototype.p()。
     * 需要注意的是：由于super指向父类的原型对象，所以在父类实例的方法或者属性，是无法通过super调用的
     */
  }
}
let b3_2 = new B3_2();
/**
 * ES6规定，在子类的普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例
 */
class A3_3 {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}
class B3_3 extends A3_3 {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print(this.x); // 2
    /**super.print()虽然调用的是A.prototype.print()，但是A.prototype,print()内部的this指向子类B的实例
     * 实际执行的是super.print.call(this)，所以得出来的结果是2
     */
  }
}
let b3_3 = new B3_3();

// const obj1 = {
//   foo: super.foo
// } // 报错

// const obj2 = {
//   foo: () => super.foo
// } // 报错

// const obj3 = {
//   foo: function () {
//     return super.foo
//   }
// } // 报错
/**
 * 以上的三种super的用法都会报错，因为对于js的引擎来说，
 * 这里的super都没有用在对象的方法之中。第一种写法是super用在属性里面，
 * 第二种和第三种写法用在一个函数里面，然后赋值给foo属性。
 * 目前只有对象方法的简写可以让JavaScript引擎确认，定义的是对象的方法。
 */

// 对象的结构赋值
let obj = { a: { b: 1 } };
let { ...x } = obj;
console.log(1, obj, x);
x.a.b = 2;
console.log(2, obj, x);
/**
 * 结构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、
 * 那么结构赋值拷贝的是这个值的引用，而不是这个值的副本。
 */


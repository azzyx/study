// 1.概念
/**
 * JavaScript原有的表示"集合"的数据结构，主要是数组（Array）和对象（Object），
 * ES6又新增了Map和Set，用户可以组合使用它们，定义自己的数据结构，比如数组的成员Map，
 * May的成员对象，这样需要一种统一的接口机制，来处理所有不同的数据结构。
 * 
 * 便利器（Iterator） 就是这样一种机制。它是一种接口，为各种不用的数据结构提供统一的访问机制。
 * 任何数据结构只要部署Iterator，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
 * 
 * Iterator的作用有3个：
 * 第一个：为各种数据结构，提供一个统一的、简便的访问接口；
 * 第二个：使得数据结构的成员能够按某种次序排列；
 * 第三个：ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。
 * 
 * Iterator的遍历过程
 * （1）创建一个指针对象，指向当前数据结构的起始位置，也就是说，遍历器对象本质上，就是一个指针对象。
 * （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
 * （3）第二次调用指针对象的next方法，可以将指针指向数据结构的第二个成员。
 * （4）不断调用指针对象的next方法
 * 
 * 每次调用next方法，都会返回数据结构的当前成员信息，
 * 就是返回一个包含value和done两个属性的对象，其中，value属性是当前成员的值，done属性是一个布尔值，表示便利是否结束。
 */
var it = makeIterator(['a', 'b']);

console.log(it.next());
console.log(it.next());
console.log(it.next());
it.next();
it.next();
it.next();

function makeIterator(array) {
  var arrIndex = 0;
  return {
    next: function () {
      return arrIndex < array.length ? { value: array[arrIndex++], done: false } : { value: undefined, done: true }
    }
  }
}

/**
 * ts的写法
 */
// interface Iterator {
//   [Symbol.iterator](): Iterator
// }
// interface Iterator {
//   next(value?: any): IterationResult
// }
// interface IterationResult {
//   value: any,
//   done: boolean
// }

// 2.默认Iterator接口
/**
 * Iterator接口的目的，就是为所有的数据结构，提供了一种统一的访问机制，即for...of
 * 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。
 * 
 * 一种数据结构只要部署了Iterator接口，我们就称这种结构时【可以遍历的】（iterator）。
 * 
 * 默认的Iterator接口部署在数据结构的Symbol.iterator属性，Symbol.iterator属性本身是一个函数，
 * 就是当前数据结构默认的遍历器生成函数，执行这个函数，返回一个遍历器。至于属性名Symbol.iterator，
 * 它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的，类型为Symbol的特殊值，所以要
 * 放在方括号内（参见《Symbol》）
 */
const obj = {
  [Symbol.iterator]: function () {
    return {
      next: function () {
        return {
          value: 1,
          done: false
        }
      }
    }
  }
}
console.log('obj', obj);
/**
 * ES6的有些数据结构原生具备Iterator接口（比如数组），即不用任何处理，
 * 就可以被for...of循环遍历。原因在于，这些数据结构原生部署了Symbol.iterator属性。
 * 另外一些数据结构没有，凡是部署了Symbol.iterator属性额数据结构，就称为部署了遍历器接口。
 * 调用这个接口就会返回一个遍历器对象。
 * 
 * 原生具备Iterator接口的数据结构如下
 * 第一个：Set
 * 第二个：Map
 * 第三个：Array
 * 第四个：String
 * 第五个：NodeList对象
 * 第六个：函数的arguments对象
 * 第七个：TypedArray
 */
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
console.log('arr[Symbol.iterator]', arr, arr[Symbol.iterator]);

/**
 * 对于原生部署Iterator接口的数据结构，不用自己写遍历器生成函数，
 * for...of循环会自动遍历他们，除此之外，其他数据结构（主要对象）的Iterator接口，
 * 都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。
 * 
 * 对象（Object）之所以没有默认部署Iterator接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，
 * 需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口就等于部署一种线性转换，
 * 不过严格说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作Map结构使用，ES5没有Map结构，而ES6原生提供了。
 * 一个对象如果要具备可被for...of循环调用的Iterator接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
 */
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return { done: false, value: value }
    }
    return { done: true, value: undefined }
  }
}
function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value);
}
/**
 * 上面代码是一个类部署Iterator接口的写法。Symbol.iterator属性对应一个函数，
 * 执行后返回当前对象的遍历器对象。
 */

// 3.调用Iterator接口的场合
/**
 * 有些场合会默认调用Iterator接口（即Symbol.iterator方法）。
 * （1）结构赋值
 * 对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法。
 */
let set = new Set().add('a').add('b').add('c');
let [x, y] = set;
let [first, ...rest] = set;
console.log('first, ...rest', first, rest);

/**
 * （2）扩展运算符
 * 扩展运算符（...）也会调用默认的Iterator接口。
 */
var str = 'hello';
[...str];
console.log('str', [...str]);
let arr1 = ['b', 'c'];
['a', ...arr, 'd'];
/**
 * 上面代码的扩展运算符内部就调用Iterator接口。
 * 实际上，这提供了一种简便机制，可以将任何部署了Iterator接口的数据结构，转为数组。
 * 也就是说，只要某个数据结构部署了Iterator接口，就可以对它使用扩展运算符，将其转为数组。
 */

/**
 * （3）yield*
 * yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
 */
let generator = function* () {
  yield 1;
  yield* [2, 3, 4];
  yield 5;
};
var iterators = generator();
console.log('iterators.next();', iterators.next()); // {value: 1, done: false}

/**
 * （4）其他场合
 * 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合
 * 其实都调用了遍历器接口。
 * for...of
 * Array.from()
 * Map(),Set(),WeakMap(),WeakSet() (比如： new Map([['a', 1], ['b', 2]]))
 * Promise.all()
 * Promise.race()
 */

// 4.字符串的Iterator接口
/**
 * 字符串是一个类似数组的对象，也原生具有Iterator接口。
 */
var someString = 'hi';
console.log(typeof someString[Symbol.iterator]); // function
var iteratorStr = someString[Symbol.iterator]();
let arrVal = [1, 2, 3, 4].map((val, index) => {
  if (index > 1) {
    return;
  }
  return val;
})
console.log('arrVal', arrVal);
for (let val of [1, 2, 3, 4]) {
  if (val > 2) {
    break;
  }
  console.log('val', val);
}

// 5. Iterator接口与Generator函数
/**
 * Symbol.Iterator最简单的实现
 */

let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
};
console.log('[...myIterable]', [...myIterable]); // [...myIterable] [1, 2, 3]
let myObj = {
  *[Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};
console.log('myObj', [...myObj]); // myObj ["hello", "world"]
/**
 * Symbol.Iterator() 方法几乎不用部署任何代码，只要用yield命令给出每一步的返回值即可。
 */

// 6. 遍历器对象的return()，throw()
/**
 * 遍历器除了具有next()方法，还可以具有return()方法和throw()方法。
 * 如果自己写遍历器生成函数，next()方法是必须部署的，而return()和throw()方法是否部署是可选择的。
 * 
 * return()方法的使用场合是，如果for...of循环提前退出（通常是出错，或者有break语句），就会调用return()方法。
 * 如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return()方法。
 */
function readLineSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { value: file, done: false }
        },
        return() {
          file.close();
          return { value: undefined, done: true }
        }
      }
    }
  }
}
/**
 * 下面两种情况都会触发return方法
 */
for (let line of readLineSync(fileName)) {
  console.log('line', line);
  break;
}
for (let line of readLineSync(fileName)) {
  console.log('line', line);
  throw new Error();
}
/**
 * 注意： return() 方法必须返回一个对象，这是Generator语法规定的。
 * throw()方法主要是配合Generator函数使用，一般的遍历器对象用不到这个方法。
 */

// 7. for...of
/**
 * 一个数据结构只要部署了Symbol.iterator属性，就是被视为具有iterator接口，就可以使用for...of循环遍历它的成员。
 * for...of循环内部调用的是数据结构Symbol.iterator方法。
 * 
 * 数组
 * Set和Map结构
 * 
 * 计算生成的数据结构
 * 有些数据结构是在现有数据结构的基础上，计算生成的。
 * 比如ES6的数组、Set、Map都部署了以下三个方法，调用后都返回遍历器对象。
 * -entries()返回一个遍历器对象，用来遍历[键名，键值]组成的数组。对于数组，键名就是索引值；
 *  对于Set，键名与键值相同。Map结构的Iterator接口，默认就是调用entries()方法。
 * -keys()返回一个遍历器对象，用来遍历所有的键名。
 * -values()返回一个遍历器对象，用来遍历所有的键值。
 */
let arrIterator = ['a', 'b', 'c'];
for(let pair of arrIterator.entries()) {
  console.log('pair', pair);
}
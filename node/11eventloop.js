setTimeout(function () {
  console.log('b');
  new Promise(function (resolve) {
    console.log('d');
    resolve();
  }).then(function () {
    console.log('e');
  });
  process.nextTick(function () {
    console.log('c');
  });
});
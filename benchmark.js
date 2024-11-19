const { Suite } = require('benchmark');
const testFunction = require('./index');

const longString = 'test'.repeat(1000000);

const userName = process.env.USER_NAME || 'anonymous';

const suite = new Suite();
suite
  .add(`${userName}の処理`, () => {
    testFunction(longString);
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    const result = this[0];
    const executionTime = (1 / result.hz) * 1000;
    console.log(`${userName}の実行速度: ${executionTime.toFixed(2)}ミリ秒`);
  })
  .run({ async: true });

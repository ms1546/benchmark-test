const fs = require('fs');
const Benchmark = require('benchmark');
const fn = require('./index');

const longString = 'test'.repeat(1000000);

const branchName = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || 'unknown-branch';

const suite = new Benchmark.Suite();
suite
  .add('Benchmark Test', () => {
    fn(longString);
  })
  .on('complete', function () {
    const executionTime = (1 / this[0].hz) * 1000;
    const timestamp = new Date().toISOString();

    const result = {
      branch: branchName,
      time: executionTime,
      timestamp: timestamp,
    };

    fs.writeFileSync('result.json', JSON.stringify(result, null, 2));

    console.log(
      `ブランチ: ${branchName} の実行速度: ${executionTime.toFixed(2)} ms, タイムスタンプ: ${timestamp}`
    );
  })
  .run({ async: true });

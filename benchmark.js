const fs = require('fs');
const Benchmark = require('benchmark');
const fn = require('./index');

const longString = 'test'.repeat(1000000);

const suite = new Benchmark.Suite();
suite
  .add('Benchmark Test', () => {
    fn(longString);
  })
  .on('complete', function () {
    const executionTime = (1 / this[0].hz) * 1000 | 0;
    const timestamp = new Date().toISOString();
    const branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || 'unknown-branch';
    const commitHash = process.env.GITHUB_SHA;

    const result = {
      branch,
      executionTime,
      timestamp,
      commitHash,
    };

    fs.writeFileSync('result.json', JSON.stringify(result, null, 2));

    console.log(`Result saved to result.json:`, result);
  })
  .run({ async: true });

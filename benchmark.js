const fs = require('fs');
const Benchmark = require('benchmark');
const fn = require('./index');

const longString = 'test'.repeat(1000000);

const userName = process.env.USER_NAME || 'anonymous';
const branchName = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || 'unknown-branch';

const suite = new Benchmark.Suite();
suite
  .add(userName, () => {
    fn(longString);
  })
  .on('complete', function () {
    const executionTime = (1 / this[0].hz) * 1000;

    let results = {};
    try {
      if (fs.existsSync('results.json')) {
        results = JSON.parse(fs.readFileSync('results.json', 'utf8'));
      }
    } catch (error) {
      console.log('No existing results, creating new one.');
    }

    if (!results[branchName]) {
      results[branchName] = [];
    }
    results[branchName].push({ user: userName, time: executionTime });

    fs.writeFileSync('results.json', JSON.stringify(results, null, 2));

    console.log(`${userName}の実行速度: ${executionTime.toFixed(2)} ms (ブランチ: ${branchName})`);
  })
  .run({ async: true });

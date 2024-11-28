const fs = require('fs');

const branchName = process.env.GITHUB_HEAD_REF || 'unknown-branch';
const userName = process.env.USER_NAME || 'anonymous';
const executionTime = Math.random() * 100;

let results = {};
try {
  results = JSON.parse(fs.readFileSync('results.json', 'utf8'));
} catch (error) {
  console.error('No existing results.json found. Creating a new one.');
}

if (!results[branchName]) {
  results[branchName] = [];
}
results[branchName].push({ user: userName, time: executionTime });

fs.writeFileSync('results.json', JSON.stringify(results, null, 2));
console.log('Results merged and saved to results.json');

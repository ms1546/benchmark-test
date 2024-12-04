const fs = require('fs');
const resultsFile = 'results.json';
const outputFile = 'ranking.html';

const createRankingPage = () => {
  const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
  const rows = Object.entries(results)
    .map(([branch, users]) => {
      const sortedUsers = users.sort((a, b) => a.time - b.time);
      const userRows = sortedUsers
        .map((user) => `<li>${user.user}: ${user.time.toFixed(2)} ms</li>`)
        .join('');
      return `<h3>${branch}</h3><ul>${userRows}</ul>`;
    })
    .join('');

  const html = `
    <html>
      <head>
        <title>Benchmark Rankings</title>
      </head>
      <body>
        <h1>Benchmark Rankings</h1>
        ${rows}
      </body>
    </html>
  `;

  fs.writeFileSync(outputFile, html);
  console.log(`Ranking page created: ${outputFile}`);
};

createRankingPage();

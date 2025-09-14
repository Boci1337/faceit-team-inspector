const darkModeSwitch = document.getElementById('darkModeSwitch');

// Set dark mode as default by removing the light theme attribute
document.documentElement.removeAttribute('data-theme');

// Make sure toggle switch checked is aligned with dark mode default
darkModeSwitch.checked = true;

// Toggle event listener to switch between dark (default) and light
darkModeSwitch.addEventListener('change', () => {
  if (darkModeSwitch.checked) {
    document.documentElement.removeAttribute('data-theme'); // dark mode
  } else {
    document.documentElement.setAttribute('data-theme', 'light'); // light mode
  }
});


document.getElementById('teamForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const teamLink = document.getElementById('teamLink').value;

  fetch('https://boci.me:3000/api/team?teamLink=' + encodeURIComponent(teamLink))
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        alert('Error: ' + data.error);
        return;
      }
      displayResults(data);
    })
    .catch(error => {
      document.getElementById('results').innerHTML = `<p class="error">Error fetching data: ${error.message}</p>`;
      console.error('Error fetching team data:', error);
    });
});

function displayResults(players) {
  const resultsDiv = document.getElementById('results');

  const totalElo = players.reduce((acc, p) => acc + p.elo, 0);
  const averageElo = (totalElo / players.length).toFixed(2);
  const top5Players = players.slice(0, 5);
  const totalEloTop5 = top5Players.reduce((acc, p) => acc + p.elo, 0);
  const averageEloTop5 = (totalEloTop5 / top5Players.length).toFixed(2);

  resultsDiv.innerHTML =
    '<ul>' +
    players.map(player =>
      `<li><a href="${player.faceitUrl}" target="_blank">${player.nickname}</a>: ${player.elo}</li>`
    ).join('') +
    '</ul>' +
    `<p><strong>Average ELO:</strong> ${averageElo}</p>` +
    `<p><strong>Average ELO of Top 5 Players:</strong> ${averageEloTop5}</p>`;
}

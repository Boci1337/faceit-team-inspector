document.getElementById('teamForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const teamLink = document.getElementById('teamLink').value;
    const teamId = extractTeamId(teamLink);

    if (teamId) {
        fetchTeamData(teamId);
    } else {
        alert('Invalid team link');
    }
});

function extractTeamId(link) {
    const regex = /teams\/([^\/]*)/;
    const match = link.match(regex);
    return match ? match[1] : null;
}

function fetchTeamData(teamId) {
    const apiKey = '4fc1cd38-719e-4aba-96f7-6ec3b2c72b25';  // Replace with your FACEIT API key
    const teamUrl = `https://cors-anywhere.herokuapp.com/https://open.faceit.com/data/v4/teams/${teamId}`;

    fetch(teamUrl, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('API Response:', data);  // Log the entire response for inspection

        if (!data.members || !Array.isArray(data.members)) {
            throw new Error("Team members are undefined or not an array.");
        }

        const players = data.members.map(member => member.user_id);
        const playerPromises = players.map(playerId => fetchPlayerData(playerId, apiKey));

        Promise.all(playerPromises).then(playersInfo => {
            // Sort players by ELO in descending order
            playersInfo.sort((a, b) => b.elo - a.elo);
            displayResults(playersInfo);
        });
    })
    .catch(error => {
        console.error('Error fetching team data:', error);
        document.getElementById('results').innerHTML = `<p class="error">Error: ${error.message}</p>`;
    });
}

function fetchPlayerData(playerId, apiKey) {
    const playerUrl = `https://cors-anywhere.herokuapp.com/https://open.faceit.com/data/v4/players/${playerId}`;

    return fetch(playerUrl, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(playerData => {
        return {
            nickname: playerData.nickname || "Unknown",
            elo: playerData.games && playerData.games.cs2 ? playerData.games.cs2.faceit_elo : 0,  // Default to 0 if no ELO
            faceitUrl: `https://www.faceit.com/en/players/${encodeURIComponent(playerData.nickname || "Unknown")}`
        };
    })
    .catch(error => {
        console.error('Error fetching player data:', error);
        return { nickname: "Unknown", elo: 0, faceitUrl: "#" };  // Default to 0 if there's an error
    });
}

function displayResults(players) {
    const resultsDiv = document.getElementById('results');

    // Calculate total ELO
    const totalElo = players.reduce((acc, player) => acc + player.elo, 0);
    const averageElo = (totalElo / players.length).toFixed(2);

    // Calculate average ELO of the top 5 players
    const top5Players = players.slice(0, 5);
    const totalEloTop5 = top5Players.reduce((acc, player) => acc + player.elo, 0);
    const averageEloTop5 = (totalEloTop5 / top5Players.length).toFixed(2);

    // Display the results
    resultsDiv.innerHTML =
        '<ul>' +
        players.map(player =>
            `<li><a href="${player.faceitUrl}" target="_blank">${player.nickname}</a>: ${player.elo}</li>`
        ).join('') +
        '</ul>' +
        `<p><strong>Average ELO:</strong> ${averageElo}</p>` +
        `<p><strong>Average ELO of Top 5 Players:</strong> ${averageEloTop5}</p>`;
}

document.getElementById('darkModeSwitch').addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

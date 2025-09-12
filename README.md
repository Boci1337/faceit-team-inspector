# FACEIT Team ELO Checker

A simple web app to fetch and display FACEIT CS2 team players' ELO ratings, with dark mode and modern UI styling.

---

## About

This project provides a front-end interface to input a FACEIT team link and show the members' competitive ELO ratings with averages. It uses a backend Node.js API to fetch player data from the FACEIT public API securely.

The frontend features a sleek dark mode toggle, responsive design, and displays nation flags emoji next to player names for easy identification.

---

## Demo & Hosting

This app is currently hosted at [boci.me](https://boci.me).

---

## Features

- Fetches FACEIT team players' CS2 ELO ratings in real time.
- Displays average ELO and average of top 5 players.
- Modern, responsive UI with dark mode toggle.
- Player nationality flag emojis for quick reference. _(TODO)_
- Backend securely manages FACEIT API access tokens via environment variables.

---

## Tech Stack & Dependencies

### Backend dependencies (Node.js)

- [express](https://www.npmjs.com/package/express) – Fast and minimal web framework for building the API server.
- [node-fetch](https://www.npmjs.com/package/node-fetch) – To make HTTP requests to the FACEIT API.
- [cors](https://www.npmjs.com/package/cors) – To enable Cross-Origin Resource Sharing (allow frontend to consume backend).
- [dotenv](https://www.npmjs.com/package/dotenv) – To load environment variables from a `.env` or `titok.env` file securely.

### Frontend

- Vanilla HTML, CSS, and JavaScript (no external frameworks).

---

## Installation & Setup
<details>
  <summary><strong>Show Instructions</strong></summary>

### Prerequisites

- Node.js (v14 or higher recommended)
- NPM (comes with Node.js)
- FACEIT API key (request one from FACEIT developer portal)

### Steps

1. **Clone the repository:**

```
git clone https://github.com/yourusername/faceit-team-elo-checker.git
cd faceit-team-elo-checker/backend
API_KEY=your_faceit_api_key_here

```

2. **Create your environment file for secrets:**

Create a file named `.env` or `titok.env` inside the `backend` folder with the following content:
`API_KEY=your_faceit_api_key_here`

3. **Install backend dependencies:**
```
npm install express node-fetch cors dotenv
```

4. **Start the backend server:**

```node server.mjs``` (not on github currently, working on it)

The server will start on port 3000 by default.

5. **Server frontend:**

The frontend is a static site (HTML/CSS/JS). You can host it using any static server:

- Serve locally with `Live Server` extension (VS Code)
- Use `http-server` npm package
- Deploy on your webserver nginx/apache or similar.

6. **Open frontend in your browser:**

Use your hosted URL or open the static `index.html` file and enter a FACEIT team link to fetch player ELO data.

---
</details>

## Contribution

Contributions and improvements are welcome! Feel free to fork, submit pull requests, or open issues for bugs and feature requests.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact

For questions or collaboration, reach out via the GitHub repository or contact the maintainer at your preferred channel.

---

Thank you for checking out this project! Enjoy tracking FACEIT team ELOs with ease.


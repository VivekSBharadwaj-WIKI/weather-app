# 🌦️ Weather App

> A clean, responsive weather application that delivers real-time forecasts with an intuitive interface — powered by the Open-Meteo API, no API key required.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 City Search | Look up current weather for any city worldwide |
| 🌡️ Live Conditions | Real-time temperature, humidity, wind speed, and weather status |
| ⏱️ Hourly Forecast | Hour-by-hour breakdown for the next 24 hours |
| 📅 7-Day Forecast | Extended weekly outlook with daily highs and lows |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Responsive design with smooth animations
- **JavaScript (ES6+)** — Async/await API handling and dynamic DOM updates
- **[Open-Meteo API](https://open-meteo.com/)** — Free, open-source weather API (no API key needed!)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. Open in your browser

No build tools or dependencies required — just open `index.html` directly:

```bash
open index.html
```

Or serve it locally with a simple HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Then visit `http://localhost:8000` in your browser.

---

## 📁 Project Structure

```
weather-app/
├── index.html       # Main HTML structure
├── style.css        # Styling and responsive layout
├── script.js        # App logic and API integration
└── README.md        # Project documentation
```

---

## 🌐 API Reference

This project uses the **[Open-Meteo API](https://open-meteo.com/)** — a free, open-source weather service with no authentication required.

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`

---

## 📸 Screenshots

> _Add screenshots of your app here to give visitors a quick visual preview._

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ☀️ and a little 🌧️</p>

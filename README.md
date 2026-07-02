# AnimeCode 🤖

> **Watch algorithms come alive** — Visual step-by-step explanations for LeetCode, CodeChef & Codeforces problems.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎬 **Animated Visualisations** | Step-by-step animations for every algorithm |
| 📖 **Solution Walkthrough** | Numbered explanation *above* each animation |
| 🧪 **3 Test Cases per Problem** | Switch examples mid-animation |
| 🌐 **Platform Filter** | Browse LeetCode · CodeChef · Codeforces |
| 👋 **Welcome Onboarding** | Name + occupation prompt (no login required) |
| ✉️ **Contribute Page** | Envelope-style open-source contribution form |
| 💻 **C++ & Python Solutions** | One-click copy for both languages |
| 🎛️ **Full Playback Controls** | Play / Pause / Speed / Seek bar |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
# → Open http://localhost:5173

# 3. Build for production
npm run build
# → Output in /dist
```

---

## 🗂️ Project Structure

```
animecode/
├── src/
│   ├── animations/          # TwoSumViz · BinarySearchViz · ValidParenViz
│   ├── components/          # Navbar · AlgoRobot · AnimationPlayer · WelcomeModal …
│   ├── data/                # problems.js · testCases.js · constants.js
│   ├── pages/               # HomePage · BrowsePage · ProblemPage · ContactPage
│   ├── styles/globals.css   # Tailwind directives + robot keyframes
│   └── App.jsx              # HashRouter + WelcomeModal state
├── tailwind.config.js       # Brand tokens (coral · sage · teal · ink …)
├── postcss.config.js
├── vite.config.js
└── index.html
```

---

## 🌍 Deployment

### Netlify (Drag & Drop)
```bash
npm run build
# Drag the /dist folder to netlify.com/drop
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Push /dist contents to gh-pages branch
```

> Uses `HashRouter` — no server-side routing config required on any static host.

---

## 🎨 Tech Stack

- **React 18** + **React Router v6**
- **Vite 5** (build tool)
- **Tailwind CSS 3** with custom brand tokens
- **CSS Keyframe animations** for the robot character
- No other runtime dependencies

---

## 🤝 Contributing

Have a problem with a great animation idea? Use the **Contribute page** in the app or open a PR.

**Contact:**
- 📧 vishvajit6264@gmail.com
- 📱 +91 8261849093

---

## 📜 License

MIT — free to use, modify, and distribute.

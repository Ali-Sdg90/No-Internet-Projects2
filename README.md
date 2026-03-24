# Paper Scissor Stone Battle Royal

A dynamic, interactive game where paper, scissor, and stone entities battle each other in real-time using classic Rock-Paper-Scissors rules. Watch as hundreds of animated entities move across the screen, eliminate each other, and fight for dominance!

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)

![2026-02-0812-44-51_2-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/5089cb6c-283b-4390-a816-cb5175692bfb)

## 🌟 Features

- **Real-time Battle System**: Entities automatically battle when they come into proximity
- **Dynamic Physics**: Smooth movement with velocity and collision detection
- **Live Score Counter**: Track the population of each entity type in real-time
- **Configurable Game Settings**: Customize entity counts, speed, and detection radius
- **Responsive Design**: Works on various screen sizes
- **Optimized Performance**: Efficient state management with React Context API
- **Code Quality**: Prettier configured for consistent code style

## 🚀 Live Demo

Play the game now: [**pss-project-demo**](https://ali-sdg90.github.io/PSS-Project/)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Styling**: SCSS
- **State Management**: React Context API
- **Build Tool**: Create React App (react-scripts)
- **Code Quality**:
  - Prettier (Code formatting)
  - CommitLint (Git commit linting)
- **Deployment**: GitHub Pages

### Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-scripts": "^5.0.1",
  "sass": "^1.83.1",
  "gh-pages": "^6.3.0"
}
```

## 📥 Installation

### Prerequisites
- **Node.js**: >= 18
- **npm**: >= 9

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ali-Sdg90/PSS-Project.git
   cd PSS-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will automatically open at `http://localhost:3000`

## 📖 Usage

### Running Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with hot-reload |
| `npm run build` | Create optimized production build |
| `npm run deploy` | Build and deploy to GitHub Pages |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting without modifying |

## 🎯 How the Game Works

### Game Rules
The game follows classic **Rock-Paper-Scissors** rules:
- 📄 **Paper** defeats 🪨 **Stone**
- 🪨 **Stone** defeats ✂️ **Scissor**
- ✂️ **Scissor** defeats 📄 **Paper**
- Same types don't fight each other

### Game Mechanics

1. **Initialization**: A configurable number of Paper, Scissor, and Stone entities spawn randomly on the canvas
2. **Movement**: Each entity moves with random velocity across the screen
3. **Collision Detection**: When entities come within a detection radius, they battle
4. **Battle Resolution**: The winning entity survives; the loser is eliminated
5. **Population Display**: Real-time score counter shows remaining entities

### Customization

Edit `src/constants/appConfig.js` to tweak game settings:

```javascript
export const appConfig = {
    numberOfStones: 50,        // Initial stone count
    numberOfPapers: 50,        // Initial paper count
    numberOfScissors: 50,      // Initial scissor count
    maxSpeed: 1,               // Maximum velocity
    minSpeed: -1,              // Minimum velocity
    gameSpeed: 30,             // Animation frame rate (ms)
    fixItemSize: 1.5,          // Entity size
    minItemSize: 1.5,          // Minimum boundary
    maxItemSize: 98.5,         // Maximum boundary
    detectionRadios: 3,        // Battle detection radius
};
```

## 📁 Project Structure

```
PSS-Project/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   │   ├── Base.jsx      # Main game logic container
│   │   └── Item.jsx      # Entity renderer
│   ├── store/
│   │   └── Data/
│   │       ├── DataContext.jsx    # Context definition
│   │       └── DataProvider.jsx   # Context provider
│   ├── constants/
│   │   ├── appConfig.js          # Game configuration
│   │   └── gameItemTypes.js      # Game type definitions
│   ├── utils/
│   │   ├── gameLogic.js          # Battle resolution logic
│   │   ├── moveItem.js           # Physics & movement
│   │   └── maxMinChecker.js      # Boundary checking
│   ├── assets/
│   │   └── scss/                 # Stylesheets
│   ├── App.jsx
│   └── index.jsx
├── build/                  # Optimized production build
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes with conventional commits (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Format code with Prettier
- Use meaningful commit messages
- Write clear component documentation

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ali Sadeghi**
- GitHub: [@Ali-Sdg90](https://github.com/Ali-Sdg90)

## 🇮🇷 A Story Behind This Project

This project was created during the **complete internet blackout in Iran in October 2025**.

Building this game was an incredible challenge and rewarding experience:
- ❌ No internet access for research or documentation
- ❌ No AI assistance or external help
- ✅ Just an idea in my mind
- ✅ Pure passion for programming and creating

Every line of code was written from scratch, relying solely on my knowledge and problem-solving skills. It was a unique opportunity to prove that limitations can spark creativity, and the most satisfying projects are those built with determination and persistence.

**Made with ❤️ by Ali Sadeghi**

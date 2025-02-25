html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(135deg, #e0e0e0, #f5f5f5);
    font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif;
}

.start-screen, .game-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: rgba(255, 255, 255, 0.95);
    padding: 30px;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(12px);
    max-height: 90vh;
    overflow: hidden;
    transition: opacity 0.5s ease;
}

.start-screen {
    width: 450px;
    opacity: 1;
    background: linear-gradient(135deg, #ff6f61, #ffcc5c);
    color: #fff;
}

.start-screen.hidden {
    opacity: 0;
    pointer-events: none;
}

.start-screen h1 {
    font-size: 3em;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.start-screen input {
    width: 80%;
    padding: 12px;
    margin: 15px 0;
    border: none;
    border-radius: 12px;
    font-size: 1.3em;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: bounceIn 0.8s ease-out;
}

@keyframes bounceIn {
    0% { transform: scale(0.8); opacity: 0; }
    60% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); }
}

.start-screen ul {
    list-style: none;
    padding: 0;
    margin: 20px 0;
    text-align: left;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

.start-screen li {
    font-size: 1.1em;
    margin: 10px 0;
    opacity: 0;
    animation: fadeInUp 0.5s ease forwards;
}

.start-screen li:nth-child(1) { animation-delay: 0.2s; }
.start-screen li:nth-child(2) { animation-delay: 0.4s; }
.start-screen li:nth-child(3) { animation-delay: 0.6s; }

@keyframes fadeInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.start-screen button {
    padding: 12px 24px;
    background: #007aff;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 1.3em;
    cursor: pointer;
    transition: background 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.start-screen button:hover {
    background: #005bb5;
    animation: none;
}

.game-container {
    opacity: 0;
    pointer-events: none;
    padding-bottom: 60px;
}

.game-container.active {
    opacity: 1;
    pointer-events: auto;
}

h1 {
    color: #000;
    font-size: 2.5em;
    font-weight: 600;
    margin: 10px 0;
    letter-spacing: -0.5px;
}

#score {
    color: #333;
    font-size: 1.5em;
    font-weight: 500;
    margin: 10px 0;
}

.grid {
    display: grid;
    grid-template-columns: repeat(9, 40px);
    gap: 4px;
    background: rgba(240, 240, 240, 0.9);
    padding: 12px;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.cell {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1em;
    color: #fff;
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 0 6px rgba(255, 255, 255, 0.6);
}

.cell:hover {
    transform: scale(1.05);
}

.selected {
    opacity: 0.85;
    border: 2px solid #fff;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.H { background: #ff3b30; }
.O { background: #ff2d55; }
.N { background: #007aff; }
.F { background: #34c759; }
.Cl { background: #ffcc00; }
.Br { background: #ff9500; }
.I { background: #5856d6; }
.C { background: #00c7be; }
.S { background: #ff9500; }
.P { background: #af52de; }
.Na { background: #5ac8fa; }
.K { background: #ff3b30; }
.Ca { background: #4cd964; }
.Mg { background: #32ade6; }
.Al { background: #8e8e93; }
.Si { background: #ffcc00; }

.blast {
    animation: blast 0.4s ease-out forwards;
}

@keyframes blast {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
    100% { transform: scale(0); opacity: 0; }
}

#molecule-display {
    color: #000;
    font-size: 1.8em;
    font-weight: 500;
    margin: 15px 0;
    min-height: 40px;
    position: relative;
}

.glitter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.5), transparent);
    animation: glitter 1s infinite;
}

@keyframes glitter {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.5); opacity: 0.3; }
    100% { transform: scale(1); opacity: 0.8; }
}

.footer {
    position: absolute;
    bottom: 10px;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

#share-score {
    padding: 8px 16px;
    background: #007aff;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 1em;
    cursor: pointer;
    transition: background 0.3s ease;
}

#share-score:hover {
    background: #005bb5;
}

#credits {
    color: #666;
    font-size: 1em;
}

const drivers = [
    { id: 1, name: "George Russell", team: "Mercedes", number: "63", image: "mercedes_russell.png", color: "#00A19B", score: 0 },
    { id: 2, name: "Kimi Antonelli", team: "Mercedes", number: "12", image: "mercedes_antonelli.png", color: "#00A19B", score: 0 },
    { id: 3, name: "Lewis Hamilton", team: "Ferrari", number: "44", image: "ferrari_hamilton.png", color: "#FFF200", score: 0 },
    { id: 4, name: "Charles Leclerc", team: "Ferrari", number: "16", image: "ferrari_leclerc.png", color: "#FFF200", score: 0 },
    { id: 5, name: "Lando Norris", team: "McLaren", number: "1", image: "mclaren_norris.png", color: "#FF8000", score: 0 },
    { id: 6, name: "Oscar Piastri", team: "McLaren", number: "81", image: "mclaren_piastri.png", color: "#FF8000", score: 0 },
    { id: 7, name: "Esteban Ocon", team: "Haas", number: "31", image: "haas_ocon.png", color: "#E6002B", score: 0 },
    { id: 8, name: "Oliver Bearman", team: "Haas", number: "87", image: "haas_bearman.png", color: "#E6002B", score: 0 },
    { id: 9, name: "Pierre Gasly", team: "Alpine", number: "10", image: "alpine_gasly.png", color: "#2173B8", score: 0 },
    { id: 10, name: "Franco Colapinto", team: "Alpine", number: "43", image: "alpine_colapinto.png", color: "#2173B8", score: 0 },
    { id: 11, name: "Max Verstappen", team: "Red Bull Racing", number: "3", image: "redbullracing_verstappen.png", color: "#C0BFBF", score: 0 },
    { id: 12, name: "Isack Hadjar", team: "Red Bull Racing", number: "6", image: "redbullracing_hadjar.png", color: "#C0BFBF", score: 0 },
    { id: 13, name: "Liam Lawson", team: "Racing Bulls", number: "30", image: "racingbulls_lawson.png", color: "#6C98FF", score: 0 },
    { id: 14, name: "Arvid Lindblad", team: "Racing Bulls", number: "41", image: "racingbulls_lindblad.png", color: "#6C98FF", score: 0 },
    { id: 15, name: "Nico Hulkenberg", team: "Audi", number: "27", image: "audi_hulkenberg.png", color: "#ff2d00", score: 0 },
    { id: 16, name: "Gabriel Bortoleto", team: "Audi", number: "5", image: "audi_bortoleto.png", color: "#ff2d00", score: 0 },
    { id: 17, name: "Carlos Sainz", team: "Williams", number: "55", image: "williams_sainz.png", color: "#00A0DE", score: 0 },
    { id: 18, name: "Alexander Albon", team: "Williams", number: "23", image: "williams_albon.png", color: "#00A0DE", score: 0 },
    { id: 19, name: "Sergio Perez", team: "Cadillac", number: "11", image: "cadillac_perez.png", color: "#aaaaad", score: 0 },
    { id: 20, name: "Valtteri Bottas", team: "Cadillac", number: "77", image: "cadillac_bottas.png", color: "#aaaaad", score: 0 },
    { id: 21, name: "Fernando Alonso", team: "Aston Martin", number: "14", image: "astonmartin_alonso.png", color: "#005e53", score: 0 },
    { id: 22, name: "Lance Stroll", team: "Aston Martin", number: "18", image: "astonmartin_stroll.png", color: "#005e53", score: 0 }
];

let currentPairIndex = 0;
let currentRound = 1;
const totalRounds = 3; 

// 1. Клік на головній сторінці
function startGame() {
    const startScreen = document.getElementById('start-screen');
    const rulesScreen = document.getElementById('rules-screen');

    if (startScreen && rulesScreen) {
        startScreen.style.display = 'none';
        rulesScreen.style.display = 'flex';
        console.log("Showing rules...");
    } else {
        console.error("Екрани не знайдені! Перевір ID в HTML.");
    }
}

// 2. Клік на екрані правил
function startActualGame() {
    const rulesScreen = document.getElementById('rules-screen');
    const gameScreen = document.getElementById('game-screen');

    if (rulesScreen && gameScreen) {
        rulesScreen.style.display = 'none';
        gameScreen.style.display = 'block';

        console.log("Battle start!");
        
        // Скидаємо гру
        currentRound = 1;
        currentPairIndex = 0;
        drivers.forEach(d => d.score = 0); 
        
        shuffleDrivers(drivers); 
        displayDrivers(0, 1);
        updateProgressBar();
    } else {
        console.error("Екран гри або правил не знайдено!");
    }
}
function displayDrivers(leftIdx, rightIdx) {
    const left = drivers[leftIdx];
    const right = drivers[rightIdx];

    document.getElementById('left-img').src = "images/" + left.image;
    document.getElementById('left-name').innerText = left.name;
    document.getElementById('left-number').innerText = left.number;
    document.getElementById('left-signature').innerText = left.team;
    document.getElementById('left-card').style.borderColor = left.color;

    document.getElementById('right-img').src = "images/" + right.image;
    document.getElementById('right-name').innerText = right.name;
    document.getElementById('right-number').innerText = right.number;
    document.getElementById('right-signature').innerText = right.team;
    document.getElementById('right-card').style.borderColor = right.color;
}

function pick(side) {
    const leftCard = document.getElementById('left-card');
    const rightCard = document.getElementById('right-card');
    
    let leftIdx = currentPairIndex * 2;
    let rightIdx = currentPairIndex * 2 + 1;

    // Нарахування балів та анімація
    if (side === 'left') {
        leftCard.classList.add('winner-effect');
        rightCard.classList.add('loser-effect');
        drivers[leftIdx].score += 1; 
    } 
    else if (side === 'right') {
        rightCard.classList.add('winner-effect');
        leftCard.classList.add('loser-effect');
        drivers[rightIdx].score += 1;
    }
    else if (side === 'tie') {
        leftCard.classList.add('skip-effect');
        rightCard.classList.add('skip-effect');
    }

    setTimeout(() => {
        leftCard.classList.remove('winner-effect', 'loser-effect', 'skip-effect');
        rightCard.classList.remove('winner-effect', 'loser-effect', 'skip-effect');

        currentPairIndex++;
        updateProgressBar();

        let nextLeft = currentPairIndex * 2;
        let nextRight = currentPairIndex * 2 + 1;

        // Перевіряємо, чи є наступна пара в поточному колі
        if (nextLeft < drivers.length) {
            displayDrivers(nextLeft, nextRight);
        } else {
            // Коло закінчилося. Перевіряємо, чи йдемо на наступне
            if (currentRound < totalRounds) {
                currentRound++;
                currentPairIndex = 0;
                shuffleDrivers(drivers); 
                displayDrivers(0, 1);
                console.log(`Starting round ${currentRound}`);
            } else {
                finishGame(); 
            }
        }
    }, 400);
}

function shuffleDrivers(array) {
    let hasTeamConflicts = true;
    let attempts = 0;

    while (hasTeamConflicts && attempts < 100) {
        // Тасуємо
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        hasTeamConflicts = false;
        // Перевірка на сусідів з однієї команди
        for (let i = 0; i < array.length - 1; i += 2) {
            if (array[i].team === array[i + 1].team) {
                hasTeamConflicts = true;
                break;
            }
        }
        attempts++;
    }
}

function updateProgressBar() {
    const totalBattles = (drivers.length / 2) * totalRounds;
    const currentBattle = (currentRound - 1) * (drivers.length / 2) + currentPairIndex;
    const percentage = Math.round((currentBattle / totalBattles) * 100);
    const bar = document.getElementById('progress-bar');
    if (bar) {
        bar.style.width = percentage + "%";
    }
    const percentText = document.getElementById('progress-percent');
    if (percentText) {
        percentText.innerText = percentage;
    }
}

function finishGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'block';

    const rankedDrivers = [...drivers].sort((a, b) => b.score - a.score);
    
    const rankingTable = document.getElementById('ranking-table');
    rankingTable.innerHTML = ""; 
  
    rankedDrivers.forEach((driver, index) => {
        const row = document.createElement('div');
        row.className = "ranking-row"; 
        
        let positionDisplay = `#${index + 1}`;
        if (index === 0) positionDisplay = "🥇";
        else if (index === 1) positionDisplay = "🥈";
        else if (index === 2) positionDisplay = "🥉";

        row.style.borderLeft = `5px solid ${driver.color}`;
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.padding = "12px";
        row.style.margin = "5px 0";
        row.style.background = "rgba(255, 255, 255, 0.05)";
        row.style.borderRadius = "5px";

        row.innerHTML = `
            <div class="position-box" style="min-width: 40px; font-family: 'Orbitron', sans-serif;">
                ${positionDisplay}
            </div>
            <div style="flex-grow: 1; font-family: 'Orbitron', sans-serif;">
                <span style="font-size: 1.1em; color: #fff; text-transform: uppercase; font-weight: bold;">
                    ${driver.name}
                </span>
                <span style="color: #888; font-size: 0.8em; margin-left: 10px; letter-spacing: 1px;">
                    // ${driver.team}
                </span>
            </div>
        `;

        rankingTable.appendChild(row);
    });
}

function copyResults() {
    
    const rankedDrivers = [...drivers].sort((a, b) => b.score - a.score);

    let shareText = "🏁 My F1 Grid Sorter 2026 Full Results:\n\n";
    
    rankedDrivers.forEach((driver, index) => {
        let medal = `#${index + 1}`;
        if (index === 0) medal = "🥇";
        else if (index === 1) medal = "🥈";
        else if (index === 2) medal = "🥉";
        
        
        shareText += `${medal} ${driver.name.toUpperCase()} — ${driver.team}\n`;
    });

    shareText += "\nCheck my 2026 grid! 🏎️💨";

    navigator.clipboard.writeText(shareText).then(() => {
        const btn = document.getElementById('share-btn');
        btn.innerText = "Copied! ✅";
        btn.style.background = "#28a745"; 

        setTimeout(() => {
            btn.innerText = "Copy Results 📋";
            btn.style.background = "#00A19B";
        }, 2000);
    });
}
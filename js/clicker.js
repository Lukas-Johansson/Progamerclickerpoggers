
const clickerButton = document.querySelector('#click');
const moneyTracker = document.querySelector('#money');
const mpsTracker = document.querySelector('#mps'); 
const mpcTracker = document.querySelector('#mpc'); 
const upgradeList = document.querySelector('#upgradelist');
const msgbox = document.querySelector('#msgbox');

let money = 10;
let moneyPerClick = 0;
let moneyPerSecond = 0;
let last = 0;

let achievementTest = false;

clickerButton.addEventListener(
    'click',
    () => {
        money += moneyPerClick;
    },
    false
);

function step(timestamp) {
    moneyTracker.textContent = Math.round(money);
    mpsTracker.textContent = moneyPerSecond;
    mpcTracker.textContent = moneyPerClick;

    if (timestamp >= last + 1000) {
        money += moneyPerSecond;
        last = timestamp;
    }

    if (moneyPerClick == 1 && !achievementTest) {
        achievementTest = true;
        message('Du har påbörjat din episka resa!', 'achievement');
    }

    window.requestAnimationFrame(step);
}

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    upgrades.forEach((upgrade) => {
        upgradeList.appendChild(createCard(upgrade));
    });
    window.requestAnimationFrame(step);
});

upgrades = [
    {
        name: 'Liten bok',
        cost: 10,
        amount: 1,
    },
    {
        name: 'Stor bok',
        cost: 100,
        amount: 10,
    },
    {
        name: 'Giga bok',
        cost: 1000,
        amount: 100,
    },
    {
        name: 'Hela Amongus Lore',
        cost: 10000,
        amount: 10000000000000000000000000,
    },
];

function createCard(upgrade) {
    const card = document.createElement('div');
    card.classList.add('card');
    const header = document.createElement('p');
    header.classList.add('title');
    const cost = document.createElement('p');

    header.textContent = `${upgrade.name}, +${upgrade.amount} per sekund.`;
    cost.textContent = `Köp för ${upgrade.cost} iq.`;

    card.addEventListener('click', (e) => {
        if (money >= upgrade.cost) {
            moneyPerClick++;
            money -= upgrade.cost;
            upgrade.cost *= 1.5;
            cost.textContent = 'Köp för ' + upgrade.cost + ' iq';
            moneyPerSecond += upgrade.amount;
            message('Grattis du har blivit smartare!', 'success');
        } else {
            message('Du är inte tillräckligt smart.', 'warning');
        }
    });

    card.appendChild(header);
    card.appendChild(cost);
    return card;
}

function message(text, type) {
    const p = document.createElement('p');
    p.classList.add(type);
    p.textContent = text;
    msgbox.appendChild(p);
    setTimeout(() => {
        p.parentNode.removeChild(p);
    }, 2000);
}

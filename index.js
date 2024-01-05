x_player = 'X'
o_player = 'O'
x_list = []
o_list = []
current_player = x_player
current_list = x_list
winner = ''
winning_combos = [
    [1,2,3],
    [3,2,1],
    [4,5,6],
    [6,5,4],
    [7,8,9],
    [9,8,7],
    [1,5,9],
    [9,5,1],
    [1,4,7],
    [7,4,1],
    [2,5,8],
    [8,5,2],
    [3,6,9],
    [9,6,3],
    [3,5,7],
    [7,5,3]
];
gameOver = false;
scoreboard = [];


const boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
    box.addEventListener('click', handleClick);
});

document.querySelector('.reset').addEventListener('click',(event) => {
    resetGame();
})

function handleClick(event){
    if(gameOver){
        return;
    }
    console.log(current_player);
    console.log(current_list);

    //get the clicked box and its details
    const clicked_box = event.currentTarget;

    //to render a 'x' or 'o' inside the clicked box, get the child div of the clicked box
    const child_box = clicked_box.querySelector('.element');

    //to avoid changing of already pressed boxes, this if condition is used
    if (child_box.innerHTML === x_player || child_box.innerHTML === o_player) {
        return;
    }
    child_box.innerHTML = current_player;

    //this code finds which particular box was clicked and associates a number to it to store in the list data structure
    //to compare with the winning combos
    const box_number = Array.from(document.querySelectorAll('.box')).indexOf(clicked_box) + 1;
    current_list.push(box_number);

    //check of winning condition , and changeplayer if winning condition is not achieved
    checkForWin();
    changePlayer();
}

function checkForWin()
{
    if (current_list.length === 0) {
        return;
    }
    is_win = winning_combos.some(combo => {
        return combo.every(element => current_list.includes(element));
    });
    if(is_win)
    {
        gameOver = true;
        winner = current_player;
        scoreboard.push(current_player);
        updateScoreboard();
        document.querySelector('.Winning-message').innerHTML = `Winner is ${winner == x_player ? 'Player 1' : 'Player 2'}`;
        return;
    }
    if(x_list.length+o_list.length == 9)
    {
        if(is_win)
        {
        gameOver = true;
        winner = current_player;
        scoreboard.push(current_player);
        updateScoreboard();
        document.querySelector('.Winning-message').innerHTML = `Winner is ${winner == x_player ? 'Player 1' : 'Player 2'}`;
        return;
        }
        gameOver = true;
        scoreboard.push('draw');
        updateScoreboard();
        document.querySelector('.Winning-message').innerHTML = 'Draw';
    }
}

function resetGame()
{
    x_list = [];
    o_list = [];
    current_player = x_player;
    current_list = x_list;
    gameOver = false;
    document.querySelectorAll('.box').forEach(element => {
        element.querySelector('.element').innerHTML = '';
    });
    document.querySelector('.Winning-message').innerHTML = 'Winner is no one for now';
    console.log(current_player);
    console.log(current_list);
}

function changePlayer(){
    if(current_player == x_player)
    {
        current_player = o_player;
        current_list = o_list;
    }
    else{
        current_player = x_player;
        current_list = x_list;
    }
}

function updateScoreboard()
{
    const scoreboardDiv = document.querySelector('.scoreboard');
    scoreboardDiv.innerHTML = '';
    
    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headerGameNum = document.createElement('th');
    const headerWinner = document.createElement('th');
    headerGameNum.textContent = "Game Number";
    headerWinner.textContent = "Winner";
    headerRow.appendChild(headerGameNum);
    headerRow.appendChild(headerWinner);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    scoreboard.forEach((element,index) => {
        const row = document.createElement('tr');
        const gameNum = document.createElement('td');
        const winner = document.createElement('td');
        gameNum.textContent = index+1;
        winner.textContent = element == x_player ? 'Player 1' : 'Player 2';
        row.appendChild(gameNum);
        row.appendChild(winner);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    scoreboardDiv.appendChild(table);
}



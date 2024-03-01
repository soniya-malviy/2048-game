let totalScore = 0;
function createBoard(){
    let gridDiv = document.querySelector('.grid')
    gridDiv.innerHTML = ''
    for(let i=0; i<16;i++){
        let div = document.createElement('div');
        div.setAttribute('id',`id_${i}`);
        div.textContent=0;
        gridDiv.appendChild(div);
    }
} createBoard();
function generate(){
    let numArray = [2,2,2,2,2,2,2,2,2,4]
    let num= numArray[Math.floor(Math.random()* numArray.length)]
    let allBlocks = document.querySelectorAll('.grid > div')
    let filteredBlocks = [...allBlocks].filter((a)=> a.textContent==0)
    if(filteredBlocks.length==0){
        return;
    }
    let finalBlock = filteredBlocks[[Math.floor(Math.random()* filteredBlocks.length)]];
    finalBlock.textContent = num;
}generate()
generate()
// generate()
// generate()
function shiftArrayLeft(values){
    let finalArray= values.filter((a)=> a!=0);
    let index = finalArray.length;
    while(index<4){
        finalArray.push(0);
        index++;
    }
    return finalArray;
}
function shiftArrayRight(values){
    let finalArray= values.filter((a)=> a!=0);
    let index = finalArray.length;
    while(index<4){
        finalArray.unshift(0);
        index++;
    }
    return finalArray;
}
function shiftRow(rowNumber, direction){
    let rowValues=[]
    for(let i= 4*(rowNumber-1); i<4*rowNumber; i++){
        rowValues.push(document.querySelector(`#id_${i}`).textContent)
    }
    if(direction=='L'){
        rowValues= shiftArrayLeft(rowValues);
        rowValues = combineArrayLeft(rowValues);
        rowValues= shiftArrayLeft(rowValues);
    }
    else if(direction=='R'){
        rowValues= shiftArrayRight(rowValues);
        rowValues= combineArrayRight(rowValues);
        rowValues= shiftArrayRight(rowValues);
    }
    for(let i= 4*(rowNumber-1); i<4*rowNumber; i++){
        document.querySelector(`#id_${i}`).textContent=rowValues[i%4]
    }
}
function shiftLeft(){
    shiftRow(1,'L')
    shiftRow(2,'L')
    shiftRow(3,'L')
    shiftRow(4,'L')
}
function shiftRight(){
    shiftRow(1,'R')
    shiftRow(2,'R')
    shiftRow(3,'R')
    shiftRow(4,'R')
}
function shiftColoumn(colNumber, direction){
    let rowValues=[]
    for(let i= (colNumber-1); i<16; i+=4){
        rowValues.push(document.querySelector(`#id_${i}`).textContent)
    }
    if(direction=='U'){
        rowValues= shiftArrayLeft(rowValues);
        rowValues = combineArrayLeft(rowValues);
        rowValues= shiftArrayLeft(rowValues);
    }
    else if(direction=='D'){
        rowValues= shiftArrayRight(rowValues);
        rowValues= shiftArrayRight(rowValues);
        rowValues= shiftArrayRight(rowValues);
    }
    let c=0;
    for(let i= (colNumber-1); i<16; i+=4){
        document.querySelector(`#id_${i}`).textContent=rowValues[c];
        c+=1;
    }
}
function shiftUp(){
    shiftColoumn(1,'U')
    shiftColoumn(2,'U')
    shiftColoumn(3,'U')
    shiftColoumn(4,'U')
}
function shiftDown(){
    shiftColoumn(1,'D')
    shiftColoumn(2,'D')
    shiftColoumn(3,'D')
    shiftColoumn(4,'D')
}
shiftUp()
function combineArrayLeft(values){
    let index=1
    while(index<4){
        if(values[index-1]== values[index]){
            values[index-1]*=2
            totalScore += parseInt(values[index-1]);
            values[index]=0
        }
        index++
    }
    document.querySelector('#score').innerHTML = totalScore;
    // console.log(score);
    return values
}
function combineArrayRight(values){
    let index=values.length-1
    while(index>0){
        if(values[index]== values[index-1]){
            values[index]*=2
            totalScore += parseInt(values[index]);
            values[index-1]=0
        }
        index--
    }
    // console.log(score);
    document.querySelector('#score').innerHTML = totalScore;
    return values
}
function keyUpHandler(event){
    switch(event.keyCode){
        case 37:
            shiftLeft();
            break
        case 38:
            shiftUp();
            break
        case 39:
            shiftRight();
            break
        case 40:
            shiftDown();
    }
    generate();
    if (checkForWin()) {
        document.querySelector('#result').textContent = "YOU WIN"
        document.body.removeEventListener('keyup', keyUpHandler);
    }
    else if (isGameOver()) {
        document.querySelector('#result').textContent = "Game Over!";
        document.body.removeEventListener('keyup', keyUpHandler);
    }
}
document.body.addEventListener('keyup', keyUpHandler)
const isGameOver = () => {
    // for(let i=0; i<16; i+=1){
    //     rowValues.push(document.querySelector(`#id_${i}`).textContent)
    // }
    let all_blocks = document.querySelectorAll('.grid>div')
    let filteredBlocks = [...all_blocks]
    if (filteredBlocks.filter((a)=>a.textContent==='0').length > 0) {
        return false;
    }
    let blocks = [...all_blocks].map(a=>parseInt(a.textContent));
    for ( let i=0;i<4;i++) {
        for (let j=0;j<3;j++) {
            if (blocks[i*4+j]===blocks[i*4+j+1]) {
                return false;
            }
        }
    }
    for ( let i=0;i<4;i++) {
        for (let j=0;j<3;j++) {
            if (blocks[j*4+i]===blocks[(j+1)*4+i]) {
                return false;
            }
        }
    }
    return true;
}
const checkForWin = () => {
    let all_blocks = document.querySelectorAll('.grid>div')
    let blocks = [...all_blocks].map(a=>parseInt(a.textContent));
    console.log(blocks);
    return blocks.reduce((accum, cur) => accum||(cur===2048), false)
}
document.querySelector('#restart-button').addEventListener('click', (e)=>{
    // for (let i=0;i<16;i++) {
    //     document.querySelector(`#id_${i}`).textContent=0;
    // }
    createBoard();
    generate();
    generate();
    totalScore = 0;
    document.querySelector('#result').textContent = 'Join the numbers and get to the 2048 tile!';
    document.querySelector('#score').innerHTML = totalScore;
    document.body.addEventListener('keyup', keyUpHandler);
})

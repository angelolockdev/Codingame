var inputs = readline().split(' ');
const lightX = parseInt(inputs[0]); // the X position of the light of power
const lightY = parseInt(inputs[1]); // the Y position of the light of power
const initialTx = parseInt(inputs[2]); // Thor's starting X position
const initialTy = parseInt(inputs[3]); // Thor's starting Y position
var move = (x,y,direction) => {
    const maxX = 39, minX = 0, maxY = 17, minY = 0, eachMove = 1;
    switch (direction) {
        case "N":
            y= y>minY ? y-eachMove : y;
            break;
        case "NE":
            x= x>=minX && x<maxX ? x+eachMove : x;
            y= y>minY ? y-eachMove : y;
            break;
        case "E":
            x= x>=minX && x<maxX ? x+eachMove : x;
            break;
        case "SE":
            x= x>=minX && x<maxX ? x+eachMove : x;
            y= y>=minX && y<maxY ? y+eachMove : y;
            break;
        case "S":
            y= y>=minX && y<maxY ? y+eachMove : y;
            break;
        case "SW":
            x= x>minX ? x-eachMove : x;
            y= y>=minX && y<maxY ? y+eachMove : y;
            break;
        case "W":
            x= x>minX ? x-eachMove : x;
            break;
        default:
            x= x>minX ? x-eachMove : x;
            y= y>minY ? y-eachMove : y;
            break;
    }
    return [x,y];
};
var predictMove = (lX, lY, itX, itY, moves = []) => {
    let canMoveX = Math.abs(Math.abs(itX) - Math.abs(lX));
    let canMoveY = Math.abs(Math.abs(itY) - Math.abs(lY));
    let whereToGo = "";

    if(lX > itX && canMoveX>0){
        whereToGo = lY > itY ? "SE" : (lY < itY ? "NE" : "E");
    }else if(lX < itX && canMoveX>0){
        whereToGo = lY < itY ? "NW" : (lY > itY ? "SW" : "W");
    }else if(lY > itY && canMoveY>0){
        whereToGo = lX > itX ? "SE" : (lX < itX ? "SW" : "S");
    }else if(lY < itY && canMoveY>0){
        whereToGo = lX < itX ? "NW" : ( lX > itX ? "NE" : "N");
    }else if(lY < itY && canMoveY && !canMoveX){
        whereToGo = "N";
    }else if(lX < itX && canMoveX && !canMoveY){
        whereToGo = "W";
    }
    
    let moving = move(itX, itY, whereToGo);
    itX = moving[0];    // value of X
    itY = moving[1];    // value of Y

    moves.push(whereToGo);   // add moves

    if(canMoveX == 0 && canMoveY == 0){
        return moves;
    }else {
        return predictMove(lX, lY, itX, itY, moves);
    }
};
// game loop
while (true) {
    const remainingTurns = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line.
    var moves = predictMove(lightX, lightY, initialTx, initialTy);
    moves.forEach(mv => {
        console.log(mv);
    });
}

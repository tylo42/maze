draw = async (grid, playerPosition) => {
    process.stdout.cursorTo(0, 1);

    const output = [];

    for(let y=grid.length-1; y>=0; y--) {
        for(let x=0; x<grid[y].length; x++) {
            if(playerPosition.x === x && playerPosition.y === y) {
                output.push('J')
            } else {
                output.push(grid[y][x])
            }
        }
        output.push('\n')
    }

    process.stdout.write(output.join(''))
}

try {
    let grid = [];
    
    grid.push('▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓'.split(''))
    grid.push('▓     ▓       ▓     ▓     ▓       ▓♥  ▓'.split(''))
    grid.push('▓ ▓ ▓ ▓ ▓ ▓▓▓▓▓ ▓ ▓▓▓ ▓▓▓ ▓ ▓▓▓▓▓▓▓▓▓ ▓'.split(''))
    grid.push('▓ ▓ ▓   ▓       ▓ ▓     ▓ ▓   ▓   ▓ ▓ ▓'.split(''))
    grid.push('▓▓▓ ▓▓▓▓▓ ▓▓▓▓▓▓▓ ▓ ▓▓▓▓▓ ▓ ▓▓▓ ▓ ▓ ▓ ▓'.split(''))
    grid.push('▓       ▓ ▓       ▓ ▓   ▓ ▓   ▓ ▓ ▓ ▓ ▓'.split(''))
    grid.push('▓ ▓ ▓▓▓▓▓ ▓ ▓▓▓▓▓▓▓ ▓ ▓▓▓ ▓ ▓▓▓ ▓ ▓ ▓ ▓'.split(''))
    grid.push('▓ ▓     ▓ ▓             ▓       ▓     ▓'.split(''))
    grid.push('▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓'.split(''))

    grid = grid.reverse()

    const yMax = grid.length;
    const xMax = grid[0].length;

    // for(let y=0; y<yMax; y++) {
    //     for(let x=0; x<xMax; x++) {
    //         if(!grid[y]) {
    //             grid[y] = []
    //         }
    //         grid[y][x] = Math.floor(Math.random()*2)
    //     }
    // }
    // grid[0][0] = 0

    let playerPosition = {
        x:1,
        y:1
    }

    draw(grid, playerPosition)


    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function(key){
        let nextPosition = null;
        if (key == '\u001B\u005B\u0041') { // UP
            nextPosition = {
                x: playerPosition.x,
                y: Math.min(yMax-1, playerPosition.y+1)
            }
        }
        if (key == '\u001B\u005B\u0043') { // RIGHT
            nextPosition = {
                x: Math.min(xMax-1, playerPosition.x+1),
                y: playerPosition.y
            }
        }
        if (key == '\u001B\u005B\u0042') { // DOWN
            nextPosition = {
                x: playerPosition.x,
                y: Math.max(0, playerPosition.y-1)
            }
        }
        if (key == '\u001B\u005B\u0044') { // LEFT
            nextPosition = {
                x: Math.max(0, playerPosition.x-1),
                y: playerPosition.y
            }
        }

        if (key == '\u0003') {
            process.exit(); // ctrl-c
        }
        if(nextPosition) {
            if(grid[nextPosition.y][nextPosition.x] === ' ') {
                playerPosition = nextPosition;
            } else if(grid[nextPosition.y][nextPosition.x] === '♥') {
                console.log('You win')
                process.exit()
            }
            draw(grid, playerPosition)
        }
    });

    
    
} catch (err) {
    console.error(err)
}
const utils = {
        withGrid(n) {
            return n * 48
        },
        asGridCoord(x,y)
        {
            return `${x*48},${y*48}`
        },
        nextPosition(initialX,initialY,direction)
        {
            let x = initialX
            let y = initialY
            const size = 48
            if (direction === "left"){
                x -= size
            }
            else if (direction === "right"){
                x += size
            }
            else if (direction ==="up"){
                y -= size
            }
            else if (direction === "down"){
                y += size
            }
            return {x,y}
        },
        nextPositionUngrid(initialX,initialY,direction)
        {
            let x = initialX
            let y = initialY
            const size = 1
            if (direction === "left"){
                x -= size
            }
            else if (direction === "right"){
                x += size
            }
            else if (direction ==="up"){
                y -= size
            }
            else if (direction === "down"){
                y += size
            }
            return {x,y}
        }
}
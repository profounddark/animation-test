let canvas;
let context;
let ballSprite;

let ballX = 0;
let ballY = 0;
const xSpeed = 15;
const ySpeed = 15;

let oldTime = 0;

class Tile
{
    constructor(sheet, width, height, frames, interval)
    {
        this.spriteSheet = sheet;
        this._width = width;
        this._height = height;
        this._frames = frames;
        this._interval = interval;

        this._previous = null;

        this._currentFrame = 0;
    }

    update(time)
    {
        if(this._previous)
        {
            if ((time - this._previous)>this._interval)
            {
                this._currentFrame++;
                if (this._currentFrame == this._frames)
                {
                    this._currentFrame = 0;
                }
                this._previous = time;
            }
        }
        else
        {
            this._previous = time;
        }
    }

    drawTile(ctx, x, y)
    {
        ctx.drawImage(this.spriteSheet,
            this._currentFrame*this._width,
            0,
            this._width,
            this._height,
            x,
            y,
            this._width,
            this._height);
    } 
}

function mainPaint(timestamp)
{
    // update deltaT
    let deltaT = (timestamp - oldTime)/1000;
    oldTime = timestamp;

    ballX = ballX + xSpeed*deltaT;
    ballY = ballY + ySpeed*deltaT;


    context.clearRect(0, 0, canvas.width, canvas.height);
    ballSprite.update(timestamp);
    ballSprite.drawTile(context, ballX, ballY);
    window.requestAnimationFrame(mainPaint);
}

window.addEventListener("load", function(event)
{
    canvas = document.getElementById("testground");
    canvas.height = 500;
    canvas.width = 500;
    context = canvas.getContext("2d");

    ballSprite = new Tile(document.getElementById("ballsprite"), 24, 24, 4, 100);

    window.requestAnimationFrame(mainPaint);
});
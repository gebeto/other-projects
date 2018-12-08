using System;
using System.Collections.Generic;

namespace Game
{
    public delegate void Drawing();

    public class GameScreen
    {
        public Canvas canvas;
        public Drawing drawing;

        public GameScreen(int width = 20, int height = 20)
        {
            this.canvas = new Canvas(width, height);
            this.canvas._x = Console.WindowWidth / 2 - this.canvas.width / 2;
            this.canvas._y = Console.WindowHeight / 2 - this.canvas.height / 2;
            this.drawing += this._draw;
        }

        public void _draw() {
            this.canvas
                .clear(ConsoleColor.Black)
                .setFillColor(ConsoleColor.White)
                .drawBox(0, 0, this.canvas.width, this.canvas.height);
        }

        public void draw() {
            this.drawing();
            this.canvas.cursorTo(0, 0);
        }
    }
}
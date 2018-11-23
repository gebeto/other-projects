using System;

namespace Game
{
    public delegate void Drawing();

    public class GameScreen
    {
        public Canvas canvas;
        public Drawing drawing;

        public GameScreen()
        {
            this.canvas = new Canvas(20, 20);
            this.canvas._x = Console.WindowWidth / 2 - this.canvas.width / 2;
            this.canvas._y = Console.WindowHeight / 2 - this.canvas.height / 2;
            this.drawing += this._draw;
        }

        public void _draw() {
            this.canvas
                .clear(ConsoleColor.Black)
                .setFillColor(ConsoleColor.White)
                .drawBox(0, 0, 20, 20);
        }

        public void draw() {
            this.drawing();
            this.canvas.cursorTo(0, 0);
        }

    }
}
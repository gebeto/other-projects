using System;

namespace Game
{
    public class Desk
    {
        private Canvas canvas;
        private int score;

        public Desk(GameScreen screen)
        {
            this.score = 0;
            this.canvas = screen.canvas.createRelativeCanvas(0, 0, 12, 20);
            screen.drawing += draw;
        }

        public void draw()
        {
            this.canvas
                .setFillColor(ConsoleColor.White)
                .drawBox(0, 0, 12, 20);

            // screen
            //     .setFillColor(ConsoleColor.White)
            //     // .drawBox(12, 0, 7, 7);
            //     .fill(12, 0, 8, 8);

            // screen
            //     .setFillColor(ConsoleColor.Black)
            //     .setFontColor(ConsoleColor.White)
            //     .drawText(13, 8, "SCORE")
            //     .drawText(13, 9, string.Format("{0}", this.score).PadLeft(5, '0'))
            //     .cursorTo(0, 0);

            // screen.setFillColor(ConsoleColor.Black);
            // screen.setFontColor(ConsoleColor.White);
            // screen.cursorTo(0, 0);
        }
    }
}
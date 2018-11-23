using System;

namespace Game
{
    public class Score
    {
        private Canvas canvas;
        private int score;

        public Score(GameScreen screen)
        {
            this.score = 0;
            this.canvas = screen.canvas.createRelativeCanvas(13, 2, 5, 5);
            screen.drawing += draw;
        }

        public void draw()
        {
            this.canvas
                .setFillColor(ConsoleColor.Black)
                .setFontColor(ConsoleColor.White)
                .drawText(0, 0, "SCORE")
                .drawText(0, 1, string.Format("{0}", this.score).PadLeft(5, '0'))
                .cursorTo(0, 0);
        }
    }
}
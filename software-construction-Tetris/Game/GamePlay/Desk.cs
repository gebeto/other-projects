using System;
using System.Collections.Generic;

namespace Game
{
    public class Desk
    {
        private Canvas canvas;
        private List<Shape> shapes;

        public Desk(GameScreen screen)
        {
            this.shapes = new List<Shape>(){};
            this.shapes.Add(new Shape());
            this.canvas = screen.canvas.createRelativeCanvas(0, 0, 12, 20);
            screen.drawing += draw;
        }

        public void draw()
        {
            this.canvas
                .setFillColor(ConsoleColor.White)
                .drawBox(0, 0, 12, 20);

            foreach (Shape shape in this.shapes)
            {
                shape.draw(3, 3, this.canvas);
            }
        }
    }
}
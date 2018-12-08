using System;
using System.Collections.Generic;

namespace Game
{
    public class Shape
    {
        private int[][] shape;
        public int x;
        public int y;

        public Shape()
        {
            this.x = 0;
            this.y = 0;
            this.shape = new int[][] {
                new int[] {1, 1},
                new int[] {0, 1},
                new int[] {0, 1},
            };
        }

        public void draw(int x, int y, Canvas canvas)
        {
            for (int i = 0; i < this.shape.Length; i++)
            {
                for (int j = 0; j < this.shape[i].Length; j++)
                {
                    // canvas.drawPoint(0, 0);
                    // canvas.drawPoint(1, 1);
                    // canvas.drawPoint(2, 2);
                    // canvas.drawPoint(3, 3);

                    if (this.shape[i][j] > 0) {
                        canvas.drawPoint(x + i, y + j);
                    }
                }
            }
        }
    }
}
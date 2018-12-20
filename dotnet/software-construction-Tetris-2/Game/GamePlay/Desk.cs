using System;
using SFML.System;


namespace Game
{
    public class Desk
    {
        public int[][] desk = new int[][] {
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
            new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
        };

        public bool CheckIntersect(AbstractShape shape)
        {
            for (int i = 0; i < shape.shape.Length; i++)
            {
                for (int j = 0; j < shape.shape[i].Length; j++)
                {
                    // if (shape.Position.Y + i > this.desk.Length) return true;
                    if (shape.shape[i][j] > 0) {
                        try
                        {
                            if (this.desk[shape.Position.Y + i][shape.Position.X + j] > 0)
                            {
                                return true;
                            }
                        }
                        catch (System.Exception)
                        {
                            return true;
                            // throw;
                        }
                    }
                }
            }
            return false;
        }

        public void CheckIntersectWithOut(AbstractShape shape, out bool isIntersected)
        {
            isIntersected = this.CheckIntersect(shape);
        }

        public void CheckIntersectWithRef(AbstractShape shape, ref bool isIntersected)
        {
            isIntersected = this.CheckIntersect(shape);
        }

        public void MergeWith(AbstractShape shape)
        {
            for (int i = 0; i < shape.shape.Length; i++)
            {
                for (int j = 0; j < shape.shape[i].Length; j++)
                {
                    if (shape.shape[i][j] > 0) {
                        this.desk[shape.Position.Y + i][shape.Position.X + j] = shape.shape[i][j];
                    }
                }
            }
        }
    }
}
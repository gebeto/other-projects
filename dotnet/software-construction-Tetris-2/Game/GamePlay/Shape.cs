using System;
using SFML.System;
using SFML.Graphics;


namespace Game
{
    interface IShape
    {
        int[][] shape { get; }
    }

    public class Moveable {
        public Vector2i Position;
        public Vector2i OldPosition;

        public void MoveShape(int x, int y)
        {
            this.OldPosition = this.Position;
            this.Position = new Vector2i(this.Position.X + x, this.Position.Y + y);
        }

        public void ResetPosition() {
            this.Position = this.OldPosition;
        }
    }
    
    public abstract class AbstractShape : Moveable, IShape
    {

        public int[][] shape { get; protected set; }
        public int[][] oldShape { get; protected set; }

        public AbstractShape() : this(new int[][] { new int[] { 1, 1, 1 }, new int[] { 1, 1, 1 }, new int[] { 1, 1, 1 } }) { }

        public AbstractShape(int[][] shape)
        {
            this.shape = shape;
        }

        public void Reset() {
            this.shape = oldShape;
        }

        public void Rotate()
        {
            oldShape = this.shape;

            this.shape = new int[][] {
                new int[] { this.shape[0][2], this.shape[1][2], this.shape[2][2] },
                new int[] { this.shape[0][1], this.shape[1][1], this.shape[2][1] },
                new int[] { this.shape[0][0], this.shape[1][0], this.shape[2][0] },
            };
        }

        public static AbstractShape GenerateRandomShape() {
            Random r = new Random();
            int next = r.Next(3);
            Console.WriteLine("Next {0}", next);
            switch (next)
            {
                case 0:
                    return new Shape1();
                case 1:
                    return new Shape2();
                case 2:
                    return new Shape3();
                default:
                    break;
            }
            return new Shape1();
        }

        public static Color ColorByNumber(int number) {
            if (number == 1) {
                return Color.Red;
            }
            if (number == 2) {
                return Color.Green;
            }
            if (number == 3) {
                return Color.Blue;
            }
            if (number == 4) {
                return Color.Cyan;
            }
            return Color.Black;
        }
    }

    public class Shape1 : AbstractShape
    {
        public Shape1()
        {
            this.shape = new int[][] {
                new int[] {2, 2, 2},
                new int[] {2, 2, 0},
                new int[] {2, 0, 0},
            };
        }
    }
    public class Shape2 : AbstractShape
    {
        public Shape2()
        {
            this.shape = new int[][] {
                new int[] {3, 3, 3},
                new int[] {0, 0, 3},
                new int[] {0, 0, 3},
            };
        }
    }
    public class Shape3 : AbstractShape
    {
        public Shape3()
        {
            this.shape = new int[][] {
                new int[] {0, 0, 0},
                new int[] {4, 4, 0},
                new int[] {4, 4, 0},
            };
        }
    }
}
using System;
using SFML.System;


namespace Game
{
    public class GamePlay {

        public Desk desk;
        public AbstractShape shape;

        public GamePlay() {
            this.desk = new Desk();
            this.shape = new Shape1();
        }

        public int[][] MergedWithShapes() {
            return this.desk.desk;
        }

        public void nextShape()
        {
            this.desk.MergeWith(shape);
            this.shape = AbstractShape.GenerateRandomShape();
        }

        public void moveShape(int x, int y)
        {
            shape.MoveShape(x, y);
            
            // bool isIntersected;
            // desk.CheckIntersectWithOut(shape, out isIntersected);

            bool isIntersected = false;
            desk.CheckIntersectWithRef(shape, ref isIntersected);

            if (isIntersected) {
                shape.ResetPosition();
            }

            // if (desk.CheckIntersect(shape)) {
            //     shape.ResetPosition();
            // }
        }

        public void moveLeft()
        {
            this.moveShape(-1, 0);
        }

        public void moveRight()
        {
            this.moveShape(1, 0);
        }

        public void moveUp()
        {
            this.moveShape(0, -1);
        }

        public void moveDown()
        {
            this.moveShape(0, 1);
        }

        public void rotate()
        {
            shape.Rotate();
            if (this.desk.CheckIntersect(shape)) {
                shape.Reset();
            }
        }

    }
}
using System;
using System.Threading;

namespace Game
{
    public class GamePlay {
        public GameScreen screen;
        public Canvas canvas;

        public Desk desk;
        public Score score;

        public GamePlay(GameScreen screen) {
            this.screen = screen;
            this.canvas = screen.canvas;

            this.screen.drawing += this.draw;

            this.desk = new Desk(this.screen);
            this.score = new Score(this.screen);

            Keyboard.onPress += (KeyboardKey key) => {
                Shape current = this.desk.shapes[this.desk.shapes.Count - 1];
                switch (key)
                {
                    case KeyboardKey.Left:
                        current.x -= 1;
                        break;
                    case KeyboardKey.Right:
                        current.x += 1;
                        break;
                    default:
                        break;
                }
            };
        }

        public void tick()
        {
            Shape current = this.desk.shapes[this.desk.shapes.Count - 1];
            current.y += 1;
        }

        public void draw()
        {
            this.tick();
        }
    }
}
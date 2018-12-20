using System;
using System.Linq;
using System.Collections.Generic;
using SFML;
using SFML.System;
using SFML.Window;
using SFML.Graphics;

namespace Game
{
    public class GamePlayScene : AbstractScene
    {
        GamePlay gamePlay;
        int time;
        public event EventHandler OnEsc;

        public GamePlayScene()
        {
            gamePlay = new GamePlay();
            time = 0;
        }

        public GamePlayScene(GamePlay gamePlay)
        {
            this.gamePlay = gamePlay;
            time = 0;
        }

        override public void Mount(RenderWindow window)
        {
            window.KeyPressed += this.OnKeyPress;
        }

        override public void UnMount(RenderWindow window)
        {
            window.KeyPressed -= this.OnKeyPress;
        }

        override public void Render(RenderWindow window)
        {
            if (time == 100) time = 0;
            time++;

            // Text text = new Text(String.Format("{0}", time), GameContent.TetrisFont);
            // text.Position = new Vector2f(100, 100);
            // text.CharacterSize = 50;
            // text.FillColor = Color.White;
            // window.Draw(text);

            int[][] scene = this.gamePlay.MergedWithShapes();
            int x = 20;
            int y = 20;
            int pixel = 20;
            int width = scene[0].Length * pixel;
            int height = scene.Length * pixel;
            RectangleShape desk = new RectangleShape(new Vector2f(width + 10, height + 10));
            desk.Position = new Vector2f(x - 5, y - 5);
            desk.FillColor = Color.Red;
            window.Draw(desk);
            RectangleShape deskInner = new RectangleShape(new Vector2f(width, height));
            deskInner.Position = new Vector2f(x, y);
            deskInner.FillColor = Color.Black;
            window.Draw(deskInner);

            RectangleShape baseSegment = new RectangleShape(new Vector2f(pixel, pixel));

            for (int i = 0; i < scene.Length; i++)
            {
                for (int j = 0; j < scene[i].Length; j++)
                {
                    var shapeSegment = new RectangleShape(baseSegment);
                    shapeSegment.Position = new Vector2f(
                        x + j * pixel,
                        y + i * pixel
                    );
                    shapeSegment.FillColor = scene[i][j] > 0 ? Color.Red : Color.Black;
                    window.Draw(shapeSegment);
                }
            }

            var shape = gamePlay.shape;
            for (int i = 0; i < shape.shape.Length; i++)
            {
                for (int j = 0; j < shape.shape[i].Length; j++)
                {
                    var shapeSegment = new RectangleShape(baseSegment);
                    shapeSegment.Position = new Vector2f(
                        x + (j + shape.Position.X) * pixel,
                        y + (i + shape.Position.Y) * pixel
                    );
                    shapeSegment.FillColor = shape.shape[i][j] > 0 ? Color.Red : Color.Transparent;
                    window.Draw(shapeSegment);
                }
            }

        }

        private void OnKeyPress(object sender, KeyEventArgs e)
        {
            switch (e.Code)
            {
                case SFML.Window.Keyboard.Key.S:
                case SFML.Window.Keyboard.Key.Down:
                    this.gamePlay.moveDown();
                    break;
                case SFML.Window.Keyboard.Key.W:
                case SFML.Window.Keyboard.Key.Up:
                    this.gamePlay.moveUp();
                    break;
                case SFML.Window.Keyboard.Key.A:
                case SFML.Window.Keyboard.Key.Left:
                    this.gamePlay.moveLeft();
                    break;
                case SFML.Window.Keyboard.Key.D:
                case SFML.Window.Keyboard.Key.Right:
                    this.gamePlay.moveRight();
                    break;
                case SFML.Window.Keyboard.Key.Enter:
                    this.gamePlay.nextShape();
                    break;
                case SFML.Window.Keyboard.Key.Space:
                    this.gamePlay.rotate();
                    break;
                case SFML.Window.Keyboard.Key.Escape:
                    if (this.OnEsc != null) this.OnEsc(null, null);
                    break;
                default:
                    break;
            }
        }
    }
}
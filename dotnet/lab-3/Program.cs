using System;
using SFML.System;


namespace lab_3
{
    static class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Press ESC key to close window");
            var window = new SimpleWindow();
            window.Run();

            Console.WriteLine("All done");
        }
    }

    public class Desk : SFML.Graphics.Shape {
        public override uint GetPointCount() => 4;

        public override Vector2f GetPoint(uint index)
        {
            Console.WriteLine("Point {0}", index);
            switch (index)
            {
                case 0:
                    return new Vector2f(0, 0);
                case 1:
                    return new Vector2f(10, 0);
                case 2:
                    return new Vector2f(10, 10);
                case 3:
                    return new Vector2f(0, 10);
            }
            return new Vector2f(0, 0);
        }
    }

    enum Direction
    {
        UP,
        DOWN,
        LEFT,
        RIGHT
    }

    class SimpleWindow
    {
        Direction direction = Direction.DOWN;

        public void Run()
        {
            var mode = new SFML.Window.VideoMode(600, 600);
            var window = new SFML.Graphics.RenderWindow(mode, "SFML works!");
            window.KeyPressed += Window_KeyPressed;

            // var circle = new SFML.Graphics.CircleShape(100f)
            var circle = new Desk()
            // var circle = new SFML.Graphics.RectangleShape(new Vector2f(100.0f, 100.0f))
            {
                FillColor = SFML.Graphics.Color.Blue
            };

            // Start the game loop
            while (window.IsOpen)
            {
                // Process events
                window.DispatchEvents();
                window.Clear();

                // circle.Rotation += 0.1f;
                if (this.direction == Direction.DOWN)
                {
                    circle.Position = new Vector2f(circle.Position.X, circle.Position.Y + 1.0f);
                }
                else if (this.direction == Direction.UP)
                {
                    circle.Position = new Vector2f(circle.Position.X, circle.Position.Y - 1.0f);
                }
                else if (this.direction == Direction.LEFT)
                {
                    circle.Position = new Vector2f(circle.Position.X - 1.0f, circle.Position.Y);
                }
                else if (this.direction == Direction.RIGHT)
                {
                    circle.Position = new Vector2f(circle.Position.X + 1.0f, circle.Position.Y);
                }
                window.Draw(circle);

                // Finally, display the rendered frame on screen
                window.Display();
            }
        }



        /// <summary>
        /// Function called when a key is pressed
        /// </summary>
        private void Window_KeyPressed(object sender, SFML.Window.KeyEventArgs e)
        {
            var window = (SFML.Window.Window)sender;
            if (e.Code == SFML.Window.Keyboard.Key.W)
            {
                this.direction = Direction.UP;
            }
            else if (e.Code == SFML.Window.Keyboard.Key.S)
            {
                this.direction = Direction.DOWN;
            }
            else if (e.Code == SFML.Window.Keyboard.Key.A)
            {
                this.direction = Direction.LEFT;
            }
            else if (e.Code == SFML.Window.Keyboard.Key.D)
            {
                this.direction = Direction.RIGHT;
            }
            Console.WriteLine("RELESE {0}", e.Code);

            if (e.Code == SFML.Window.Keyboard.Key.Escape)
            {
                window.Close();
            }
        }
    }
}

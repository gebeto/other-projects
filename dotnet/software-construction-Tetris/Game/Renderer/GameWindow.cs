using System;
using SFML;
using SFML.System;
using SFML.Window;
using SFML.Graphics;


namespace Game
{
    public class GameWindow
    {
        Direction direction = Direction.DOWN;
        AbstractGameScene currentScene;
        public RenderWindow window;

        public GameWindow() {
            var mode = new SFML.Window.VideoMode(600, 600);
            this.window = new SFML.Graphics.RenderWindow(mode, "Tetris!");
        }

        public void SetScene(AbstractGameScene scene)
        {
            this.currentScene = scene;
        }

        public void Run()
        {
            window.SetVerticalSyncEnabled(true);
            window.KeyPressed += Window_KeyPressed;
            window.MouseButtonPressed += Window_MousePressed;

            // Start the game loop
            while (window.IsOpen)
            {
                window.Clear();
                window.DispatchEvents();

                if (this.currentScene != null)
                {
                    this.currentScene.Render(window);
                }

                // Finally, display the rendered frame on screen
                window.SetActive();
                window.Display();
            }
        }

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

            if (e.Code == SFML.Window.Keyboard.Key.Escape)
            {
                window.Close();
            }
        }

        private void Window_MousePressed(object sender, SFML.Window.MouseButtonEventArgs e)
        {
            var window = (SFML.Window.Window)sender;

            if (e.Button == SFML.Window.Mouse.Button.Left)
            {
                this.currentScene.dispatchEvent("click", sender, e);
            }
        }
    }
}
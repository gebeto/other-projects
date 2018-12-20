using System;
using SFML;
using SFML.System;
using SFML.Window;
using SFML.Graphics;


namespace Game
{
    public class GameWindow
    {
        IRenderable currentScene;
        public RenderWindow window;

        public GameWindow(string title) {
            var mode = new SFML.Window.VideoMode(500, 440);
            this.window = new SFML.Graphics.RenderWindow(mode, title);
        }

        public void SetScene(AbstractScene scene)
        {
            if (this.currentScene != null) {
                this.currentScene.UnMount(this.window);
            }
            this.currentScene = scene;
            if (this.currentScene != null) {
                this.currentScene.Mount(this.window);
            }
        }

        public void Run()
        {
            window.SetVerticalSyncEnabled(true);

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
    }
}
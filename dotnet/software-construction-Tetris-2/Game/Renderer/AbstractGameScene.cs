using System;
using SFML;
using SFML.System;
using SFML.Window;
using SFML.Graphics;


namespace Game
{
    public abstract class AbstractGameScene : IRenderable
    {
        // RectangleShape shape;
        // protected RenderWindow window;

        // public AbstractGameScene(RenderWindow window)
        public AbstractGameScene()
        {
            // this.window = window;
            // shape = new SFML.Graphics.RectangleShape(new Vector2f(100.0f, 100.0f))
            // {
            //     FillColor = SFML.Graphics.Color.Blue
            // };
        }

        public abstract void Render(RenderWindow window);
        public abstract void OnClick(object sender, MouseButtonEventArgs arg);

        public void dispatchEvent(string type, object sender, object arg) {
            if (type == "click") {
                this.OnClick(sender, (MouseButtonEventArgs)arg);
            }
        }
    }
}
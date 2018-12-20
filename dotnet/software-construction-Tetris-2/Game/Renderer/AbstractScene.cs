using System;
using SFML;
using SFML.System;
using SFML.Window;
using SFML.Graphics;


namespace Game
{
    public abstract class AbstractScene : IRenderable
    {
        // RectangleShape shape;
        // protected RenderWindow window;

        // public AbstractScene(RenderWindow window)
        public AbstractScene() {}

        public abstract void Mount(RenderWindow window);
        public abstract void Render(RenderWindow window);
        public abstract void UnMount(RenderWindow window);

    }
}
using SFML.Graphics;

namespace Game
{
    public interface IRenderable
    {
        // RenderWindow window {get;}
        void Render(RenderWindow window);
    }
}
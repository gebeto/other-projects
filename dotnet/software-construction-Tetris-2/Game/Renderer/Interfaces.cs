using SFML.Graphics;

namespace Game
{
    public interface IRenderable
    {
        void Mount(RenderWindow window);
        void Render(RenderWindow window);
        void UnMount(RenderWindow window);
    }
}
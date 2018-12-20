using System;
using System.Linq;
using System.Collections.Generic;
using SFML;
using SFML.System;
using SFML.Window;
using SFML.Graphics;

namespace Game
{
    public class GameMenuScene : AbstractScene
    {
        GameMenu menu;

        public GameMenuScene()
        {
            menu = new GameMenu();
        }

        public GameMenuScene(GameMenu menu)
        {
            this.menu = menu;
        }

        override public void Mount(RenderWindow window)
        {
            window.KeyPressed += this.OnKeyPress;
            this.menu.reconfigure((Vector2f) window.Size);
        }

        override public void UnMount(RenderWindow window)
        {
            window.KeyPressed -= this.OnKeyPress;
        }

        override public void Render(RenderWindow window)
        {
            for (int i = 0; i < menu.items.Count; i++)
            {
                var item = menu.items[i];
                if (item.text != null) {
                    if (menu.activeItem == i) {
                        item.text.OutlineThickness = 5;
                    } else {
                        item.text.OutlineThickness = 0;
                    }
                    window.Draw(item.text);
                }
            }
        }

        private void OnKeyPress(object sender, KeyEventArgs e)
        {
            switch (e.Code)
            {
                case SFML.Window.Keyboard.Key.S:
                case SFML.Window.Keyboard.Key.Down:
                    menu.next();
                    break;
                case SFML.Window.Keyboard.Key.W:
                case SFML.Window.Keyboard.Key.Up:
                    menu.prev();
                    break;
                case SFML.Window.Keyboard.Key.Enter:
                case SFML.Window.Keyboard.Key.Space:
                    menu.change();
                    break;
                default:
                    break;
            }
        }
    }
}
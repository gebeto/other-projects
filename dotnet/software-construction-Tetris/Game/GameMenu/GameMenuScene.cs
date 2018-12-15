using System;
using System.Linq;
using System.Collections.Generic;
using SFML;
using SFML.System;
using SFML.Window;
using SFML.Graphics;

namespace Game
{
    class GameMenuItemScene {
        public Text text;
        public GameMenuItem item;
        public FloatRect rect;
        public bool active;
    }

    public class GameMenuScene : AbstractGameScene
    {
        GameMenu menu;
        List<GameMenuItemScene> menuItems = new List<GameMenuItemScene>();
        bool settuped = false;

        public GameMenuScene()
        {
            menu = new GameMenu();
        }

        public GameMenuScene(GameMenu menu)
        {
            this.menu = menu;
        }

        private void setup(RenderWindow window)
        {
            if (settuped) return;
            settuped = true;

            for (int i = 0; i < menu.items.Count; i++)
            {
                var item = menu.items[i];
                Text text = new Text(item.title, GameContent.TetrisFont, 50);
                text.Position = new Vector2f(
                    window.Size.X / 2,
                    window.Size.Y / 2 - menu.items.Count / 2 * 50 + (i * 50)
                );
                FloatRect rect = text.GetLocalBounds();
                text.Origin = new Vector2f(rect.Width / 2, rect.Height / 2);
                text.OutlineColor = Color.Red;

                text.FillColor = SFML.Graphics.Color.White;
                this.menuItems.Add(new GameMenuItemScene() {
                    text = text,
                    item = item,
                    rect = rect,
                    active = false
                });
            }
        }

        override public void Render(RenderWindow window)
        {
            this.setup(window);
            Vector2i m = Mouse.GetPosition(window);
            
            foreach (var item in this.menuItems)
            {
                if (
                    m.X > item.text.Position.X - item.rect.Width / 2
                    &&
                    m.X < item.text.Position.X + item.rect.Width
                    &&
                    m.Y > item.text.Position.Y - item.rect.Height / 2
                    &&
                    m.Y < item.text.Position.Y + item.rect.Height
                )
                {
                    item.active = true;
                    item.text.OutlineThickness = 5;
                } else {
                    item.active = false;
                    item.text.OutlineThickness = 0;
                }
                window.Draw(item.text);
            }
        }

        override public void OnClick(object sender, MouseButtonEventArgs arg) {
            GameMenuItemScene[] activeitem = this.menuItems.Where(item => item.active == true).ToArray();
            Console.WriteLine("Adasdasd {0}", activeitem.Count());
            if (activeitem.Count() > 0) {
                activeitem.First().item.select();
            }
        }
    }
}
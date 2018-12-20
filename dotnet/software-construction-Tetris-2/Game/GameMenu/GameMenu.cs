using System;
using System.Collections.Generic;
using SFML;
using SFML.Graphics;
using SFML.Window;
using SFML.System;


namespace Game
{
    public class GameMenu
    {
        public event GameMenuItemChangedHandler onChange;

        public int activeItem {get; private set;}
        public List<GameMenuItem> items;

        public GameMenu() {
            this.items = new List<GameMenuItem>();
            this.activeItem = 0;
        }

        public void reconfigure(Vector2f bounds) {
            for (var i = 0; i < items.Count; i++)
            {
                GameMenuItem item = items[i];
                Text text = new Text(item.title, GameContent.TetrisFont, 50);
                text.Position = new Vector2f(
                    bounds.X / 2,
                    bounds.Y / 2 - this.items.Count / 2 * 50 + (i * 50)
                );
                FloatRect rect = text.GetLocalBounds();
                text.Origin = new Vector2f(rect.Width / 2, rect.Height / 2);
                text.OutlineColor = Color.Red;

                text.FillColor = SFML.Graphics.Color.White;
                item.text = text;
            }
        }

        public void next()
        {
            if (this.activeItem == this.items.Count - 1) {
                this.activeItem = 0;
            } else {
                this.activeItem++;
            }
        }

        public void prev()
        {
            if (this.activeItem == 0) {
                this.activeItem = this.items.Count - 1;
            } else {
                this.activeItem--;
            }
        }

        public void change() {
            var active = this.items[this.activeItem];
            active.select();
            if (this.onChange != null)
            {
                this.onChange(this, new GameMenuItemChangedArgs(active));
            }
        } 
    }
}
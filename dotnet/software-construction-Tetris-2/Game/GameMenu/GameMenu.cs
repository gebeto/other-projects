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

        private int highlighted; 
        public int activeItem {get; private set;}
        public List<GameMenuItem> items;

        public GameMenu() {
            this.items = new List<GameMenuItem>();
            this.activeItem = 0;
            this.highlighted = this.activeItem;
            Keyboard.onPress += (KeyboardKey key) => {
                switch (key)
                {
                    case KeyboardKey.Enter:
                        this.activeItem = this.highlighted;
                        this.items[this.activeItem].select();
                        this.change();
                        break;

                    case KeyboardKey.Up:
                        this.highlighted--;
                        break;

                    case KeyboardKey.Down:
                        this.highlighted++;
                        break;

                    default:
                        break;
                }

                if (this.highlighted >= this.items.Count)
                {
                    this.highlighted = 0;
                }
                else if (this.highlighted < 0)
                {
                    this.highlighted = this.items.Count - 1;
                }
            };
        }

        private void change() {
            if (this.onChange != null)
            {
                this.onChange(this, new GameMenuItemChangedArgs(this.items[this.activeItem]));
            }
        } 
    }
}
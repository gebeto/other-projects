using System;
using System.Collections.Generic;


namespace Game
{
    public class GameMenu
    {
        public event GameMenuItemChangedHandler onChange;

        private int highlighted; 
        public int activeItem {get; private set;}
        public List<GameMenuItem> items;
        public Canvas canvas;

        public GameMenu(GameScreen screen) {
            this.items = new List<GameMenuItem>();
            this.activeItem = 0;
            this.highlighted = this.activeItem;
            this.canvas = screen.canvas.createRelativeCanvas(1, 1, screen.canvas.width - 2, screen.canvas.height - 2);
            screen.drawing += this.draw;
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

        public void draw() {
            this.canvas.clear(ConsoleColor.Black);
            for (int i = 0; i < this.items.Count; i++)
            {
                if (this.highlighted == i) {
                    this.canvas.setFillColor(ConsoleColor.White);
                    this.canvas.setFontColor(ConsoleColor.Black);
                } else {
                    this.canvas.setFillColor(ConsoleColor.Black);
                    this.canvas.setFontColor(ConsoleColor.White);
                }
                
                string title = this.items[i].title;
                this.canvas.drawText(
                    this.canvas.width/2 - title.Length/2,
                    this.canvas.height/2 - this.items.Count/2 + i,
                    title
                );
                this.canvas.cursorTo(-1, -1);
            }
        }

        private void change() {
            if (this.onChange != null)
            {
                this.onChange(this, new GameMenuItemChangedArgs(this.items[this.activeItem]));
            }
        } 
    }
}
using System;
using System.Threading;
using SFML.Graphics;
using SFML.Window;
using SFML.System;

namespace Game
{
    class Program
    {

        static void Main(string[] args)
        {
            GameWindow game = new GameWindow();

            GameMenu menu = new GameMenu();
            menu.items.Add(new GameMenuItem("Start Game", 1, (object sender, GameMenuItemChangedArgs a) =>
            {
                Console.WriteLine("Clicked {0}", ((GameMenuItem)sender).title);
            }));
            menu.items.Add(new GameMenuItem("Exit", 2, (object sender, GameMenuItemChangedArgs a) =>
            {
                Console.WriteLine("Clicked {0}", ((GameMenuItem)sender).title);
                game.window.Close();
            }));
            GameMenuScene menuScene = new GameMenuScene(menu);

            game.SetScene(menuScene);
            game.Run();
        }
    }
}

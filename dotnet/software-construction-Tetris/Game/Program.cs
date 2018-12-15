using System;
using System.Threading;

namespace Game
{
    class Program
    {
        static void Main(string[] args)
        {
            Keyboard.StartMonitoring();
            Game game = new Game();

            // INIT GAME PLAY
            GameScreen playScreen = new GameScreen(20, 20);
            // GamePlay play = new GamePlay(playScreen);
            GamePlay play = new GamePlay(playScreen);

            // INIT MENU
            GameScreen menuScreen = new GameScreen(20, 20);
            GameMenu menu = new GameMenu(menuScreen);
            menu.items.Add(new GameMenuItem("Start game", 1));
            menu.items.Add(new GameMenuItem("Exit", 2));
            menu.items.Add(new GameMenuItem("Menu item 3", 3));
            menu.items.Add(new GameMenuItem("Menu item 4", 4));
            menu.items.Add(new GameMenuItem("Menu item 5", 5));
            menu.items.Add(new GameMenuItem("Menu item 6", 6));
            menu.items.Add(new GameMenuItem("Menu item 7", 7));
            menu.onChange += (object sender, GameMenuItemChangedArgs e) =>
            {
                Console.Clear();
                if (e.Item.key == 1)
                {
                    game.setActiveScreen(playScreen);
                }
                else if (e.Item.key == 2)
                {
                    game.setActiveScreen(null);
                }
            };

            game.setActiveScreen(menuScreen);
            Console.Clear();

            Thread t1 = new Thread(() =>
            {
                while (game.activeScreen != null)
                {
                    game.activeScreen.draw();
                    Thread.Sleep(1000);
                }
            });

            t1.Start();

            // Console.Clear();
            // while (game.activeScreen != null) {
            //     Thread.Sleep(1000);
            //     game.activeScreen.draw();
            // }
            // Console.Clear();
            // Console.WriteLine("End!");
            // Console.ReadKey();
        }
    }
}

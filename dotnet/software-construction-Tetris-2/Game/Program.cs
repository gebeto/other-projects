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
            GameWindow game = new GameWindow("Tetris");

            GamePlay gamePlay = new GamePlay();
            GamePlayScene gamePlayScene = new GamePlayScene(gamePlay);

            GameMenu menu = new GameMenu();
            GameMenuScene menuScene = new GameMenuScene(menu);
            menu.items.Add(new GameMenuItem("Start Game", 1, (object sender, GameMenuItemChangedArgs a) =>
            {
                game.SetScene(gamePlayScene);
            }));
            menu.items.Add(new GameMenuItem("Exit", 2, (object sender, GameMenuItemChangedArgs a) =>
            {
                game.window.Close();
            }));

            gamePlayScene.OnEsc += (object sender, EventArgs a) =>
            {
                game.SetScene(menuScene);
            };

            game.SetScene(menuScene);
            game.Run();
        }
    }
}

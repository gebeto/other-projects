using System;
using System.Threading;

namespace Game {
    public enum KeyboardKey {
        Up,
        Down,
        Left,
        Right,
        Enter,
        Space
    }

    public delegate void KeyboardKeyPress(KeyboardKey key);

    public class Keyboard {
        public static event KeyboardKeyPress onPress;

        public static void StartMonitoring() {
            Thread t = new Thread(() => {
                while (true)
                {
                    KeyboardKey key = Keyboard.readKey();
                    if (Keyboard.onPress != null) {
                        Keyboard.onPress(key);
                    }
                }
            });
            t.Start();
        }

        public static KeyboardKey readKey() {
            while (true) {
                ConsoleKeyInfo key = Console.ReadKey();
                int keyCode = key.Key.GetHashCode();
                if (keyCode == 13)
                {
                    return KeyboardKey.Enter;
                }
                else if (keyCode == 32)
                {
                    return KeyboardKey.Space;
                }
                else if (keyCode == 40 || keyCode == 83)
                {
                    return KeyboardKey.Down;
                }
                else if (keyCode == 38 || keyCode == 87)
                {
                    return KeyboardKey.Up;
                }
                else if (keyCode == 37 || keyCode == 65)
                {
                    return KeyboardKey.Left;
                }
                else if (keyCode == 39 || keyCode == 68)
                {
                    return KeyboardKey.Right;
                }
            }
        }
    }
}
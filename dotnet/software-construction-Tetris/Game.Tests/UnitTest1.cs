using System;
using Xunit;
using Game;


namespace MyGame.Tests
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            Assert.Equal(1, 1);
        }

        [Fact]
        public void MenuItemCorrectTitleTest()
        {
            GameMenuItem item = new GameMenuItem("Test case", 1);
            Assert.Equal("Test case", item.title);
        }

        [Fact]
        public void MenuItemCorrectKeyTest()
        {
            GameMenuItem item = new GameMenuItem("Test case", 1);
            Assert.Equal(1, item.key);
        }

        [Fact]
        public void MenuItemSelectTest()
        {
            GameMenuItem item = new GameMenuItem("Test case", 1);
            int clicked = 0;
            item.onSelect += (object sender, GameMenuItemChangedArgs args) =>
            {
                clicked++;
            };

            item.select();
            item.select();
            item.select();

            Assert.Equal(3, clicked);
        }
    }
}

using System;
using System.Collections.Generic;

namespace Game
{
    public class Canvas
    {
        public int width;
        public int height;
        private ConsoleColor fillColor;
        private ConsoleColor fontColor;

        public int _x;
        public int _y;

        public Canvas(int width, int height)
        {
            this._x = 0;
            this._y = 0;
            this.width = width;
            this.height = height;
            this.fillColor = ConsoleColor.Black;
            this.fontColor = ConsoleColor.White;
        }

        public Canvas createRelativeCanvas(int x, int y, int width, int height)
        {
            Canvas canvas = new Canvas(width, height);
            canvas._x = this._x + x;
            canvas._y = this._y + y;
            return canvas;
        }

        public Canvas addRelativeCanvas(int x, int y, Canvas canvas)
        {
            canvas._x = this._x + x;
            canvas._y = this._y + y;
            return this;
        }

        public Canvas setPosition(int x, int y)
        {
            this._x = x;
            this._y = y;
            return this;
        }

        public Canvas setFillColor(ConsoleColor color)
        {
            this.fillColor = color;
            return this;
        }

        public Canvas setFontColor(ConsoleColor color)
        {
            this.fontColor = color;
            return this;
        }

        public Canvas clear(ConsoleColor clearColor)
        {
            ConsoleColor color = this.fillColor;
            this
                .setFillColor(clearColor)
                .fill(0, 0, this.width, this.height)
                .setFillColor(color);
            return this;
        }

        public Canvas cursorTo(int x, int y)
        {
            Console.SetCursorPosition(_x + x, _y + y);
            return this;
        }

        public Canvas drawText(int x, int y, string text)
        {
            Console.BackgroundColor = this.fillColor;
            Console.ForegroundColor = this.fontColor;
            Console.SetCursorPosition(_x + x, _y + y);
            Console.Write(text);
            return this;
        }

        public Canvas drawPoint(int x, int y, string text = " ")
        {
            this.drawText(x, y, text);
            return this;
        }

        public Canvas drawVLine(int x, int y, int width)
        {
            for (int i = 0; i < width - 1; i++)
                this.drawPoint(x + i, y);
            return this;
        }

        public Canvas drawHLine(int x, int y, int height)
        {
            for (int i = 0; i < height - 1; i++)
                this.drawPoint(x, y + i);
            return this;
        }

        public Canvas drawBox(int x, int y, int width, int height)
        {
            this.drawVLine(x, y, width + 1);
            this.drawHLine(x, y, height + 1);

            this.drawVLine(x, y + height - 1, width + 1);
            this.drawHLine(x + width - 1, y, height + 1);
            return this;
        }

        public Canvas fill(int x, int y, int width, int height)
        {
            for (int i = 0; i < height - 1; i++)
                for (int j = 0; j < width - 1; j++)
                    this.drawPoint(x + i, y + j);
            return this;
        }

    }
}
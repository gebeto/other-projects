﻿using System;

using OpenTK;
using OpenTK.Graphics.OpenGL;
using OpenTK.Input;

namespace net_graphics
{
    class Game : GameWindow
    {
        private float GameTime = 0;

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

            Title = "Hello OpenTK!";

            GL.ClearColor(Color.CornflowerBlue);
        }

        protected override void OnRenderFrame(FrameEventArgs e)
        {
            base.OnRenderFrame(e);
            GameTime += (float)e.Time;

            GL.Clear(ClearBufferMask.ColorBufferBit | ClearBufferMask.DepthBufferBit);

            /* The first thing we need to do is to tell OpenGL which direction we're looking at.
             * Because we'll be actually making something in 3D, the direction the camera faces is important. */
            Matrix4 modelview = Matrix4.LookAt(Vector3.Zero, Vector3.UnitZ, Vector3.UnitY);
            GL.MatrixMode(MatrixMode.Modelview);
            GL.LoadMatrix(ref modelview);


            /* Now we'll want to draw the triangle itself.
             * The first step is to tell OpenGL we want to draw something. We do this with the GL.Begin function.
             * This takes a single parameter, which is the drawing mode to use.
             * There are options to draw quadrilaterals, triangles, points, polygons, and "strips".*/
            // GL.Begin(PrimitiveType.Triangles);
            GL.Begin(PrimitiveType.Quads);


            /* Now that we've told it how we want to draw, we need to give it the vertices for our shape.
             * To do this, we use the GL.Vertex3 function. It takes three floats as coordinates for a single point in 3D space.*/
            GL.Color3(0.0f, 0.0f, 1.0f);
            GL.Vertex3(-1.0f, 1.0f, 3.0f);

            GL.Color3(1.0f, 0.0f, 0.0f);
            GL.Vertex3(1.0f, 1.0f, 3.0f);

            GL.Color3(0.0f, 1.0f, 0.0f);
            GL.Vertex3(1.0f, -1.0f, 3.0f);

            GL.Color3(0.0f, 1.0f, 0.0f);
            GL.Vertex3(-1.0f, -1.0f, 3.0f);


            GL.End();

            Keyboard.KeyDown += this.keyDown;
            SwapBuffers();
        }

        protected void keyDown<KeyPressEventArgs>(object sender, KeyPressEventArgs args)
        {
            Console.WriteLine("HEY {0}");
        }

        protected override void OnResize(EventArgs e)
        {
            /* OpenGL needs to be told how to adjust for the new window size, so we need some code that handles it. */
            base.OnResize(e);

            GL.Viewport(ClientRectangle.X, ClientRectangle.Y, ClientRectangle.Width, ClientRectangle.Height);

            Matrix4 projection = Matrix4.CreatePerspectiveFieldOfView((float)Math.PI / 4, Width / (float)Height, 1.0f, 64.0f);
            GL.MatrixMode(MatrixMode.Projection);
            GL.LoadMatrix(ref projection);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            Game game = new Game();
            game.Run(30.0);
        }
    }
}

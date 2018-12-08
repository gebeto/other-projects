package com.company;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Vector;

import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import java.awt.Font;
import java.awt.Point;


class Point {
    public int x;
    public int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}


class Plate {
    int x;
    int y;
    int width;
    int height;
    int gridSize;
    int pixelSizeX;
    int pixelSizeY;

    int centerX;
    int centerY;

    Plate(int x, int y, int width, int height, int gridSize) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.pixelSizeX = width / gridSize;
        this.pixelSizeY = height / gridSize;

        this.centerX = x + width / 2;
        this.centerY = y + height / 2;
    }

    public void draw(Graphics grphcs) {
        Graphics2D g2 = (Graphics2D) grphcs;
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        drawGrid(g2);
        drawAxis(g2);
    }

    private void drawGrid(Graphics2D g2) {
        Color c = g2.getColor();
        g2.setColor(Color.LIGHT_GRAY);
        for (int i = 0; i < gridSize; i++) {
            for (int j = 0; j < gridSize; j++) {
                g2.drawRect(x + i * pixelSizeX, y + j * pixelSizeY, pixelSizeX, pixelSizeY);
            }
        }
        g2.setColor(c);
    }

    private void drawAxis(Graphics2D g2) {
        Color c = g2.getColor();
        g2.setColor(Color.BLACK);

        // X
        g2.drawLine(x, y + height / 2, x + width, y + height / 2);// main
        g2.drawLine(x + width, y + height / 2, x + width - 5, y + height / 2 - 3);// main
        g2.drawLine(x + width, y + height / 2, x + width - 5, y + height / 2 + 3);// main
        
        // Y
        g2.drawLine(x + width / 2, y, x + width / 2, y + height);// main
        g2.drawLine(x + width / 2, y, x + width / 2 - 3, y + 5);// main
        g2.drawLine(x + width / 2, y, x + width / 2 + 3, y + 5);// main

        g2.setColor(c);
    }

    public Point getCoord(int x, int y) {
        return new Point(centerX + (x * pixelSizeX), centerY + (-y * pixelSizeY));
    }

    public Point getCoord(Point p) {
        return new Point(centerX + (p.x * pixelSizeX), centerY + (-p.y * pixelSizeY));
    }

    public void drawLine(Graphics g, int xFrom, int yFrom, int xTo, int yTo) {
        Point xy1 = this.getCoord(xFrom, yFrom);
        Point xy2 = this.getCoord(xTo, yTo);
        g.drawLine(xy1.x, xy1.y, xy2.x, xy2.y);
    }

    public void drawTriangle(Graphics g, TriangleShape t) {
        Point a = this.getCoord(t.point1.x, t.point1.y);
        Point b = this.getCoord(t.point2.x, t.point2.y);
        Point c = this.getCoord(t.point3.x, t.point3.y);
        g.fillPolygon(new int[] { a.x, b.x, c.x }, new int[] { a.y, b.y, c.y }, 3);
    }
}

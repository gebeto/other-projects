package com.company;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.util.List;
import java.util.ArrayList;
import java.awt.Point;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

import java.awt.Font;
import java.awt.Point;

class TriangleShape {
    Point point1;
    Point point2;
    Point point3;

    public TriangleShape(Point point1, Point point2, Point point3) {
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
    }
}

class GraphPanel extends JPanel {
    private Plate plate;
    private List<TriangleShape> triangles;

    public GraphPanel() {
        super();
        this.plate = new Plate(50, 25, 400, 400, 40);
        this.triangles = new ArrayList<TriangleShape>();
    }

    @Override
    public void paint(Graphics graphics) {
        super.paint(graphics);

        this.plate.draw(graphics);

        for (TriangleShape shape : this.triangles) {
            Point coord1 = shape.point1;
            Point coord2 = shape.point2;
            Point coord3 = shape.point3;

            this.plate.drawLine(graphics, coord1.x, coord1.y, coord2.x, coord2.y);
            this.plate.drawLine(graphics, coord2.x, coord2.y, coord3.x, coord3.y);
            this.plate.drawLine(graphics, coord3.x, coord3.y, coord1.x, coord1.y);
        }
    }

    public void addTriangle(Point p1, Point p2, Point p3) {
        this.triangles.add(new TriangleShape(p1, p2, p3));
        repaint();
    }

    public void resetShapes() {
        this.triangles.clear();
        repaint();
    }
}

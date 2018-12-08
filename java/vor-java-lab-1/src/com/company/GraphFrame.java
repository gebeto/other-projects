package com.company;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
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


class GraphFrame extends JFrame {
    public GraphFrame() {
        super();
        setTitle("Lab 1");
        setBounds(50, 50, (int) Main.WIDTH, (int) Main.HEIGHT);
        setResizable(false);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Меню
        setLayout(new BorderLayout());
        final GraphPanel gp = new GraphPanel();
        JMenuBar mb = new JMenuBar();
        JMenu graph = new JMenu("Меню");

        JMenuItem paint = new JMenuItem("Додати трикутник");
        paint.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                gp.addTriangle(
                    new Point(20 - (int) (Math.random() * 40), 20 - (int) (Math.random() * 40)),
                    new Point(20 - (int) (Math.random() * 40), 20 - (int) (Math.random() * 40)),
                    new Point(20 - (int) (Math.random() * 40), 20 - (int) (Math.random() * 40))
                );
            }
        });
        graph.add(paint);

        JMenuItem reset = new JMenuItem("Очистити");
        reset.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                gp.resetShapes();
            }
        });
        graph.add(reset);

        mb.add(graph);
        add(mb, BorderLayout.NORTH);
        add(gp, BorderLayout.CENTER);
    }
}
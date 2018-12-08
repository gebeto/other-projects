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
import java.util.List;
import java.util.ArrayList;


public class Main
{
    public static final double WIDTH = 500;
    public static final double HEIGHT = 500;

    public static void main(String[] args)
    {
        final GraphFrame frame = new GraphFrame();
        frame.setVisible(true);
    }
}
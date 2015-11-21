+++
date = "2015-11-19T12:33:13-07:00"
levels = []
tags = ["Array", "Matrix", "Math"]
title = "Find if Two Rectangles Overlap"
topics = ["Geeks for Geeks", "Amazon", "Algorithm"]
banner = "/media/geeks.png"
+++

Given two rectangles, find if the given two rectangles overlap or not. Note that a rectangle can be represented by two coordinates, top left and bottom right. So mainly we are given following four coordinates.

- l1: Top Left coordinate of first rectangle.
- r1: Bottom Right coordinate of first rectangle.
- l2: Top Left coordinate of second rectangle.
- r2: Bottom Right coordinate of second rectangle.

<!--more-->

```java
class Rectangle{
	Point topLeft;
	Point rightBottom;
	public Rectangle(Point topLeft, Point rightBottom){
		this.topLeft = topLeft;
		this.rightBottom = rightBottom;
	}
}
class Point{
	int x;
	int y;
}
```

## Solution
```java
public class Solution{
	public boolean overlapRectangle(Rectangle r1, Rectangle r2) {
		// If one rectangle is on left side of other
		if (r1.rightBottom.x >= r2.topLeft.x || r1.topLeft.x >= r2.rightBottom.x)
		    return false;	

		// If one rectangle is above other
		if (r1.rightBottom.y >= r2.topLeft.y || r2.rightBottom.y >= r1.topLeft.y)
		    return false;
		 
		return true;
	}
}
```

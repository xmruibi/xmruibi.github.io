+++
date = "2015-11-13T23:50:13-07:00"
levels = []
tags = ["Heap", "Comparable"]
title = "K Nearest Points"
topics = ["Career Cup", "Amazon","Algorithm"]
banner = "/media/amazon.png"
+++

Find K nearest Points by given the central point. Complete the class design for Point as implementing Comparable interface.
<!--more-->

## Think
- Implement a Point class with Comparable interface, we can save the distance between the central point in each point and for its `compareTo` function
- Max heap to save space, since we only need k space for max heap. The top of heap is the node has the larest distance in these k nearest node. So once we got point near to the central than it, we poll the top and add the new one.

## Solution
```java
public class KNearestPoints {

	// finding k nearest neighbor from the original point using a MAX heap, each
	// time if the dist is less than the MAX we put it into the q.
	public Collection<Point> getClosestPoints(Collection<Point> points, int k) {
		PriorityQueue<Point> queue = new PriorityQueue<Point>(k);
		int i = 0;
		for(Point p:points) {
			if(i < k) {
				queue.add(p);
			}else{
				if(p.compareTo(queue.peek()) < 0) {
					queue.poll();
					queue.offer(p);
				}
			}
			i++;
		}
		return queue;
	}
}

class Point implements Comparable<Point> {
	final int x, y;
	final double dist;

	public Point(int x, int y, Point origin) {
		this.x = x;
		this.y = y;
		this.dist = Math.hypot(x - origin.x, y - origin.y);
	}

	@Override
	public int compareTo(Point o) {
		return Double.compare(this.dist, o.dist);
	}

	@Override
	public String toString() {
		return "x: " + x + " y: " + y;
	}
}

```
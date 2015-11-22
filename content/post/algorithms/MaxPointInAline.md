+++
date = "2015-11-15T12:43:13-07:00"
levels = ["Medium"]
tags = ["Matrix", "Math", "Array"]
title = "Max Points on a Line"
topics = ["Career Cup", "Algorithm"]
banner = "/media/google.jpg"
+++


Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.
<!--more-->
## Think 
- Represent line by ratio. Compare point to point by a nested two loop.
- Think about four cases:
	- Same point, count the same point amount
	- `x` axis are the same
	- `y` axis are the same
	- normal case `(y1 - y2)/(x1 - x2)`


## Solution
```java
public class MaxPointOnAline {

	public int getMaxLine(List<FloatPoint> points) {
		if (points == null || points.size() == 0)
			return 0;

		int max = 0;
		for (int i = 0; i < points.size(); i++) {
			FloatPoint cur = points.get(i);
			Map<Double, Integer> map = new HashMap<>();
			int same = 0, localMax = 1;
			for (int j = i + 1; j < points.size(); j++) {
				FloatPoint tar = points.get(j);
				if (cur.x == tar.x && cur.y == tar.y) {
					same++;
				}else if (cur.x == tar.x) {
					double maxr = Double.MAX_VALUE;
					map.put(maxr, map.containsKey(maxr) ? map.get(maxr) + 1 : 2);
				} else if (cur.y == tar.y) {
					map.put(0.0, map.containsKey(0.0) ? map.get(0.0) + 1 : 2);
				} else {
					double ratio = (cur.y - tar.y) / (cur.x - tar.x);
					map.put(ratio, map.containsKey(ratio) ? map.get(ratio) + 1
							: 2);
				}
			}
			for (Map.Entry<Double, Integer> entry : map.entrySet())
				localMax = Math.max(localMax, entry.getValue());
			max = Math.max(localMax + same, max);
		}
		return max;
	}
}

class FloatPoint {
	float x, y; // float may not suitable for accurate computation

	public FloatPoint(int x, int y) {
		this.x = x;
		this.y = y;
	}
}
```
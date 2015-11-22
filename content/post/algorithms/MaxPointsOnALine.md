+++
date = "2015-10-18T20:43:13-07:00"
levels = []
tags = ["Hash Table", "Math"]
title = "Max Points on a Line"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++


Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.
<!--more-->

### Example
Given 4 points: `(1,2)`, `(3,6)`, `(0,0)`, `(1,3)`.

The maximum number is `3`.

## Solution

- Use one point as a baseline. (`Point pa`)
- Iterate other points (`Point pb`) (index greater than `pa`): `j = i + 1` and
- Use Hash Map to record the ratio and count
- Note:
	- Ratio is `double radio = (double)(pa.y - pb.y) / (double)(pa.x - pb.x)`;
	- When pa.x == pb.x && pa.y == pb.y, consider two points are the same, also need to count the same point. 
	- When only `pa.x == pb.x`, that means the ratio is infinity as `(double)Integer.MAX_VALUE`;
	- When only `pa.y == pb.y`, that means the ratio is zero;
- Iterate Hash Map and get the local max with updating the global max;

```
public class Solution {
    /**
     * @param points an array of point
     * @return an integer
     */
    public int maxPoints(Point[] points) {
        if(points == null || points.length == 0)
            return 0;
        
       
        int maxLine = 0;
        for(int i = 0; i < points.length; i++) {
            Map<Double, Integer> map = new HashMap<>();
            Point pa = points[i];
            int same = 0;
            for(int j = i + 1; j < points.length; j++) {
                    Point pb = points[j];
                    int cnt = 0;
                    if(pa.x == pb.x && pa.y == pb.y)
                        same ++;
                    else if(pa.x == pb.x) {
                        map.put((double)Integer.MAX_VALUE, map.containsKey((double)Integer.MAX_VALUE)?map.get((double)Integer.MAX_VALUE) + 1 : 2);
                    }else if(pa.y == pb.y)
                        map.put((double)0, map.containsKey((double)0)?map.get((double)0) + 1 : 2);
                    else{
                        double radio = (double)(pa.y - pb.y) / (double)(pa.x - pb.x);
                        map.put(radio, map.containsKey(radio)?map.get(radio) + 1 : 2);
                    }
            }
            int localMax = 1;
            for (Integer value : map.values())   
                localMax = Math.max(localMax, value);
            localMax += same;  
            maxLine = Math.max(maxLine, localMax); 
        }
        
        return maxLine;
    }
}
```
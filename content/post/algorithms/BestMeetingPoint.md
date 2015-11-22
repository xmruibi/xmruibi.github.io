+++
topics = ["Leetcode","Algorithm"]
date = "2015-11-03T23:10:29-07:00"
levels = ["Medium"]
tags = ["Sort"]
title = "Best Meeting Point"
banner = "/media/leetcode.png"
+++

A group of two or more people wants to meet and minimize the total travel distance. You are given a 2D grid of values 0 or 1, where each 1 marks the home of someone in the group. The distance is calculated using Manhattan Distance, where distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|.
<!--more-->
For example, given three people living at (0,0), (0,4), and (2,2):

```
        1 - 0 - 0 - 0 - 1
        |   |   |   |   |
        0 - 0 - 0 - 0 - 0
        |   |   |   |   |
        0 - 0 - 1 - 0 - 0
```
The point (0,2) is an ideal meeting point, as the total travel
distance of 2+2+2=6 is minimal. So return 6.





## Think
- Find all `x` and `y` coordinate if value is `1`
- Each x value and y value should minus the median value so that it can get the distance to the median value.


## Solution
```java
public class Solution {
    public int minTotalDistance(int[][] grid) {
        if(grid == null || grid.length == 0)
            return 0;
        List<Integer> xlist = new ArrayList<>();
        List<Integer> ylist = new ArrayList<>();
        for(int i = 0; i < grid.length; i++) {
            for(int j = 0; j < grid[0].length; j++) {
                if(grid[i][j] == 1) {
                    xlist.add(i);
                    ylist.add(j);
                }
            }
        }
        
        int sum = 0;
        // xlist doesn't need sort since it already sorted
        for(Integer xval : xlist) 
            sum += xval - xlist.get(xlist.size()/2);
        // ylist need sort
        Collections.sort(ylist)
        for(Integer yval : ylist) 
            sum += yval - ylist.get(ylist.size()/2);
        
        return sum;
    }
}
```
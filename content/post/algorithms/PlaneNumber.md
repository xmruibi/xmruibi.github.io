+++
date = "2015-10-19T22:43:13-07:00"
levels = []
tags = ["Interval Problem", "Array"]
title = "Number of Airplanes in the Sky"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Given an interval list which are flying and landing time of the flight. How many airplanes are on the sky at most?
<!--more-->

### Example
For interval list `[[1,10],[2,3],[5,8],[4,7]]`, return `3`

### Note
If landing and flying happens at the same time, we consider landing should happen at first.


## Think #1
- Array Method (Naive):
	- Use an integer array to count segment occurence. 

## Solution
``` java
class Solution {
    /**
     * Array Method:
     * @param intervals: An interval array
     * @return: Count of airplanes are in the sky.
     */
    public int countOfAirplanes(List<Interval> airplanes) { 
        
        // find the min and max value in interval list;
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        for(Interval interval : airplanes) {
            min = Math.min(min, interval.start);
            max = Math.max(max, interval.end);
        }

        int maxCnt = 0;
        int[] segment = new int[max - min + 1];
        for(Interval interval : airplanes) {
            for(int i = interval.start; i < interval.end; i++) {
                segment[i - min]++;
                maxCnt = Math.max(maxCnt, segment[i - min]);
            }
        }
        return maxCnt;
    }
}
```

## Think #2
- Customized Structure: 
	- Point Class: mark `int time` and (`boolean start/end`).
	- Mark those Points ordered by time.
	- One pass all points and count increase when touch start but decrease when end;

## Solution
```java
class Solution {
    /**
     * Point Method:
     * @param intervals: An interval array
     * @return: Count of airplanes are in the sky.
     */
    public int countOfAirplanes(List<Interval> airplanes) { 

    	// create a list with point class
    	List<Point> points = new ArrayList<>();
    	for(Interval interval : airplanes) {
    		points.add(new Point(interval.start, 1));
    		points.add(new Point(interval.end, 0));
    	}

    	// sort
    	Collections.sort(points, new Comparator<Point>(){
    	    @Override
    	    public int compare(Point p1, Point p2) {
    	         if(p1.time == p2.time) return p1.flag - p2.flag;
                 else return p1.time - p2.time;
    	    }
    	});

    	// one pass for count
    	int count = 0;
    	int max = 0; // record the peak count;
    	for(Point p : points) {
    		if(p.flag == 1)
    			count++;
    		else
    			count--;
    		max = Math.max(max, count);
    	}

    	return max;
	}

	private class Point{
		int time;
		int flag;
		public Point(int time, int flag) {
			this.time = time;
			this.flag = flag;
		}
	}
}
```



## Complexity Analysis:
- Array Method (Naive):

Two pass and one of pass has one more inner loop (segment size: k): o(n + n*k) -> O(n^2);
An array to store occurence frequence: Space: O(n);


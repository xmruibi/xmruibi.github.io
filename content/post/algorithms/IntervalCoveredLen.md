+++
date = "2015-11-14T00:30:13-07:00"
levels = []
tags = ["Interval"]
title = "Intervals and Covered Length"
topics = ["Career Cup","Algorithm"]
banner = "/media/leetcode.png"
+++

Design a structrue can get interval pair and a function which can return the total cover length.
<!--more-->

## Partial Code
```java
interface Intervals {

	/**
	 * Adds an interval [from, to] into internal structure.
	 */
	void addInterval(int from, int to);

	/**
	 * Returns a total length covered by intervals. If several intervals
	 * intersect, intersection should be counted only once. Example:
	 *
	 * addInterval(3, 6) addInterval(8, 9) addInterval(1, 5)
	 *
	 * getTotalCoveredLength() -> 6 i.e. [1,5] and [3,6] intersect and give a
	 * total covered interval [1,6] [1,6] and [8,9] don't intersect so total
	 * covered length is a sum for both intervals, that is 6.
	 *
	 * _________ ___ ____________
	 *
	 * 0 1 2 3 4 5 6 7 8 9 10
	 *
	 */
	int getTotalCoveredLength();
}
```

## Solution
```java
public class IntervalProblem implements Intervals {

	private class Interval {
		int from, to;

		public Interval(int from, int to) {
			this.from = from;
			this.to = to;
		}
	}

	List<Interval> list = new ArrayList<>();

	@Override
	public void addInterval(int start, int end) {
		if (list.size() == 0) {
			list.add(new Interval(start, end));
			return;
		}		

        ListIterator<Interval> li = list.listIterator();

        while(li.hasNext()){
            Interval itv = li.next();
            if(start <= itv.to){
                if(end < itv.from){ //newInterval does not overlap with current itv, time to insert
                    li.remove();
                    li.add(new Interval(start, end));
                    li.add(itv);
                    return;
                }
                // still some overlap so compare start & end
                start = Math.min(start, itv.from);
                end = Math.max(end, itv.to);
                li.remove();
            }
        }
		list.add(new Interval(start, end));
	}

	@Override
	public int getTotalCoveredLength() {
		if (list.size() == 0) 
			return 0;
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			sum += (list.get(i).to - list.get(i).from);
		}
		return sum;
	}
}
```

## Solution # Merge Interval
```java
	public List<Interval> merge(List<Interval> intervals) {

        if (intervals == null || intervals.size() <= 1)
            return intervals;

        // sort intervals by using self-defined Comparator
        Collections.sort(intervals, new IntervalComparator<Interval>((o1,o2) -> Integer.compare(o1.start, o2.start)));

        ArrayList<Interval> result = new ArrayList<Interval>();

        Interval prev = intervals.get(0);
        for (int i = 1; i < intervals.size(); i++) {
            Interval curr = intervals.get(i);

            if (prev.end >= curr.start) {
                // merged case
                Interval merged = new Interval(prev.start, Math.max(prev.end, curr.end));
                prev = merged;
            } else {
                result.add(prev);
                prev = curr;
            }
        }

        result.add(prev);

        return result;
    }
```
+++
date = "2015-11-18T12:43:13-07:00"
levels = ["Medium"]
tags = ["Array", "Queue", "Hash Map"]
title = "Process Schedule Problems"
topics = ["Amazon", "Algorithm"]
banner = "/media/careercup.jpg"
+++


Given the max size of a LRU cache and a input array, calculate the miss times.
<!--more-->


 ## Solution
```java
public class Solution{
	public int CacheMiss(int[] array, int size) {
		if(array == null)	
			return 0;
		Queue<Integer> cache = new LinkedList<Integer>();
		HashSet<Integer> hash = new HashSet<>();
		int count = 0;
		for (int i = 0; i < array.length; i++) {
			if(hash.contains(array[i])) {
				cache.remove(array[i]); // if hit it need to move it back, so remove here at first
			} else {
				count++; // miss, increse the count
			}
			cache.add(array[i]);
			hash.add(new Integer(array[i]));
			if (size == cache.size()) // over size, poll the first of queue
				cache.poll();
		}
		return count;
	}
}
```

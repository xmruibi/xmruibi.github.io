+++
date = "2015-11-13T19:43:13-07:00"
levels = ["Medium"]
tags = ["Binary Search", "Hash Map"]
title = "Two Sum Implementation"
topics = ["Career Cup", "Algorithm"]
banner = "/media/careercup.png"
+++

Finish a implementation for a interface where it store some data and returns true if there is any pair of numbers in the internal data structure which have sum @param val, and false otherwise.
<!--more-->
### Given Code
```java
public interface TwoSum {
    /**
     * Stores @param input in an internal data structure.
     */
    void store(int input);
    /**
     * Returns true if there is any pair of numbers in the internal data structure which
     * have sum @param val, and false otherwise.
     * For example, if the numbers 1, -2, 3, and 6 had been stored,
     * the method should return true for 4, -1, and 9, but false for 10, 5, and 0
     */
    boolean test(int val);
}
```

## Think
- Two Sum problem has two way to solve
	- Sort strategy (O(nlogn) time, O(1) space);
	- Set strategy (O(n) time, O(n) space);


## Solution
```java
public class TwoSumProblem implements TwoSum{
	
	// thread not safe, use CopyOnWriteArrayList<E> for thread safe
	List<Integer> list;	
	// save the previous data for unnecessary duplicate computation
	HashSet<Integer> set;
	
	public TwoSumProblem() {
		list = new ArrayList<>();
		set = new HashSet<>();
	}
	
	@Override
	public void store(int input) {
		list.add(input);	
	}

	@Override
	public boolean test(int val) {
		if(set.contains(val))
			return true;
		return checkTwoSum(val);
	}

	// sort strategy (O(nlogn) time, O(1) space)
	private boolean checkTwoSum(int target){
		Collections.sort(list);
		int l = 0, r = list.size() - 1;
		while(l < r) {
			int sum = list.get(l) + list.get(r);
			if(sum == target){
				set.add(target);
				return true;
			}else if(sum < target)
				l++;
			else
				r--;
		}
		return false;
	}

	// set strategy (O(n) time, O(n) space)
	private boolean checkTwoSumII(int target){
		 int len = list.size();
	       Set<Integer> mem = new HashSet();
	        for(int i = 0; i < len; i++){
	            if ( mem.contains(target - list.get(i)) 
	            		return true;
	           else 
	        	   	mem.add(list.get(i));
	        }
	        return false;
	}
}
```
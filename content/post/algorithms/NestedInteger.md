+++
date = "2015-11-13T13:13:13-07:00"
levels = []
tags = ["Array", "Iterator"]
title = "Nested List"
topics = ["Career Cup","Algorithm"]
banner = "/media/careercup.png"
+++

Given a nested list of integers, returns the sum of all integers in the list weighted by their depth.
<!--more-->
### Partial Code
```java
/** 
 * This is the interface that represents nested lists. 
 * You should not implement it, or speculate about its implementation. 
 */ 
public interface NestedInteger { 
    // Returns true if this NestedInteger holds a single integer, rather than a nested list 
    public boolean isInteger(); 

    // Returns the single integer that this NestedInteger holds, if it holds a single integer 
    // Returns null if this NestedInteger holds a nested list 
    public Integer getInteger(); 

    // Returns the nested list that this NestedInteger holds, if it holds a nested list 
    // Returns null if this NestedInteger holds a single integer 
    public List getList(); 
}

public class Solution {
	public int depthSum(List<NestedInteger> input) {
        //Implement this function
    }
}
```

### Example
Given the list `{{1,1},2,{1,1}}` the function should return `10` (four 1's at depth 2, one 2 at depth 1);
Given the list `{1,{4,{6}}}` the function should return `27` (one 1 at depth 1, one 4 at depth 2, and one 6 at depth 3);

## Think
- Recursion with DFS

## Solution
```java
public class Solution {
	public int depthSum(List<NestedInteger> input) {
		return dfsHelper(input, 1);
    }

    private int dfsHelper(List<NestedInteger> input, int depth) {
    	int sum = 0;
    	for(NestedInteger cur : input) {
    		if(cur.isInteger())
    			sum += (cur.getInteger() * depth);
    		else
    			sum += dfsHelper(cur.getList(), depth + 1);
    	}
    	return sum;
    }
}
```
## Followup #1
Get the sum by reversed level.
#### Think
- Should get depth at first and then recursively reduce the depth for DFS

```java
	public static int reversedDepthSum(List<NestedInteger> input) {
		int depth = getDepth(input);
		return dfsReverseHelper(input, depth);
	}

	private static int dfsReverseHelper(List<NestedInteger> input, int depth) {
		int sum = 0;
		for (NestedInteger cur : input) {
			if (cur.isInteger())
				sum += (cur.getInteger() * depth);
			else
				sum += dfsReverseHelper(cur.getList(), depth - 1);
		}
		return sum;
	}
	
	private static int getDepth(List<NestedInteger> input) {
		int depth = 0;
		for (NestedInteger cur : input) {
			if (!cur.isInteger())
				depth = Math.max(depth, getDepth(cur.getList()));
		}
		return depth + 1;
	}
```


## Followup #2
Implement the Nested Integer interface

```java
public class NestedIntImpl implements NestedInteger {
	Object obj;

	public NestedIntegerImpl(Object obj) {
		this.obj = obj;
	}

	@Override
	public boolean isInteger() {	
		return obj instanceof Integer;
	}

	@Override
	public Integer getInteger() {
		if(obj instanceof Integer)
			return (Integer)obj;
		return null;
	}

	@Override
	public List<NestedInteger> getList() {
		if(obj instanceof List)
			return (List<NestedInteger>)obj;
		return null;
	}
}
```






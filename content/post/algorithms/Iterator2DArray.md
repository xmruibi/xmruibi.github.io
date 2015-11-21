+++
topics = ["Algorithm"]
date = "2015-09-28T10:10:29-07:00"
levels = ["Leetcode","Medium"]
tags = ["Iterator", "Matrix"]
title = "Iterator of 2-D Array"
banner = "/media/leetcode.png"
+++

Set up a iterator to iterate a 2-dimensional array.
<!--more-->

By given the following code, finish all class:
```java
public class DeepIterator{
    
    public DeepIterator(int[][] listOfLists){
	    ...
	}
	
	...
	public static void main(String[] args) {
        int[][] listOfLists = {
          {},{},{1,2,3},{},{},{2,3,4}
        };
        DeepIterator it = new DeepIterator(listOfLists);
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
}
```

## Think 
- Iterate the 2-D array by `x` and `y`.
- Record current element during `hasNext()` function.
- Check the row if it is null.

## Solution
```java
public class DeepIterator{
	int cur; // this is important
	int row = 0, col = 0;

	int[][] listOfLists;

	public DeepIterator(int[][] listOfLists){
		if(listOfLists == null)
			throw new IllegalArgumentException("Null Input");
		this.listOfLists = listOfLists;
	}

	public Integer next(){
		return cur;
	}

	public boolean hasNext(){
	    // make sure the row is not null
		while(row < listOfLists.length && col >= listOfLists[row].length) {
				row ++; col = 0;
		}
		if(row < listOfLists.length) {
			cur = listOfLists[row][col++];
			return true;
		}else
			return false;
	}

	public static void main(String[] args) {
        int[][] listOfLists = {
          {},{},{1,2,3},{},{},{2,3,4}
        };
        DeepIterator it = new DeepIterator(listOfLists);
        while(it.hasNext()){
          System.out.println(it.next());
        }
    }
}
```
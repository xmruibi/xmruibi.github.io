+++
date = "2015-11-19T12:43:13-07:00"
levels = ["Medium"]
tags = ["Array"]
title = "Game of Life"
topics = ["Leetcode","Amazon", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given an array which represents a group of cells, their states are changing everyday according to some rule.
<!--more-->
## Problem I
The following rules is for rule one:
- if the cell has the same numbers on its two sides, set it as `0`;
- if the cell has the different numbers on its two sides, set it as `0`;

### Example
```
cell: (0)[1, 0, 0, 0, 0, 1, 0, 0](0)
days1: [0, 1, 0, 0, 1, 0, 1, 0]
```

## Solution
```java
public class Solution{
	public int[] cellChange(int[] arr, int days) {
		for(int i = 0; i < days; i++)
			changeHelper(arr);
		return arr;
	}

	private void changeHelper(int[] arr) {
		int bound = 0, prev = 0;
		for(int i = 0; i < arr.length; i++) {
			if(i == 0) {
				prev = arr[i];
				arr[i] = (bound == arr[1]?0:1);
			}else if(i == arr.length - 1) {
				arr[i] = (bound == prev?0:1);
			}else{
				int tmp = arr[i];
				arr[i] = (prev == arr[i+1]?0:1);
				prev = tmp;
			}
		}
	}
}
```

## Problem II
According to the Wikipedia's article: 
> The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

Given a board with m by n cells, each cell has an initial state live (1) or dead (0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by over-population..
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

Write a function to compute the next state (after one update) of the board given its current state.

### Follow-up
Could you solve it in-place? Remember that the board needs to be updated at the same time: You cannot update some cells first and then use their updated values to update other cells.
In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches the border of the array. How would you address these problems?







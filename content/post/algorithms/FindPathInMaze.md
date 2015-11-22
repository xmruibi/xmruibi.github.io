+++
date = "2015-11-19T12:33:13-07:00"
levels = []
tags = ["Array", "Matrix"]
title = "Find a Path in Maze"
topics = ["Career Cup", "Amazon", "Algorithm"]
banner = "/media/careercup.png"
+++

Find path in given 2D matrix. 3 states, `0` means allow to go, `1` means the obstacle, `9` is the final, return true or false if the path exist from `(0,0)` to any position contains `9`.


<!--more-->
## Solution
```java
public class Solution{
	private final static int[] sx = {-1, 0, 0, 1};
	private final static int[] sy = {0, 1, -1, 0};
	public boolean findPath(int[][] matrix) {
		if (matrix == null || matrix.length == 0 || matrix[0].length == 0)	
			return false;
		if (matrix[0][0] == 9)	
			return true;
		int m = matrix.length, n = matrix[0].length;
		Queue<int[]> queue = new LinkedList<int[]>();
		queue.offer(new int[]{0, 0});
		matrix[0][0] = 1;
		while (!queue.isEmpty()) {
			int[] cur = queue.poll();
			for (int i = 0; i < 4; i++) {
				int[] next = {cur[0] + sx[i], cur[1] + sy[i]};
				if (next[0] >= 0 && next[0] < m && next[1] >= 0 && next[1] < n) {
					if (matrix[next[0]][next[1]] == 9)
							return true;
					else if (matrix[next[0]][next[1]] == 0) {
						queue.offer(next);
						matrix[next[0]][next[1]] = 1; // set the previous passed position as no longer accessiable 
					}
				}
			}
		}
		return false;

	}
}
```
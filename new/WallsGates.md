+++
date = "2015-11-11T10:43:13-07:00"
levels = ["Easy"]
tags = ["Matrix", "DFS", "BFS"]
title = "Walls and Gates"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

You are given a m x n 2D grid initialized with these three possible values.

-1 - A wall or an obstacle.
0 - A gate.
INF - Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
<!--more-->
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.
For example, given the 2D grid:
```
    INF  -1  0  INF
    INF INF INF  -1
    INF  -1 INF  -1
      0  -1 INF INF
```
After running your function, the 2D grid should be:
```
    3  -1   0   1
    2   2   1  -1
    1  -1   2  -1
    0  -1   3   4
```

## Think
- It is very classic backtracking problem. 
- We can start from each gate (0 point), and searching for its neighbors. 
- We can either use DFS or BFS solution.
- Here I gave the BFS solution

## Solution
```java
	public static void wallsAndGates(int[][] rooms) {
		for (int i = 0; i < rooms.length; i++) {
			for (int j = 0; j < rooms[i].length; j++) {
				if (rooms[i][j] == 0)
					bfs(rooms, i, j, i, j, 0);
			}
		}
	}

	private static void bfs(int[][] rooms, int x, int y, int px, int py,
			int level) {

		if (rooms[x][y] >= 0) {
			if (rooms[x][y] < level)
				return;
			rooms[x][y] = level;
		} else
			return;

		int[] xs = { -1, 0, 0, 1 };
		int[] ys = { 0, 1, -1, 0 };
		for (int i = 0; i < 4; i++) {
			int nx = xs[i] + x;
			int ny = ys[i] + y;
			if (nx < 0 || nx >= rooms.length || ny < 0
					|| ny >= rooms[nx].length || (nx == px && ny == py))
				continue;
			bfs(rooms, nx, ny, x, y, level + 1);
		}
	}
```
+++
date = "2015-10-25T20:33:13-07:00"
levels = []
tags = ["Combination", "DFS"]
title = "Boggle Game"
topics = ["Algorithm"]
+++

Given a dictionary, a method to do lookup in dictionary and a M x N board where every cell has one character. Find all possible words that can be formed by a sequence of adjacent characters. Note that we can move to any of 8 adjacent characters, but a word should not have multiple instances of same cell.
<!--more-->
## Think 
- DFS on character board to do backtracking. 
- Searching the character for 8 directions.


## Solution
```java
public class Solution {

	public List<String> findWords(HashSet<String> dict, char[][] board) {
		List<String> res = new ArrayList<>();
		boolean[][] visited = new boolean[board.length][board[0].length];
		for(int i = 0; i < board.length; i++) {
			for(int j = 0; j < board[i].length; j++) {
				findUtil(res, dict, board, visited, "", i, j);
			}
		}
		return res;
	}

	private void findUtil(List<String> res, HashSet<String> dict, char[][] board, boolean[][] visited, String cur, int x, int y) {
		visited[x][y] = true;
		cur += board[x][y];

		if(dict.contains(cur)) {
			res.add(cur);
			dict.remvoe(cur);
			return;
		}
		
		int[] xs = {1,1,1,0,0,-1,-1,-1};
		int[] ys = {1,-1,0,1,-1,0,1,-1};
		for(int i = 0; i < 8; i++) {
			int nx = xs[i] + x;
			int ny = ys[i] + y;
			if(nx >= 0 && nx < board.length && ny >= 0 && ny < board[nx].length && !visited[nx][ny])
				findUtil(res, dict, board, visited, cur, nx, ny);
		}
		visited[x][y] = false;
		cur = cur.substring(0, cur.length() - 1);
	}

}
```
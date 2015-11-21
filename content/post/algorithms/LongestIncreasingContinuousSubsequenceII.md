+++
date = "2015-10-16T09:43:13-07:00"
levels = ["Medium"]
tags = ["Matrix", "Subsequence","DFS", "Dynamic Programming"]
title = "Longest Increasing Continuous Subsequence II"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++
Give you an integer matrix (with row size n, column size m)，find the longest increasing continuous subsequence in this matrix. (The definition of the longest increasing continuous subsequence here can start at any row or column and go up/down/right/left any direction).
<!--more-->
### Example
Given a matrix:
```
[
  [1 ,2 ,3 ,4 ,5],
  [16,17,24,23,6],
  [15,18,25,22,7],
  [14,19,20,21,8],
  [13,12,11,10,9]
]
```
return `25`

### Challenge
O(nm) time and memory.

## Solution:
- This is great question with DFS, Dynamic Problem and Subsequence idea.
- The idea is also simple. Recursively search by DFS while we can do some memorized stuff.
- Each time we figure out the maximum length with reversed increasing sequence from each element in matrix.
- Note that the searching is by decreasing way.



```
public class Solution {
    /**
     * @param A an integer matrix
     * @return  an integer
     */
    // memorized the local maximum length
    int[][] memo;

    boolean[] visited;
    int n ,m;

    // stepping way for dfs
    int[] dx = {1,-1,0,0}; 
    int[] dy = {0,0,1,-1};

    public int longestIncreasingContinuousSubsequenceII(int[][] A) {
        if(A.length == 0)
            return 0;
        n = A.length;
        m  = A[0].length;
        
        memo = new int[n][m];
        visited = new boolean[n*m];
        
        int res = 0;
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) { 
                memo[i][j] = helper(i, j, A);
                res = Math.max(res, memo[i][j]);
            }
        }
        return res;
    }
    
    private int helper(int x, int y, int[][] A) {
    	// once it touched the visited element, return that value
        if(visited[x * m + y])
            return memo[x][y];
        
        int res = 1; 
        for(int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            if(0<= nx && nx < n && 0<= ny && ny < m ) {
                // this is tricky point, we search by decreasing
                if( A[x][y] > A[nx][ny]) 
                    res = Math.max(res,  helper(nx, ny, A) + 1);
            }
        }
        visited[x * m + y] = true;
        memo[x][y] = res;
        return res;
    }
}
```
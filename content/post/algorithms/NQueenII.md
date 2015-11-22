+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-17T17:10:29-07:00"
levels = ["Medium"]
tags = ["Recursion", "Classical Problem", "Array"]
title = "N Queen II"
banner = "/media/leetcode.png"
+++

Follow up for N-Queens problem.

Now, instead outputting board configurations, return the total number of distinct solutions.
<!--more-->



```
class Solution {
    /**
     * Calculate the total number of distinct N-Queen solutions.
     * @param n: The number of queens.
     * @return: The total number of distinct solutions.
     */
    private int solutions = 0;
    public int totalNQueens(int n) {
        //write your code here
        int[] board = new int[n]; 
        recursion(board, 0);
        return solutions;
    }
    
    private void recursion(int[] board, int row) {
        // when valid solution found
        if(row == board.length) {
            solutions++;
            return;
        }
        // recursion
        for(int i = 0; i < board.length; i++) {
            board[row] = i;
            if(isSafe(board, row))
                recursion(board, row+1);
        }
            
    }
    
    private boolean isSafe(int[] board, int row) {
        for(int i = 0; i < row; i++) {
            if((board[i]==board[row]) || (Math.abs(i - row) == Math.abs(board[i] - board[row])))
                return false;
        }
        return true;
    }
};
```
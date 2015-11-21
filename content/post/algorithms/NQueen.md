+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-17T17:10:29-07:00"
levels = ["Medium"]
tags = ["Recursion", "Classical Problem", "Array"]
title = "N Queen I"
banner = "/media/leetcode.png"
+++


The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space respectively.
<!--more-->

### Example
There exist two distinct solutions to the 4-queens puzzle:
```
[

    [".Q..", // Solution 1

     "...Q",

     "Q...",

     "..Q."],

    ["..Q.", // Solution 2

     "Q...",

     "...Q",

     ".Q.."]

]
```
## Solution:
- Use one diamension int array to represent board: index -> num, value -> col;



```
class Solution {
    /**
     * Get all distinct N-Queen solutions
     * @param n: The number of queens
     * @return: All distinct solutions
     * For example, A string '...Q' shows a queen on forth position
     */
    ArrayList<ArrayList<String>> solveNQueens(int n) {
        ArrayList<ArrayList<String>> res = new ArrayList<>();
        int[] board = new int[n]; 
        recursion(res, board, 0);
        return res;
    }
    
    
    private void recursion(ArrayList<ArrayList<String>> res, int[] board, int row) {
        if(row == board.length) {
            // encode the board from 1-d array to string list
            ArrayList<String> cur = new ArrayList<>();
            for(int i = 0 ; i < board.length; i++){
                StringBuilder sb = new StringBuilder();
                for(int j = 0 ; j < board.length; j++) {
                    if(j == board[i])
                        sb.append("Q");
                    else
                        sb.append(".");
                }
                cur.add(sb.toString());
            }
            res.add(cur);
            return;
        }
        // recursion
        for(int i = 0; i < board.length; i++) {
            board[row] = i;
            if(isSafe(board, row))
                recursion(res, board, row+1);
        }
            
    }
    
    /**
    * Check the current board is safe.
    */
    private boolean isSafe(int[] board, int row) {
        for(int i = 0; i < row; i++) {
        	// difference on col value shouldn't equal to the difference on row value;
            if((board[i]==board[row]) || (Math.abs(i - row) == Math.abs(board[i] - board[row])))
                return false;
        }
        return true;
    }
};

```
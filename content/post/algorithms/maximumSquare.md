+++
topics = ["Leetcode","Algorithm"]
date = "2015-11-05T20:10:29-07:00"
levels = ["Hard"]
tags = ["Dynamic Programming", "Matrix"]
title = "Maximal Square"
banner = "/media/leetcode.png"
+++

Given a 2D binary matrix filled with 0's and 1's, find the largest square containing all 1's and return its area.
<!--more-->
### Example
For example, given the following matrix:
```
    1 0 1 0 0
    1 0 1 1 1
    1 1 1 1 1
    1 0 0 1 0
```

Return `4`.

## Think
- Use itself as memorized array (modifying value directly on matrix)
- Ignore the top and left boundary
- If current point `[i][j]` is one, look up all three directions from `[i-1][j]`, `[i-1][j-1]` and `[i][j-1]` are not zero, get the minimum value from them so that the value plus one is the maximum length of square on current point.
- However, if one of three is zero, current point should keep zero or one
- Set a max value to track the max length.
- Don't forget make a square on final max result, since that result is just for length

## Solution
```java
    /**
     * @param matrix: a matrix of 0 and 1
     * @return: an integer
     */
    public int maxSquare(int[][] matrix) {
        if(matrix == null || matrix.length == 0)
            return 0;
        
        int max = 0;
        for(int i = 0; i < matrix.length; i++) {
            for(int j = 0; j < matrix[i].length; j++) {
                if(i != 0 && j != 0 && matrix[i][j]!=0 && matrix[i-1][j] != 0 && matrix[i][j-1] != 0 && matrix[i-1][j-1] != 0) 
                    matrix[i][j] = 1 + Math.min(matrix[i-1][j-1],Math.min(matrix[i-1][j],matrix[i][j-1]));
                max = Math.max(max, matrix[i][j]);
            }
        }
        return max*max;
    }
```

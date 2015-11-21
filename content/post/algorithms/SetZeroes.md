+++
topics = ["Leetcode", "Algorithm"]
date = "2015-09-18T22:10:29-07:00"
levels = ["Easy"]
tags = ["Matrix", "Complex Implement"]
title = "Set Matrix Zeroes"
banner = "/media/leetcode.png"
+++

Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in place.

<!--more-->

#### Solution:
- Use the first row (up row) and the first col (left col) to record the position info of zeroes in matrix;
- But we also need to set two boolean value to check if there is zero in first row and first col;
- Then go through the matrix again, when [i][0] is marked zero or [0][j] is marked zero set current position as zero! This is important!;
- Finally, go back to check two boolean value, and set that row or col as zero if boolean value is true;

<pre>
<code class="java">
public class Solution {
    /**
     * @param matrix: A list of lists of integers
     * @return: Void
     */
    public void setZeroes(int[][] matrix) {

        if(matrix == null || matrix.length == 0)
            return;
        
        boolean row = false;
        boolean col = false;
                        
        for(int i = 0; i < matrix.length; i++)
            if(matrix[i][0] == 0)
                col = true;
                
        for(int j = 0; j < matrix[0].length; j++)
            if(matrix[0][j] == 0)
                row = true;
        
        for(int i = 1; i < matrix.length; i++)
            for(int j = 1; j < matrix[i].length; j++) 
                if(matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
                
        for(int i = 1; i < matrix.length; i++){ 
            for(int j = 1; j < matrix[0].length; j++){
                if(matrix[i][0] == 0 || matrix[0][j] == 0)
                    matrix[i][j] = 0;
            }   
        }
        
        if(row)
            for(int j = 0; j < matrix[0].length; j++)
                    matrix[0][j] = 0;
                    
        if(col)
            for(int i = 0; i < matrix.length; i++)
                    matrix[i][0] = 0;
    }
}
</code>
</pre>
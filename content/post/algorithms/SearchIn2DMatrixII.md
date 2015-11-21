+++
topics = ["Lintcode", "Algorithm"]
date = "2015-09-22T13:35:30-07:00"
levels = [ "Moderate"]
tags = ["Matrix", "Two Pointers"]
title = "Search In 2D Matrix II"
banner = "/media/lintcode.png"
+++

Write an efficient algorithm that searches for a value in an m x n matrix, return the occurrence of it.

This matrix has the following properties:

 * Integers in each row are sorted from left to right.

 * Integers in each column are sorted from up to bottom.

 * No duplicate integers in each row or column.

<!--more-->

#### Solution:

- Typical Matrix Search Problem, using a condition for driven coordinate moving.
- Here the value and target comparasion is the driven condition. 
- Since the sorted matrix, we can start from right top element. 
- Because on the diagonal from right top to left down, all the left elements are less than the right elments. 
- So we have three type of running condition and set the x, y coordinate differently.

<pre>
<code class="java">
public class Solution {
    /**
     * @param matrix: A list of lists of integers
     * @param: A number you want to search in the matrix
     * @return: An integer indicate the occurrence of target in the given matrix
     */

    public int searchMatrix(int[][] matrix, int target) {
        // write your code here
        if(matrix == null || matrix.length == 0)
            return 0;
        int rightTop = matrix[0][matrix[0].length - 1];
        int x = 0, y = matrix[0].length - 1;
        int occ = 0;
        while(x < matrix.length && y >= 0) {
            int cur = matrix[x][y];
            if(cur == target) {
                occ ++;
                x++; y--;
            }else if(cur < target)
                x++;
            else
                y--;
        }       
        return occ;
    }
}
</code>
</pre>
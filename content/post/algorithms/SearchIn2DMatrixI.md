+++
topics = ["Lintcode",  "Algorithm"]
date = "2015-09-21T13:37:08-07:00"
levels = ["Easy"]
tags = ["Matrix", "Binary Search", "Two Pointers"]
title = "Search In 2D Matrix I"
banner = "/media/lintcode.png"
+++
Write an efficient algorithm that searches for a value in an m x n matrix.

This matrix has the following properties:

 - Integers in each row are sorted from left to right.
 - The first integer of each row is greater than the last integer of the previous row.

<!--more-->

#### Solution:

- First binary search with checking the first element in each row so that we can find the row may contain the target number;
- So we search the lowbound of target number. However, we also can do if the element is just equals to target number then directly return for reducing time.
- Once we get the target row, then we do the second binary search in this row to find the target number.
- All in all, two binary search to find the target!


<pre>
<code class="java">
public class Solution {
    /**
     * @param matrix, a list of lists of integers
     * @param target, an integer
     * @return a boolean, indicate whether matrix contains target
     */
    public boolean searchMatrix(int[][] matrix, int target) {
        // write your code here
        if(matrix == null || matrix.length == 0)
            return false;
        
        int up = 0, down = matrix.length - 1;
        while(up < down - 1) {
            int mrow = up + ((down - up) >> 1);
            if(matrix[mrow][0] == target)
                return true;
            if(matrix[mrow][0] < target)
                up = mrow;
            else
                down = mrow;
        }
        int curRow;
        if(matrix[up][0] > target)
            return false;
        else if(matrix[up][0] <= target && matrix[down][0] > target)
            curRow = up;
        else
            curRow = down;
        
        int l = 0, r = matrix[curRow].length - 1;
        while(l < r - 1) {
            int m = l + ((r - l) >> 1);
            if(matrix[curRow][m] == target)
                return true;
            else if(matrix[curRow][m] < target)
                l = m;
            else
                r = m;
        }
        
        if(matrix[curRow][l] == target || matrix[curRow][r] == target)
            return true;
        else
            return false;
    }
}
</code>
</pre>
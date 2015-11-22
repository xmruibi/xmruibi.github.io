+++
topics = ["Leetcode","Algorithm"]
date = "2015-09-11T16:06:19-07:00"
levels = ["Moderate"]
tags = ["Matrix", "Complex Implement"]
title = "Rotate Image"
banner = "/media/leetcode.png"

+++
You are given an n x n 2D matrix representing an image. Rotate the image by 90 degrees (clockwise).

<!--more-->

#### Solution:

- Headache Implement question!
- Very carefully to treat index.
- Only calculate the 1/4 of index in matrix!
- 

<pre>
<code class="java">
public class Solution {
    /**
     * @param matrix: A list of lists of integers
     * @return: Void
     */
    public void rotate(int[][] matrix) {
        
        int n = matrix.length;

        // One of i or j need to consider boundry!
        for(int i = 0; i < ( n >> 1); i ++) {
        // that's why j < (n+1) / 2, that is the boundry!
            for(int j = 0; j < ( n+1 >> 1); j++) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[n - j - 1][i];
                matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
                matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
                matrix[j][n - i - 1] = tmp;
            }
        }
    }
}
</code>
</pre>
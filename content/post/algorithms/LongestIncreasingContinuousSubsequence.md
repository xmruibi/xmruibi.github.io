+++
date = "2015-10-16T09:03:13-07:00"
levels = ["easy"]
tags = ["String", "Subsequence", "Dynamic Programming"]
title = "Longest Increasing Continuous subsequence"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Give you an integer array (index from 0 to n-1, where n is the size of this array)，find the longest increasing continuous subsequence in this array. (The definition of the longest increasing continuous subsequence here can be from right to left or from left to right)
<!--more-->


### Example
For `[5, 4, 2, 1, 3]`, the LICS is `[5, 4, 2, 1]`, return `4`.

For `[5, 1, 2, 3, 4]`, the LICS is `[1, 2, 3, 4]`, return `4`.

### Note
O(n) time and O(1) extra space.


## Solution
- This is O(1) space dynamic programming. Just maintain one local max and one global max variable.
- The default value of local maximum variable is 2. 
- The condition for growing the local maximum is by `(A[i] - A[i-1])*(A[i-1] - A[i-2]) > 0`, which means `[i-2] < [i-1] < [i]` or `[i-2] > [i-1] > [i]`.



```
public class Solution {
    /**
     * @param A an array of Integer
     * @return  an integer
     */
    public int longestIncreasingContinuousSubsequence(int[] A) {
        if( A == null )
            return 0;
        if( A.length <= 1)
            return A.length;
        
        int max = 2;
        int cur = 2;
        for(int i = 2; i < A.length; i++) {
            if((A[i] - A[i-1])*(A[i-1] - A[i-2]) > 0){
                cur ++;   
            }else
                cur = 2;
            max = Math.max(max, cur);
        }
        return max;
    }
}
```
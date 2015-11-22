+++
date = "2015-10-18T16:13:13-07:00"
levels = ["Easy"]
tags = [ "Binary Search", "Sort"]
title = "Smallest Difference"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Given two array of integers(the first array is array A, the second array is array B), now we are going to find a element in array A which is A[i], and another element in array B which is B[j], so that the difference between A[i] and B[j] (|A[i] - B[j]|) is as small as possible, return their smallest difference.
<!--more-->

### Example
For example, given array A = `[3,6,7,4]`, B = `[2,8,9,3]`, return `0`

### Challenge
O(n log n) time

## Solution
- Do sort on one of array
- One pass on another array and do binary search on the sorted array.
- Search the target value from passing array and get the minimum difference on sorted array
- Update the global minimum difference each time.

```
public class Solution {
    /**
     * @param A, B: Two integer arrays.
     * @return: Their smallest difference.
     */
    public int smallestDifference(int[] A, int[] B) {
        if(A == null || B == null || A.length == 0 || B.length == 0)
            return 0;
        Arrays.sort(B);
        int mindiff = Integer.MAX_VALUE;
        for(int i = 0; i < A.length; i++) {
            int curdiff = binarySearch(B, A[i]);
            mindiff = Math.min(mindiff, curdiff);
        }
        return mindiff;
    }
    
    
    private int binarySearch(int[] A, int value) {
        if(A == null || A.length == 0)
            return 0;
        int l = 0, r = A.length - 1;
        while(l + 1 < r) {
            int m = l + ((r - l) >> 1);
            if(value > A[m])
                l = m;
            else
                r = m;
        }
        return Math.min(Math.abs(A[l] - value), Math.abs(A[r] - value));
    }
}
```
+++
topics = ["Lintcode", "Algorithm"]
date = "2015-11-04T17:10:29-07:00"
levels = ["Hard"]
tags = ["Dynamic Programming", "Array"]
title = "Minimum Adjustment Cost"
banner = "/media/lintcode.png"
+++

Given an integer array, adjust each integers so that the difference of every adjacent integers are not greater than a given number target.

If the array before adjustment is A, the array after adjustment is `B`, you should minimize the sum of `|A[i]-B[i]|`
<!--more-->
### Example
Given `[1,4,2,3]` and target = 1, one of the solutions is `[2,3,2,3]`, the adjustment cost is 2 and it's minimal.

Return `2`.

Note
You can assume each number in the array is a positive integer and not greater than `100`.

## Think
- There is invisible condition on Note part: each number in the array is a positive integer and not greater than `100`
- So the above condition giving the memorized data structure a length on enumeration.
- memo data should be `memo[arr.size() + 1][100]`, which means the minimum cost on modify the ith num in A to `j` 
- Pass each element in input array
- Then enumeration `j` on 0 to 99, so that we can consider the previous number `p` should inside the range between `j + target` and `j-target`.
- So the previous cost should be `memo[i-1][p]`and for current, it should be `memo[i-1][p] + Math.abs(j-A.get(i-1))`
- After arrived the last element and got all possible cost, the minimum total cost should come from `memo[last element][i]`

## Solution
```java
    /**
     * @param A: An integer array.
     * @param target: An integer.
     */
    public int MinAdjustmentCost(ArrayList<Integer> A, int target) {
        // the minimum cost on modify the ith num in A to j 
        int[][] memo = new int[A.size() + 1][100];
        
        for(int i = 1; i <= A.size(); i++) {
            // enumeration on 0 to 99 
            for(int j=0; j<=99; j++) {
                // initial the minimum cost on ith as the Integer.MAX
                memo[i][j] = Integer.MAX_VALUE;
                // get the range by target based on j 
                int lowerRange = Math.max(0, j-target);
                int upperRange = Math.min(99, j+target);
                // p is the possible num based on previous index
                // check all cost between current index on A and j
                for (int p=lowerRange; p<=upperRange; p++) {
                    
                    memo[i][j] = Math.min(memo[i][j], memo[i-1][p]+Math.abs(j-A.get(i-1)));
                }
            }
        }
        int minCost = Integer.MAX_VALUE;
        // check all minimum cost on index equal to A's last element
        for(int i = 0; i <= 99; i++)
            minCost = Math.min(minCost, memo[A.size()][i]);
        return minCost;
    }
```
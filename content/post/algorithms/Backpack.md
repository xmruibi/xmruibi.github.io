+++
date = "2015-11-04T09:43:13-07:00"
levels = ["Medium"]
tags = ["Back Pack", "Dynamic Programming"]
title = "Backpack"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

# Backpack
Given n items with size Ai, an integer m denotes the size of a backpack. How full you can fill this backpack?
<!--more-->

### Example
If we have 4 items with size [2, 3, 5, 7], the backpack size is 11, we can select [2, 3, 5], so that the max size we can fill this backpack is 10. If the backpack size is 12. we can select [2, 3, 7] so that we can fulfill the backpack.

You function should return the max size we can fill in the given backpack.

### Note
You can not divide any item into small pieces.

### Challenge
$O(n \times m)$ time and $O(m)$ memory.

$O(n \times m)$ memory is also acceptable if you do not know how to optimize memory.


## Think
- Setup 2-D memorized array with length is `memo[items.length][bag size]`
- `memo[i][S]` means what size we can fill in when get first i items.
- Then we should check from zero to `M` size when got `i`th items and evaluate the max size when taken or not taken current `i`th item.


## Solution
```java
    /**
     * @param m: An integer m denotes the size of a backpack
     * @param A: Given n items with size A[i]
     * @return: The maximum size
     */
    public int backPack(int M, int[] A) {
        int[][] bp = new int[N + 1][M + 1];

        for (int i = 0; i < A.length; i++) {
            for (int j = 0; j <= M; j++) {
                if (A[i] > j) {
                    bp[i + 1][j] = bp[i][j];
                } else {
                    bp[i + 1][j] = Math.max(bp[i][j], bp[i][j - A[i]] + A[i]);
                }
            }
        }
        return bp[N][M];
    }
```


# Backpack II

Given n items with size Ai and value Vi, and a backpack with size m. What's the maximum value can you put into the backpack?

### Example
Given 4 items with size `[2, 3, 5, 7]` and value `[1, 5, 2, 4]`, and a backpack with size `10`. The maximum value is `9`.

### Note
You cannot divide item into small pieces and the total size of items you choose should smaller or equal to m.

### Challenge
$O(n \times m)$ memory is acceptable, can you do it in $O(m)$ memory?

## Think
- The same idea as the Backpack I.
- But the value on memo array should be the value of items in bag

## Solution
```java
    /**
     * @param m: An integer m denotes the size of a backpack
     * @param A & V: Given n items with size A[i] and value V[i]
     * @return: The maximum value
     */
    public int backPackII(int m, int[] A, int V[]) {
        // write your code here
        int[][] memo = new int[A.length+1][m+1];
        
         for(int i = 0; i < A.length; i++) {
            for(int j = 0;j <= m; j++) {
                if(j - A[i] >= 0)
                    memo[i+1][j] = Math.max(memo[i][j], memo[i][j - A[i]] + V[i]); // add the value
                else
                    memo[i+1][j] = memo[i][j];
            }
        }
        
        return memo[A.length][m];
    }
```

## Think (Space Optimized)
- 1-D array with length of `m`
- `memo[i]` should be the max value with `i` size items
- NOTE: the iterate on size should be reversed, from `m` to `0` since the value come from `j - A[i]` that can be updated if we look the previous index 

## Solution
```java
    /**
     * @param m: An integer m denotes the size of a backpack
     * @param A & V: Given n items with size A[i] and value V[i]
     * @return: The maximum value
     */
    public int backPackII(int m, int[] A, int V[]) {
        // write your code here
        int[] memo = new int[m+1];
        
         for(int i = 0; i < A.length; i++) {
            for(int j = m; j >= 0; j--) { // lookup by reversed order
                if(j - A[i] >= 0)
                    memo[j] = Math.max(memo[j], memo[j - A[i]] + V[i]);
            }
        }
        
        int maxVal = 0;
        for(int i = m; i >= 0; i--)
            maxVal = Math.max(maxVal, memo[i]);
        
        return maxVal;
    }
```
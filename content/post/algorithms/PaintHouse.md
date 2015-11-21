+++
date = "2015-11-07T19:43:13-07:00"
levels = ["Medium"]
tags = ["Matrix", "Dynamic Programming"]
title = "Paint House"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

## Paint Fence
There is a fence with `n` posts, each post can be painted with one of the `k` colors.

You have to paint all the posts such that **no more than two adjacent fence posts** have the same color.

Return the total number of ways you can paint the fence.

#### Note
`n` and `k` are non-negative integers.

### Think
- Two cases: 
    - If `[n-1] == [n]`, `[n]` has `1` choices
    - If `[n-1] != [n]`, `[n]` has `k-1` choices with consider the result from both `[n-2] == [n-1]` OR `[n-2] != [n-1]`.

### Solution
```java
    public int numWays(int n, int k) {  
        if(n == 0 || k == 0)  
            return 0;  
        int same = k;
        if(n == 1)
            return same;
        int noSame = k*(k-1);
        for(int i = 2; i < n; i++) {
            int tmp = noSame;
            noSame = (same + noSame) * (k-1);
            same = tmp * 1;
        }
        return noSame + same;
    }
```


## Paint House
There are a row of n houses, each house can be painted with one of the three colors: `red`, `blue` or `green`. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by a `n x 3` cost matrix. For example, `costs[0][0]` is the cost of painting house 0 with color red; `costs[1][2]` is the cost of painting house 1 with color green, and so on... Find the minimum cost to paint all houses.

### Follow Up: 2 Colors -> K Colors
There are a row of n houses, each house can be painted with one of the k colors. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by a `n x k` cost matrix. For example, `costs[0][0]` is the cost of painting house 0 with color 0; `costs[1][2]` is the cost of painting house 1 with color 2, and so on… Find the minimum cost to paint all houses.

### Think
- Current paint only come from the previous different paint cost
- `minCost[i][j] = costs[i][j] + min(minCost[i-1][k])` (k != j) 
- We can do it in-place, update the newest value on the original memorized array.

### Solution (General for Two Cases: 2 or K colors)
```java
 public int minCost(int[][] costs) {
    if (costs == null || costs.length == 0) 
            return 0;
    
    for(int i = 1; i < costs.length; i++) {
        for(int j = 0; j < costs[i].length; j++) {
            int cur = Integer.MIN_VALUE;
            for(int k = 0; j < costs[i].length; k++) {
                if(k == j)
                    continue;
                cur = Math.max(cur, costs[i-1][k] + costs[i][j]);
            }
            costs[i][j] = cur;
        }
    }
    
    int max = 0;
    for(int i = 0; i < costs[costs.length - 1].length; i++)
        max = Math.max(max, costs[costs.length - 1][i]);
    
    return max;
 }
```
+++
topics = ["Lintcode","Algorithm"]
date = "2015-11-05T13:10:29-07:00"
levels = ["Hard"]
tags = ["Dynamic Programming", "Array"]
title = "Coins in a Line"
banner = "/media/lintcode.png"
+++


## Problem I
There are n coins in a line. Two players take turns to take one or two coins from right side until there are no more coins left. The player who take the last coin wins.

Could you please decide the first play will win or lose?
<!--more-->
#### Example
n = `1`, return `true`.

n = `2`, return `true`.

n = `3`, return `false`.

n = `4`, return `true`.

n = `5`, return `true`.

#### Challenge
$O(n)$ time and $$O(1)$$ memory

### Think
- Only if the amount of coin is the multiply of `3`, first player cannot win. 

### Solution
```java
    /**
     * @param n: an integer
     * @return: a boolean which equals to true if the first player will win
     */
    public boolean firstWillWin(int n) {
        return n%3!=0;
    }
```
## Problem II
There are n coins with different value in a line. Two players take turns to take one or two coins from left side until there are no more coins left. The player who take the coins with the most value wins.

Could you please decide the first player will win or lose?

#### Example
Given values array A = `[1,2,2]`, return true.

Given A = `[1,2,4]`, return false.


### Think
##### State

`dp[i]` represent the max value it can get from `i` to the end  

##### Function

Each time when iterate `i`, we have two choice:

- takes `values[i]`
- takes `values[i] + values[i+1]`

Here are what we need to think:

- 1.If we took `values[i]`, opposite has two choice:  `values[i+1]` or `values[i+1] + values[i+2]` so the rest values for our own sides are `DP[i+2]` or `DP[i+3]`, however it should choose the minimum so that the opposite can get the maximum.

    $$value1 = values[i] + min(DP[i+2], DP[i+3])$$

- 2.If we took  `values[i] + values[i+1]` 

    $$value2 = values[i] + values[i+1] + min(DP[i+3], DP[i+4])$$

- 3.

    $$dp[I] = max(value1, value2)$$

### Solution
```java
    /**
     * @param values: an array of integers
     * @return: a boolean which equals to true if the first player will win
     */
    public boolean firstWillWin(int[] values) {
        if (values == null || values.length <= 2) {
            return true;
        }
        int dp[] = new int[values.length];
        
        dp[values.length-1] = values[values.length-1];
        dp[values.length-2] = values[values.length-1] + values[values.length-2];
        int total = dp[values.length-2];
        
        for(int i = values.length - 3; i >= 0; i--) {
            total += values[i];
            int value1 = values[i] + Math.min(dp[i+2], i+3<values.length?dp[i+3]:0);
            int value2 = values[i] + values[i+1] + Math.min(i+3<values.length?dp[i+3]:0, i+4<values.length?dp[i+4]:0);
            dp[i] = Math.max(value1, value2);
        }
        
        return dp[0] > (total - dp[0]);
    }
```


## Problem III
There are n coins in a line. Two players take turns to take a coin from one of the ends of the line until there are no more coins left. The player with the larger amount of money wins.

Could you please decide the first player will win or lose?

#### Example
Given array A = `[3,2,2]`, return true.

Given array A = `[1,2,4]`, return true.

Given array A = `[1,20,4]`, return false.

#### Challenge
Follow Up Question: If `n` is even. Is there any hacky algorithm that can decide whether first player will win or lose in $$O(1)$$ memory and $O(n)$ time?

### Think
##### State
`dp[i][j]` represent the max value it can get from `i` to `j`

`sum[i][j]` represent the sum value from `i` to `j`

##### Function
Each time when taken coins, we have two choice:

- takes `values[i]`
- takes `values[j]`

$$dp[i][j]=max(values[i]+sum[i+1][j]-dp[i+1][j], values[j]+sum[i][j-1]-dp[i][j-1])$$

Since `values[i]+sum[i+1][j]` or `values[j]+sum[i][j-1]` equals to `sum[i][j]`

So the equation can be $dp[i][j] = sum[i][j] - min(dp[i+1][j],dp[i][j-1])$

### Solution
```java
    /**
     * @param values: an array of integers
     * @return: a boolean which equals to true if the first player will win
     */
    public boolean firstWillWin(int[] values) {
        if (values == null || values.length <= 2) {
            return true;
        }
        
        int[][] dp = new int[values.length][values.length];
        int[][] sum = new int[values.length][values.length];
        // get the sum of i to j
        for(int i = 0; i < values.length; i++){
            for(int j  = i; j < values.length; j++) {
                if(i == j)
                    sum[i][j] = values[i];
                else
                    sum[i][j] = values[j] + sum[i][j-1];
            }
        }
        
        // to do the dp 
        for(int i = values.length - 1; i >= 0; i--){
            for(int j  = i; j < values.length; j++) {
                if(i == j)
                    dp[i][j] = values[i];
                else
                    dp[i][j] = sum[i][j] - Math.min(dp[i+1][j],dp[i][j-1]);
            }
        }
        
        return dp[0][values.length - 1] > sum[0][values.length - 1] - dp[0][values.length - 1];
    }
```
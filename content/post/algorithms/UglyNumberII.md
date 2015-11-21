+++
date = "2015-10-18T11:43:13-07:00"
levels = []
tags = ["Math", "Dynamic Programming"]
title = "Ugly Number II"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Write a program to find the n-th ugly number.

Ugly numbers are positive numbers whose prime factors only include `2, 3, 5`. For example, `1, 2, 3, 4, 5, 6, 8, 9, 10, 12` is the sequence of the first `10` ugly numbers.

Note that `1` is typically treated as an ugly number.

<!--more-->


## Think
- Declare an array for ugly numbers:  ugly[150]
- Initialize first ugly no:  ugly[1] = 1
- Initialize three array index variables t2, t3, t5 to point to 
   1st element of the ugly array: 
        i2 = i3 = i5 = 1; 

- Initialize 3 choices for the next ugly no:
         next_mulitple_of_2 = ugly[i2]*2;
         next_mulitple_of_3 = ugly[i3]*3
         next_mulitple_of_5 = ugly[i5]*5;
- Choose the minimum from the aboved 3 choices as the next ugly number.
- Check which choice and increase that index.

## Solution
```java
public class Solution {
    public long nthUglyNumber(int k) {
        long[] memo = new long[k + 1];
            memo[1] = 1;
            int t2 = 1, t3 = 1, t5 = 1;
            for(int i = 2; i <= k; i++) {
                memo[i] = Math.min(memo[t2]*2, Math.min(memo[t3]*3, memo[t5]*5));
                if(memo[i] == memo[t2]*2)
                    t2++;
                if(memo[i] == memo[t3]*3)
                    t3++;
                if(memo[i] == memo[t5]*5)
                    t5++;
            }
            return memo[k];
    }
}
```
```
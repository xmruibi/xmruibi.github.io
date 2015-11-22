+++
date = "2015-10-18T11:43:13-07:00"
levels = []
tags = ["Math", "Dynamic Programming"]
title = "Ugly Number"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

Write a program to check whether a given number is an ugly number.

Ugly numbers are positive numbers whose prime factors only include `2, 3, 5`. For example, `6, 8` are ugly while `14` is not ugly since it includes another prime factor `7`.

Note that 1 is typically treated as an ugly number.
<!--more-->

## Think
- Make sure the value can be divided exactly by the divisor in array `2, 3, 5`;
- So iterate the division while the value can be divided exactly, otherwise change another divisor from array.


## Solution

```java
public class Solution {
    public boolean isUgly(int num) {
        if(num<=0)
            return false;
        int[] factors = {2,3,5};
        for(int i = factors.length - 1; i >= 0; i--) {
            while(num % factors[i] == 0) {
                num /= factors[i];
            }
        }
        return num == 1;
    }
}
```
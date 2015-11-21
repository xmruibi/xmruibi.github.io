+++
date = "2015-10-20T10:43:13-07:00"
levels = []
tags = ["Math"]
title = "Divide Two Integers"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Divide two integers without using multiplication, division and mod operator.

If it is overflow, return `2147483647`

<!--more-->

### Example
Given dividend = `100` and divisor = `9`, return `11`.

## Think
- Bitwise Idea:
	- Get the result sign (negative or positive) by `((dividend ^ divisor) >>> 31) == 1`
	- This question contains many corner cases!
	- Firstly, check the corner cases in following steps:
		- Divisor is zero? return `Integer.MAX_VALUE`;
		- Dividend is `Integer.MIN_VALUE`?
			- if divisor is negative one? you cannot get the positive `MIN_VALUE` so return `Integer.MAX_VALUE`;
			- ` dividend += Math.abs(divisor)` so that the dividend become away from overflow but that leads the res increase one;
		- Divisor is `Integer.MIN_VALUE`? return res; To avoid the inaccurate from above operation;
	- Make dividend and divisor both positive;
	- Then, the main operation to do the binary substraction;
		- Get the most higher position(`digit`) for bit one with increasing the divisor until it is just larger than (`dividend >> 1`): divisor cannot larger than dividend so that we use the `dividend>>1`
		- Get result by add the `1<<digit` (current bit position should be one) and `dividend -= divisor` but if divisor larger than dividend which means current bit position should be zero so just reduce digit and divisor should shift right one position each time;


## Solution
```java
public class Solution {
    /**
     * @param dividend the dividend
     * @param divisor the divisor
     * @return the result
     */
    public int divide(int dividend, int divisor) {
        int res = 0;
        if(divisor == 0)
            return Integer.MAX_VALUE;
        boolean neg = ((dividend ^ divisor) >>> 31) == 1;  
        if(dividend == Integer.MIN_VALUE) {
            // since the dividend is negative number now so we plus the abs(divisor)
            dividend += Math.abs(divisor);
            if(divisor == -1)
                return Integer.MAX_VALUE;
            res++;
        }
        
        if(divisor == Integer.MIN_VALUE)
            return res;
        
        // the highest position for bit in result   
        int digit = 0;
        dividend = Math.abs(dividend);  
        divisor = Math.abs(divisor);
        while(divisor <= (dividend>>1)) {
            divisor <<= 1;
            digit ++;
        }
        
        while(digit>=0){
            if(dividend>=divisor){
                res += (1<<digit);
                dividend-=divisor;
            }
            divisor>>=1;
            digit--;
        }
        return neg?-res:res;
    }
}
```


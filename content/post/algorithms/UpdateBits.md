+++
date = "2015-10-22T14:43:13-07:00"
levels = []
tags = ["Bit Manipulation"]
title = "Update Bits"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Given two 32-bit numbers, N and M, and two bit positions, i and j. Write a method to set all bits between i and j in N equal to M (e g , M becomes a substring of N located at i and starting at j).

<!--more-->

### Example
Given N=`(10000000000)2`, M=`(10101)2`, i=`2`, j=`6`
return N=`(10001010100)2`

### Note
In the function, the numbers N and M will given in decimal, you should also return a decimal number.

### Challenge
Minimum number of operations?

### Clarification
You can assume that the bits j through i have enough space to fit all of M. That is, if M = `10011`, you can assume that there are at least 5 bits between j and i. You would not, for example, have j=3 and i=2, because M could not fully fit between bit 3 and bit 2.


## Think
- Set a mask:

        Position:   31 30 ..~.. j+1  j ..~.. i  i-1 ..~.. 0
        Bit Val:     1  1  ...   1   0  ...  0   1   ...  1

- Use that mask to do `&` with N, so that in the new N, the position i~j will be zero.

- Left shift `i` for M to make the position aligned. 

- Do `|` for M and N, then get the final result.

## Solution
```java
class Solution {
    /**
     *@param n, m: Two integer
     *@param i, j: Two bit positions
     *return: An integer
     */
    public int updateBits(int n, int m, int i, int j) {
        
        int mask = 0;
        for(int lfShift = 31; lfShift > j; lfShift--) 
            mask += (1<<lfShift);
        
        for(int lfShift = i - 1; lfShift >= 0; lfShift--) 
            mask += (1<<lfShift);
        n &= mask;
        m <<= i;
        return n|m;
    }
}
```
+++
date = "2015-10-24T16:13:13-07:00"
levels = []
tags = ["Math", "Binary Search"]
title = "Sqrt(x)"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Implement `int sqrt(int x)`.

Compute and return the square root of `x`.

<!--more-->

### Note
Try to make the time complexity less.


## Think
- The square root should be between 1 to half of input value;
- Use binary search idea to search the `sqrt` inside that range;

## Solution
```java
public class Solution {
    public int mySqrt(int x) {
        if(x == 0)
            return 0;
        // binary search from 1 -> x/2
        int l = 1, r = (x>>1);
        while(l < r) {
            int m = l + ((r - l) >> 1);
            if( m <= x / m && (m + 1) > x / (m + 1)) {
                return m;
            }else if(m + 1 <= x / m) {
                l = m + 1;
            }else{
                r = m;
            }
        }
        return l;
    }
}
```

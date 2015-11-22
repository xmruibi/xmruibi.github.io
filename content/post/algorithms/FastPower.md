+++
topics = ["Lintcode","Algorithm"]
date = "2015-09-11T19:06:42-07:00"
levels = ["Moderate"]
tags = ["Divide Conquer"]
title = "Fast Power"
banner = "/media/lintcode.png"
+++


Calculate the $ a^n \mod b $  where a, b and n are all 32bit integers.
<!--more-->

### Example:
 For 231 % 3 = 2
 For 1001000 % 1000 = 0

### Challenge:
 Time complexity: $O(logn)$


## Think

- Divide and Conquer
- Think about the two basic condition: n is 1 and n is 0;
- Each time we divide the n into two part (n/2);
- Then we got the combine value (divide * divide) from both parts (they're eqaul, actually);
- While n is odd, we need to add one more "a" time (*a);


## Solution
```java
class Solution {
    /*
     * @param a, b, n: 32bit integers
     * @return: An integer
     */
    public int fastPower(int a, int b, int n) {

        if(n == 1)
            return a % b;
        
        if(n == 0)
            return 1 % b;
        
        long divide = fastPower(a, b, n/2);
        long combine = divide * divide;
        combine %= b;
        if(n % 2 == 1)
            combine *= (long)a;
        combine %= b;
        return (int)combine;
    }
}
```



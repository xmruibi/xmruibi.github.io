+++
date = "2015-10-26T16:33:13-07:00"
levels = []
tags = ["Recursion"]
title = "Print Numbers by Recursion"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Print numbers from 1 to the largest number with `N` digits by recursion.
<!--more-->

### Example
Given `N = 1`, return `[1,2,3,4,5,6,7,8,9]`.

Given `N = 2`, return `[1,2,3,4,5,6,7,8,9,10,11,12,...,99]`.

### Note
It's pretty easy to do recursion like:
```
recursion(i) {
    if i > largest number:
        return
    results.add(i)
    recursion(i + 1)
}
```

However this cost a lot of recursion memory as the recursion depth maybe very large ($10^n - 1$). Can you do it in another way to recursive with at most N depth?

### Challenge
Do it in recursion, not for-loop.

## Think
- Think from bottom to top. 
- Build the result list from number with one digits to N digits.
- Since we considering with digits as its deep, we have to set a loop to add the number in list on the new-generated base number (1 - 9 with following digits):

```
when zero digit, none;
when one digit, new-generated base number is 1, add 1,2,...9;
when two digit, new-generated base number is 10, add 10,20,...90;
```
- Each time when having the new-generated base number, we need to pass through the original result list to fill the rest of number with beginning as new-generated base number.

```
when one digit, new-generated base number is 1, add 1,2,...9, but original result list has nothing. so just add itself;
when two digit, new-generated base number is 10, when add 10, go back the original result list with "1, 2, 3,..., 9", add them as 11, 12, 13, ..., 19, when add 20, go back the original result list with "1, 2, 3,..., 9", add them as 21, 22, 23, ..., 29;
so the same as for 30,..., 90, 100, ..., 900, ...
```

## Solution
```java
public class Solution {
    /**
     * @param n: An integer.
     * return : An array storing 1 to the largest number with n digits.
     */
    public List<Integer> numbersByRecursion(int n) {
        List<Integer> res = new ArrayList<>();
        if(n >= 0)
            add(res, n);
        return res;
    }
    
    private int add(List<Integer> res, int n){
        if(n == 0)
            return 1;
        
        int cur = add(res, n - 1);
        int size = res.size();
        for(int i = 1; i <= 9; i ++) {
            int digit = i * cur;
            res.add(digit);
            for(int j = 0; j < size; j++) {
                res.add(digit + res.get(j));
            }
        }
        return cur * 10;
    }
}
```
## Complexity Analysis
Time: $$O(10^n - 1)$$

Space: $$O(n)$$
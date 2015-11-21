+++
date = "2015-11-12T12:43:13-07:00"
levels = ["Hard"]
tags = ["Binary Search", "Two Pointers", "Array"]
title = "Find the Duplicate Number"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.
<!--more-->
### Note
- You must not modify the array (assume the array is read only).
- You must use only constant, O(1) extra space.
- Your runtime complexity should be less than $$O(n^2)$$.

There is only one duplicate number in the array, but it could be repeated more than once.


## Think #1
#####  Pigeonhole Principle
- Split the array into two pieces by the middle point.
- NOTE: an array nums containing `n + 1` integers where each integer is between `1` and `n` (inclusive).
- Let's say if there is `10` elements in array. The index of middle point is `4`. Check the all elements and count how many element has the value less or equal to that index. If the counter larger than index value and according to Pigeonhole Priciple,  that means there must have number duplicated in the first half of searching range. So next time we search the first half. Otherwise, we check the last half part.
- NOTICE: each time we decrease the search range but still check the number in entire array. 


## Solution #1
```java
    public int findDuplicate(int[] nums) {
        int l = 0, r = nums.length - 1;
        while(l < r) {
            int m = l + ((r - l) >> 1);
            int cnt = 0;
            for(int i : nums)
                if(i <= m)
                    cnt++;
            if(cnt <= m)
                l = m + 1;
            else
                r = m;
        }
        return l;
    }
```


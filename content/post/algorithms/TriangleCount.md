+++
date = "2015-10-22T14:43:13-07:00"
levels = []
tags = ["Sort", "Binary Search", "Array"]
title = "Triangle Count"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Given an array of integers, how many three numbers can be found in the array, so that we can build an triangle whose three edges length is the three numbers that we find?

<!--more-->

### Example
Given array S = [3,4,6,7], return 3. They are:
```
[3,4,6]
[3,6,7]
[4,6,7]
```
Given array S = [4,4,4,4], return 4. They are:
```
[4(1),4(2),4(3)]
[4(1),4(2),4(4)]
[4(1),4(3),4(4)]
[4(2),4(3),4(4)]
```
## Think
- Sort
- Binary Search
- But how to define driven condition? (Tricky Part)
    - As we know, triangle is made by `i + j > k`;
    - So we capture the largest one`[k]` (passing from `length - 1` to `2`)
    - Get `left = 0` and `right = k - 1`
    - If `[left] + [right] > [k]`, that means in the segment, `[left]` can be valued between `[left]` and `[right-1]`, all of that can make valid triangle. So `count += right - left`!
    - If `[left] + [right] <= [k]`, just make the `left` increase to detect any valid possibility.


## Solution

```java
public class Solution {
    /**
     * @param S: A list of integers
     * @return: An integer
     */
    public int triangleCount(int S[]) {
        if(S == null || S.length == 0)
            return 0;
        int cnt = 0;
        Arrays.sort(S);
        for(int i = S.length - 1; i >= 2; i--) {
            int cur = S[i];
            int l = 0, r = i - 1;
            while(l < r) {
                if(S[l] + S[r] > S[i]) {
                    cnt += (r - l); // keypoint!
                    r--;
                }else 
                    l++;
            }
        }
        return cnt;
    }
}
```
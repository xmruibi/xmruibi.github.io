+++
topics = ["Lintcode", "Algorithm"]
date = "2015-11-02T09:10:29-07:00"
levels = ["Medium"]
tags = ["Sort", "Array", "Two Pointers", "Bucket"]
title = "Sort Colors II"
banner = "/media/lintcode.png"
+++

Given an array of n objects with k different colors (numbered from 1 to k), sort them so that objects of the same color are adjacent, with the colors in the order 1, 2, ... k.
<!--more-->

## Example
Given colors=[3, 2, 2, 1, 4], k=4, your code should sort colors in-place to [1, 2, 2, 3, 4].

## Note
You are not suppose to use the library's sort function for this problem.

## Challenge
A rather straight forward solution is a two-pass algorithm using counting sort. That will cost O(k) extra memory. Can you do it without using extra memory?

## Think #1
- Bucket Sort but space complexity with $O(k)$

## Solution #1
```java
    /**
     * @param colors: A list of integer
     * @param k: An integer
     */
    public void sortColors2(int[] colors, int k) {
        if(colors == null || colors.length == 0)
            return;
        
        int[] bucket = new int[k];
        for(int i : colors)
            bucket[i - 1] ++;
        int idx = 0, bidx = 0;
        while(bidx < bucket.length) {
            while(bucket[bidx] > 0) {
                colors[idx++] = bidx+1;
                bucket[bidx]--;
            }
            bidx++;
        }
    }
```


## Think #2
- Complex bucket sort with in-place counting
- Get a value and find its index by `value - 1`
- If the target index has another value, exchange and set target index as `-1`
- If target index is counter, make it minus 1, e.g. `-2` and set original index as `0`
- Steps like following:
    
    ```
     3   2   2   1   4
    
     2   2  -1   1   4
    
     2  -1  -1   1   4
    
     0  -2  -1   1   4
    
    -1  -2  -1   0   4
    
    -1  -2  -1  -1   0
    ```
- Get back the result by counter value from rear to head

## Solution #2
```java
    /**
     * @param colors: A list of integer
     * @param k: An integer
     * @return: nothing
     */
    public void sortColors2(int[] colors, int k) {
        if(colors == null || colors.length == 0)
            return;
        
        for(int i = 0; i < colors.length; i++){
            if(colors[i] <= 0)
                continue;
            else{
                int idx = colors[i] - 1;
                if(colors[idx] > 0){
                    colors[i--] = colors[idx];
                    colors[idx] = -1;
                }else{
                    colors[i] = 0;
                    colors[idx]--;
                }
            }
        }
        
        int idx = colors.length - 1;
        for(int i = k - 1; i >= 0; i--){
            int cnt = -colors[i];
            while(cnt-- > 0 && idx >= 0) {
                colors[idx--] = (i+1);
            }
        }
    }
```

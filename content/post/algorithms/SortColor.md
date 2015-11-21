+++
topics = ["Lintcode",  "Algorithm"]
date = "2015-11-02T09:10:29-07:00"
levels = ["Medium"]
tags = ["Sort", "Array"]
title = "Sort Colors"
banner = "/media/lintcode.png"
+++

Given an array with n objects colored red, white or blue, sort them so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Have you met this question in a real interview? Yes
### Example
Given [1, 0, 1, 2], return [0, 1, 1, 2].

### Note
You are not suppose to use the library's sort function for this problem.

### Challenge
A rather straight forward solution is a two-pass algorithm using counting sort. First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.

Could you come up with an one-pass algorithm using only constant space?


## Think
- Index mark O's first position from head and 2's first position from the rear.
- Exchange the two values.

## Solution
```java
public void sortColors(int[] nums) {
    if(nums == null || nums.length == 0)
        return;
    int zero = 0;
    int two = nums.length - 1;
    for(int i = 0; i < nums.length; i++){
        if(i > zero && nums[i] == 0){
            int tmp = nums[zero];
            nums[zero++] = nums[i];
            nums[i--] = tmp;
        }else if(i < two && nums[i] == 2){
            int tmp = nums[two];
            nums[two--] = nums[i];
            nums[i--] = tmp;
        }
    }
}
```
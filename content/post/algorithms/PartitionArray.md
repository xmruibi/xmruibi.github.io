+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-08T22:10:29-07:00"
levels = ["Easy"]
tags = ["Array", "Two Pointers", "Index Rotate"]
title = "Partition Array"
banner = "/media/leetcode.png"
+++

Given an array `nums` of integers and an int `k`, partition the array (i.e move the elements in "nums") such that:

 - All elements < k are moved to the left
 - All elements >= k are moved to the right

Return the partitioning index, i.e the first index i nums[i] >= k.

<!--more-->

Solution:

- Typical index rotate two pointer problem, looks like the idea of quick sort .
- Set an index `pivot` for marking the real position of element less than `k` during pass the orginal array.
- Once the current passing index `i` hits the element less than `k`, we do the swap with `pivot` and `i`.
- Make sure the `pivot` should add 1 after swap since the marked position is increase for next one.
- However in new `pivot` position we not sure the element's value, so... we need to check in next procedure.
- Make sure the `i` position decrease 1, because we just did a swap and we need to check the new `i` is less than 'k'



```
public class Solution {
	/** 
     *@param nums: The integer array you should partition
     *@param k: As description
     *return: The index after partition
     */
    public int partitionArray(int[] nums, int k) {
	    if(nums == null || nums.length == 0)
            return 0;
            
	    int pivot = 0;
	    for(int i = 0; i < nums.length; i++) {
	        if(i > pivot && nums[i] < k) {
	            int tmp = nums[pivot];
	            nums[pivot++] = nums[i];
	            nums[i--] = tmp;
	        }
	    }
	    // this is just for corner case when the last element still less than k
	    if(nums[nums.length - 1] < k)
	        return nums.length;
	    return pivot;
    }
}
```
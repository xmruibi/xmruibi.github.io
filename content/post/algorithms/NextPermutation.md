+++
date = "2015-10-19T20:43:13-07:00"
levels = []
tags = ["Permutation", "Math"]
title = "Next Permutation"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given a list of integers, which denote a permutation.

Find the next permutation in ascending order.
 <!--more-->

### Example
For `[1,3,2,3]`, the next permutation is `[1,3,3,2]`
For `[4,3,2,1]`, the next permutation is `[1,2,3,4]`

### Note
The list may contains duplicate integers.

## Think
字典序算法：

- 从后往前寻找索引满足 a[k] < a[k + 1], 如果此条件不满足，则说明已遍历到最后一个。
- 如 k == 0, 说明是字典序最后一位， 因此直接倒置整个数组即可.
- 从后往前遍历，找到第一个比a[k]大的数a[l], 即a[k] < a[l].
- 交换a[k]与a[l].
- 反转k + 1 ~ n之间的元素.

## Solution
```java
public class Solution {
    /**
     * @param nums: an array of integers
     * @return: return nothing (void), do not return anything, modify nums in-place instead
     */
    public int[] nextPermutation(int[] nums) {
        if(nums == null || nums.length == 1)
            return nums;
        
        // step1: find nums[i] < nums[i + 1]
        int i = 0;
        for (i = nums.length - 2; i >= 0; i--) {
            if (nums[i] < nums[i + 1]) {
                break;
            } else if (i == 0) {
                // reverse nums if reach maximum
                reverse(nums, 0, nums.length - 1);
                return nums;
            }
        }
        // step2: find nums[i] < nums[j]
        int j = 0;
        for (j = nums.length - 1; j > i; j--) {
            if (nums[i] < nums[j]) {
                break;
            }
        }
        // step3: swap betwenn nums[i] and nums[j]
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
        
        // step4: reverse between [i + 1, n - 1]
        reverse(nums, i + 1, nums.length - 1);

        return nums;
    }
    
    private void reverse(int[] nums, int l, int r) {
        while(l < r) {
            int tmp = nums[l];
            nums[l++] = nums[r];
            nums[r--] = tmp;
        }
    }
}
```

## Complexity Analysis
At most, two pass o(2*n) -> O(n); Constant Space Complexity: O(1) 



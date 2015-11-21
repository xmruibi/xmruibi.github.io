+++
date = "2015-11-14T10:43:13-07:00"
levels = ["Medium"]
tags = ["Backtracking"]
title = "Can I Win"
topics = ["Career Cup", "Algorithm"]
banner = "/media/careercup.png"
+++


Given an array of positive integers and two players. In each turn, one player picks up one number and if the sum of all the picked up numbers is greater than a target number, the player wins. Write a program `canIWin()` to print the result.
<!--more-->
## Think
- This question is pretty tricky.
- It's not just choose the largest number in number pool. Instead of, for each turn, player has two choice: 
    - If current pool has number can just make the sum larger than target, pick that number
    - If not number can added to make the sum exceed target, try to make current pick with the minimum number from the pool.


## Solution
```java
        public static Result canIWin(int[] nums, int target) {
                if (target <= 0)
                        return Result.Lose;
                // first iterate - find any number larger than remain target, or check
                // all number in pool has taken
                boolean hasNum = false;
                for (int num : nums) {
                        if (num >= target)
                                return Result.Win;
                        else if (num > 0)
                                hasNum = true;
                }
                if (!hasNum)
                        return Result.Draw;
                for (int i = 0; i < nums.length; i++) {
                        if (nums[i] > 0) {
                                int data = nums[i];
                                nums[i] = -1;
                                Result rivalResult = canIWin(nums, target - data);
                                if (rivalResult == Result.Win)
                                        return Result.Lose;
                                if (rivalResult == Result.Lose)
                                        return Result.Win;
                                nums[i] = data;
                        }
                }
                return Result.Draw;
        }
```

+++
topics = ["Lintcode", "Algorithm"]
date = "2015-09-09T10:40:49-07:00"
levels = ["Moderate"]
tags = ["Prefix Sum", "Sort", "Subarray"]
title = "Subarray Sum I"
banner = "/media/lintcode.png"

+++
Given an integer array, find a subarray where the sum of numbers is zero. Your code should return the index of the first number and the index of the last number.
<!--more-->
<pre>
	<code class="java">
public class Solution {
    /**
     * @param nums: A list of integers
     * @return: A list of integers includes the index of the first number 
     *          and the index of the last number
     */
    public ArrayList<Integer> subarraySum(int[] nums) {
        // write your code here
        ArrayList<Integer> res = new ArrayList<Integer>();
        if(nums == null || nums.length == 0)
            return res;       
        HashMap<Integer, Integer> map = new HashMap<Integer>();
        int sum = 0;
        map.put(0, 0);
        for(int i = 0; i < nums.length; i++) {
            if(map.containsKey(sum+nums[i])) {
                res.add(map.get(sum+nums[i]));
                res.add(i);
                return res;
            }
            map.put(sum+=nums[i], i+1);
        }
        return res;
    }
}	

</code>

</pre>
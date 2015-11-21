+++
date = "2015-11-18T13:43:13-07:00"
levels = ["Medium"]
tags = ["Array", "Math", "Permutation"]
title = "Sum of Difference on Four Integers"
topics = ["Career Cup", "Amazon", "Algorithm"]
banner = "/media/careercup.png"
+++
Given four integers, make `F(S)` = `abs(S[0] - S[1])` + `abs(S[1] - S[2])` + `abs(S[2] - S[3])` to be largest.

<!--more-->

## Solution #General Method
```java
public class Solution{
	public int maxDiff(int[] arr) {
		List<List<Integer>> res = new ArrayList<>();
		permutation(res, new ArrayList<>(), arr);
		int max = 0;
		List<Integer> maxLine = new ArrayList<>();
		for(List<Integer> each : res) {
			int cur = 0;
			for(int i = 1; i < each.size(); i++) 
				cur += Math.abs(each.get(i) - cur.get(i-1));
			if(max <= cur) {
		        max = cur;
		        maxLine = each;
		    }
		}
		System.out.println(maxLine);
		return max;
	}

	private void permutation(List<List<Integer>> res, List<Integer> curRes, int[] arr) {
		if(curRes.size() == arr.length) {
			res.add(new ArrayList<>(curRes));
			return;
		}

		for(int i = 0; i < arr.length; i++) {
			if(curRes.contains(arr[i]))
				continue;
			curRes.add(arr[i]);	
			permutation(res, curRes, arr);
			curRes.remove(curRes.size() - 1);
		}
	}
}
```
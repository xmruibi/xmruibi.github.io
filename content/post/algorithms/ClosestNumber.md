+++
date = "2015-10-12T21:43:13-07:00"
levels = []
tags = ["Sort", "Array"]
title = "Closest Number"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

Given an unsorted array, find out the most closest two elements in this array. Output
<!--more-->

#### Solution:

- Sort is important here! You must think about sort first. Since other may may cost
- Then the gap between adjacent elements are the 

<pre>
<code class="java">
public ArrayList<int[]> closestNumber(int[] arr){
	ArrayList<int[]> res = new ArrayList<>();
	if(arr == null || arr.length == 0)
		return res;
	Arrays.sort(arr);

	int mindiff = Integer.MAX_VALUE;
	for(int i = 1; i < arr.length; i++) {
 		int curdiff = arr[i] - arr[i - 1];
 		if(curdiff >= mindiff) {
 			if(curdiff > mindiff)
 				res.clear();
 			int[] cres = new int[]{arr[i - 1], arr[i]};
 			res.add(cres);
 		}
	}
	return res;
}
</code>
</pre>
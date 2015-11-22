+++
date = "2015-09-08T21:18:09-07:00"
draft = false
title = "Subarray Sum II"
tags = ["Binary Search","Prefix Sum", "Sort", "Subarray"]
topics = ["Lintcode", "Algorithm"]
levels = ["Hard"]
banner = "/media/lintcode.png"
+++

Given an integer array, find a subarray where the sum of numbers is between two given interval. Your code should return the number of possible answer.
 <!--more-->
<pre><code class="java">
public int subarraySumII(int[] A, int start, int end) {
	int res = 0;
        for(int i = 1; i < A.length; i++)
            A[i] += A[i - 1];
        
        Arrays.sort(A);
        for(int i = 0; i < A.length; i++) {
            if(A[i] >= start && A[i] <= end)
                res++;
            // start <= A[i] - A[j] <= end
            // so the max bound and min bound of A[j] are following:
            int max = A[i] - start;
            int min = A[i] - end;
            // max + 1 make sure the right bound of max value and also index problem
            int range = findInsPos(A, max + 1) - findInsPos(A, min);
            res += range;
        }
        return res;
}
private int findInsPos(int[] A, int value) {
        int l = 0, r = A.length - 1;
        
        while(l < r - 1) {
            int m = l + ((r - l) >>1);
            if(A[m] < value)
                l = m;
            else
                r = m;
        }
        if(A[l] >= value)
            return l;
        else
            return r;
}
</code></pre>
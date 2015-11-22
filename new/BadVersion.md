+++
date = "2015-11-10T19:43:13-07:00"
levels = ["Medium"]
tags = ["Binary Search"]
title = "3Bad Version"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.
<!--more-->
Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool `isBadVersion(version)` which will return whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

## Think
- Binary Search idea
- If the middle one is bad version, try to check the left part, but include middle index as the boundary.
- If the middle one is not bad version, try the right part, but without the middle index.

## Solution
```java
    public int firstBadVersion(int n) {
        int l = 1, r = n;
        while(l<r){
            int m = l + ((r-l)>>1);
            if(isBadVersion(m)){
                r = m;   
            }else{
                l = m + 1;
            }
        }
        return l;
    }
```
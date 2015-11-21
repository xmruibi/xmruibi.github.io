+++
date = "2015-11-11T10:43:13-07:00"
levels = ["Hard"]
tags = ["Binary Search","Bucket Sort", "Array"]
title = "H-Index"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given an array of citations (each citation is a non-negative integer) of a researcher, write a function to compute the researcher's h-index.

According to the definition of h-index on Wikipedia: "A scientist has index h if h of his/her N papers have at least h citations each, and the other N − h papers have no more than h citations each."
<!--more-->

For example, given citations = `[3, 0, 6, 1, 5]`, which means the researcher has `5` papers in total and each of them had received `3, 0, 6, 1, 5` citations respectively. Since the researcher has `3` papers with at least `3` citations each and the remaining two with no more than `3` citations each, his h-index is `3`.

### Note
If there are several possible values for h, the maximum one is taken as the h-index.

### Hint
- An easy approach is to sort the array first.
- What are the possible values of h-index?
- A faster approach is to use extra space.


## Think #1
- Sort first (takes $$O(n \times log{n})$$)
- Set a `h` variable, increase `h` to `length - currentIdx` when current element's value is equals or larger than `length - currentIdx`

## Solution #1
```java
    public int hIndex(int[] citations) {
        if(citations == null || citations.length == 0)
            return 0;
        Arrays.sort(citations);
        int h = 0;
        for(int i = 0; i < citations.length; i++) {
            if(citations[i] >= citations.length - i)
                h = Math.max(h, citations.length - i);
        }
        return h;
    }
```

## Think #2
- Extra Space

## Solution #2
```java
    public int hIndex(int[] citations) {
        if(citations == null || citations.length == 0)
            return 0;
        int[] memo = new int[citations.length + 1];
        for(int i = 0; i < citations.length; i++) {
            if(citations[i] >= memo.length)
                memo[memo.length - 1] ++;
            else
                memo[citations[i]]++;
        }

        for(int i = memo.length - 1; i >= 0; i--) {
            if(i < memo.length - 1)
                memo[i] += memo[i+1];
            if(memo[i] >= i)
                return i;
        }
        return 0;
    }
```
## Think #3
- Sort and Binary Search

## Solution #3
```java
    public int hIndex(int[] citations) {
        if(citations == null || citations.length == 0)
            return 0;
        int l = 0, r = citations.length - 1;
        while(l + 1 < r) {
            int m = l + ((r - l) >> 1);
            if(citations[m] == citations.length - m)
                return citations.length - m;
            else if(citations[m] < citations.length - m)
                l = m;
            else
                r = m;
        }
        if(citations[l] >= citations.length - l)
            return citations.length - l;   // this is larger
        if(citations[r] >= citations.length - r)
            return citations.length - r;
    
        return 0;
    }
```
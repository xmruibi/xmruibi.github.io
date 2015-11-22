+++
date = "2015-10-18T16:13:13-07:00"
levels = ["Medium"]
tags = [ "Binary Search", "Sort"]
title = "Count of Smaller Number"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

Give you an integer array (index from 0 to n-1, where n is the size of this array, value from 0 to 10000) and an query list. For each query, give you an integer, return the number of element in the array that are smaller that the given integer.
<!--more-->

### Example
For array `[1,2,7,8,5]`, and queries `[1,8,5]`, return `[0,4,2]`

### Challenge
Could you use three ways to do it.

- Just loop
- Sort and binary search

## Solution

### 1. Solution by Loop with $O(n^2)$
```


   /** O(n^2) Loop implement
     * @param A: An integer array
     * @return: The number of element in the array that 
     *          are smaller that the given integer
     */
    public ArrayList<Integer> countOfSmallerNumber(int[] A, int[] queries) {
        ArrayList<Integer> res = new ArrayList<>();
        if(A == null || queries == null)
            return res;
            
        for(int i = 0; i < queries.length; i++) {
            int cnt = 0;
            for(int j = 0; j < A.length; j++) {
                if(A[j] < queries[i])
                    cnt++;
            }
            res.add(cnt);
        }
        return res;
    }
```

### 2. Solution by Sort and Binary search with O(nlogn)
```
    /** O(nlogn) Sort and Binary search
     * @param A: An integer array
     * @return: The number of element in the array that 
     *          are smaller that the given integer
     */
    public ArrayList<Integer> countOfSmallerNumber(int[] A, int[] queries) {
        ArrayList<Integer> res = new ArrayList<>();
        if(queries == null)
            return res;
         
        Arrays.sort(A);
        for(int i = 0; i < queries.length; i++) {
            int cnt = binarySearch(A, queries[i]);
            res.add(cnt);
        }
        return res;
    }
    
    private int binarySearch(int[] A, int value) {
        if(A == null || A.length == 0)
            return 0;
        int l = 0, r = A.length - 1;
        while(l + 1 < r) {
            int m = l + ((r - l) >> 1);
            if(value > A[m])
                l = m;
            else
                r = m;
        }
        if(A[l] < value)
            return l + 1;
        else
            return l; 
    }
```


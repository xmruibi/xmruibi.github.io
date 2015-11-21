+++
date = "2015-11-01T20:33:13-07:00"
levels = []
tags = ["Sort"]
title = "Wiggle Sort"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given an array, and re-arrange it to wiggle style in one pass.

### Example
- 1.`A0 >= A1 <= A2 >= A3 .... .... An`
      
- 2.`A0 <= A1 >= A2 <= A3 .... .... An`

## Think
Base case. The first two elements $A\_0$, satisfy the rules, and  $A\_0$ is in its desired position.

Suppose $A\_0$ satisfy the rules, and $A\_0$, .... $A\_{k-1}$ are in their desired positions. We want to show that when we consider the pair $A\_{k}$ and $A\_{k+1}$, the rules are not violated, and the new k-th element will be in its desired position. Without loss of generality, assume that the k-th element should be higher than both of its neighbors. Two cases:

1) $A\_{k} > A\_{k+1}$.

We are good in this case. $A\_{k}$ is its desired position, and no rules are violated so far.

2) $A\_{k} < A\_{k+1}$.

We swap $A\_{k}$ and $A\_{k+1}$. Note that this does not violate $A\_{k-1}$, since $A\_{k-1} < A\_{k}< A\_{k+1}$. And the new k-th element (previous $A\_{k+1}$) satisfies the rules, and is in its desired position.

So throughout the process, we do not violate any rules. The algorithm is correct.
  
## Solution
```java
public void wiggleSort(int[] arr, boolean swither){
    int idx = 0;
    while(idx < arr.length - 1){
        if((switcher && arr[idx] < arr[idx + 1])||(!switcher && arr[idx] > arr[idx + 1])){
            int tmp = arr[idx];
            arr[idx] = arr[idx + 1];
            arr[idx+1] = tmp;
            switcher ^= true;
        }
      idx ++;
    }
}
```
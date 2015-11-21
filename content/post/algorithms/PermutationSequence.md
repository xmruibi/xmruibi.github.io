
+++
date = "2015-10-19T11:45:13-07:00"
levels = []
tags = ["Permutation", "Math"]
title = "Permutation Sequence"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given n and k, return the k-th permutation sequence.

<!--more-->

### Example
For n = 3, all permutations are listed as follows:
```
"123"
"132"
"213"
"231"
"312"
"321"
```
If k = `4`, the fourth permutation is "`231`"

### Note
n will be between 1 and 9 inclusive.

### Challenge
O(n*k) in time complexity is easy, can you do it in O(n^2) or less?

## Think
a1,a2,a3.....an的permutation 如果确定了a1,那么剩下的permutation就有(n-1)!种 所以 a1 = k / (n-1)! k2 = k % (n-1)! a2 = k2 / (n-2)!

要注意的是

- 得到的应该是剩下选择数字的index,而不是value,所以要建一个存储可用数字的list
- 在用完一个数字后要将它从list中删去
- array是0-based index, 那么K也应该减去1变为0-based的 (`k--`)

## Solution

```
class Solution {
    /**
      * @param n: n
      * @param k: the kth permutation
      * @return: return the k-th permutation
      */
    public String getPermutation(int n, int k) {
        
        int[] factors = new int[n + 1];
        List<Integer> list = new ArrayList<>();
        factors[0] = 1;
        for(int i = 1; i <= n; i++) {
            factors[i] = i * factors[i-1];
            list.add(i);
        }
        
        StringBuilder sb = new StringBuilder();
        // for index alignment： e.g: k == 12, k / 6 = 2, 
        // however, it should still belong the number start for list.get(1); So here need to make a alignment
        k--;
        while(n > 1) {
            int index = k / factors[n-1];
            sb.append(list.remove(index));
            k %= factors[n-1];
            n--;
        }
        sb.append(list.get(0));
        return sb.toString();
    }
}

```
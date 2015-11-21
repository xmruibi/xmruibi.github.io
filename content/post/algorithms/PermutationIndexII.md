+++
date = "2015-10-19T11:45:13-07:00"
levels = []
tags = ["Permutation", "Math"]
title = "Permutation Index II"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++
Given a permutation which may contain repeated numbers, find its index in all the permutations of these numbers, which are ordered in lexicographical order. The index begins at 1.

<!--more-->

### Example
Given the permutation `[1, 4, 2, 2]`, return `3`.

## Think
The key is counting from low digit(right) to higher digit(left), and checking how many digits are less than current digits. Then using that count as the coefficient with positional weight. However, there are duplicates occured. So that means we can use a hash map to do the count.
But the positional system should be modified. The multiple of the factorial of the duplicates occurence should be divided by original position system. That means the `entry.value` need to to the factorial and multiply those factors.
Why? For example, n numbers with 2 duplicates, like `2,4,3,3`, when `4`

## Solution

```java
public class Solution {
    /**
     * @param A an integer array
     * @return a long integer
     */
    public long permutationIndexII(int[] A) {
        if(A == null || A.length == 0)
            return 0L;
        
        int pos = 2;
        long factor = 1;
        long index = 1;
        for(int i = A.length - 2; i >= 0; i--) {
            HashMap<Integer, Integer> map = new HashMap<>();
            int cnt = 0;
            // count itself
            map.put(A[i], 1);
            for(int j = i + 1; j < A.length; j++) {
                // count all occurence on following element in Array
                map.put(A[j], map.containsKey(A[j])?map.get(A[j])+1:1);
                if(A[i] > A[j])
                    cnt++;
            }
            index += (cnt*factor)/factorialMultiple(map);
            factor *= pos;
            pos++;
        }
        
        return index;
    }
    
    private int factorialMultiple(HashMap<Integer, Integer> map) {
        int res = 1;
        for(int value : map.values()) {
            // do the factor on occurence
            int factor = 1;
            for(int i = 1; i <= value; i++)
                factor*= i;
            // get the multiple of occurence factor
            res *= factor;
        }
        return res;
    }
}
```
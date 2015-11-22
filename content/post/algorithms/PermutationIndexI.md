+++
date = "2015-10-19T11:43:13-07:00"
levels = []
tags = ["Permutation", "Math"]
title = "Permutation Index"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Given a permutation which contains no repeated number, find its index in all the permutations of these numbers, which are ordered in lexicographical order. The index begins at 1.
<!--more-->

### Example
Given `[1,2,4]`, return `1`.


## Thinking

Illustrating by manually getting the index of {2, 4, 3, 1}. Since this is a 4-element set, we know there are 4! permutations (4! = 4*3*2*1). If the set only had 3 elements, we would have 3*2*1 permutations. If the set only had 2 elements, we would have 2!=2*1 permutations; and so on.
 
ASIDE: The decimal system of counting is a positional system. A 3-element decimal number, for instance, has the following three positional weights: hundred, ten, unit. Hence, we know the value of the number 472 because we understand: 4*hundred + 7*ten + 2*unit.

If we treat our 4-element set as a positional system, then we get the following positional weights: 3!, 2!, 1!, 0. So that the index of {2, 4, 3, 1} is: x*3!+y*2!+z*1!+w*0. Presently it suffices to find the values of x,y,z to calculate the index (we ignore w because it is paired with 0). x,y,z are counters: the number of succeeding elements less than the element being considered. For example, in {2, 4, 3, 1}, there are two succeeding elements less than 4 (namely 3 and 1). For 2 it's 1 (1); for 4 it's 2 (3 and 1); for 3 it's 1 (1); for 1 it's 0. Now we can calculate the index of {2, 4, 3, 1} as: x=1, y=2, z=1: 
 	`x*3!+y*2!+z*1!+w*0 = 1*3! + 2*2! + 1*1! = 6 + 4 + 1 = 11`.

> The key is counting from low digit(right) to higher digit(left), and checking how many digits are less than current digits. Then using that count as the coefficient with positional weight.

## Solution
```java
public class Solution {
    /**
     * @param A an integer array
     * @return a long integer
     */
    public long permutationIndex(int[] A) {
        
        if(A == null || A.length == 0)
            return 0L;
        
        int pos = 2;
        long factor = 1;
        long index = 1;
        for(int i = A.length - 2; i >= 0; i--) {
            int cnt = 0;
            for(int j = i + 1; j < A.length; j++) {
                if(A[i] > A[j])
                    cnt++;
            }
            index += (cnt*factor);
            factor *= pos;
            pos++;
        }
        
        return index;
    }
}

```

## Complexity Analysis
Two loop: `i range 0 -> length - 2` and `j range i + 1 -> length - 1`, So it is `O(n^2)`;
Constant Space with some integer variable, Space: `O(1)`;



+++
date = "2015-10-20T10:43:13-07:00"
levels = []
tags = ["Math"]
title = "Digit Counts"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

Count the number of k's between 0 and n. k can be 0 - 9.
<!--more-->

### Example
if n=12, k=1 in `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]`, we have `FIVE` 1's `(1, 10, 11, 12)`

## Think #1
- Brute Force: Check each digit in number form (0 -> n) then get the count;

## Solution #1
```java
	public int digitCounts(int k, int n) {
        int[] record = new int[10];
        Arrays.fill(record,0);
        for (int i=0;i<=n;i++){
            String temp = Integer.toString(i);
            for (int j=0;j < temp.length();j++){
                int ind = (int) (temp.charAt(j)-'0');
                record[ind]++;
            }
        }
        return record[k];            
    }

```
## Think #2
- Math:
	- When current digit less than `k`, the current count should be `higher digits x digit position`;
	- When current digit equal to `k`, the current count should be `higher digits x digit position + lower digits + 1`;
	- When current digit larger than `k`, the current count should be `higher digits + 1(itself) x digit position`;
	- When `k` == 0 and the current digit larger than `k`, the higher digits x digit position and it need to add one in the last result;


## Solution #2
```
class Solution {
    /*
     * param k : As description.
     * param n : As description.
     * return: An integer denote the count of digit k in 1..n
     */
    public int digitCounts(int k, int n) {
        int digit = 1;
        int cnt = 0;
        while(digit <= n) {
            int low = n % digit; // lower digits;
            int high = n / (digit*10); // higher digits;
            int cur = n / digit % 10;
            if(cur == k) {
                // higher digits * digit + lower digits + 1;
                cnt += ((high * digit) + low + 1);
            }else if(cur < k) {
                // higher digits * digit
                cnt += (high * digit);
            }else{
                // (higher digits + 1: itself) * digit
                cnt += ((high + (k == 0?0:1)) * digit);   
            }
            digit *= 10;
        }
        
        return cnt + (k == 0 ? 1 : 0);
    }
};
```
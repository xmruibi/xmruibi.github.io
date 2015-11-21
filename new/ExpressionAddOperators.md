+++
date = "2015-11-12T12:43:13-07:00"
levels = ["Hard"]
tags = ["String", "Backtracking", "Math"]
title = "Expression Add Operators"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given a string that contains only digits 0-9 and a target value, return all possibilities to add binary operators (not unary) +, -, or * between the digits so they evaluate to the target value.
<!--more-->
### Examples
```
"123", 6 -> ["1+2+3", "1*2*3"] 
"232", 8 -> ["2*3+2", "2+3*2"]
"105", 5 -> ["1*0+5","10-5"]
"00", 0 -> ["0+0", "0-0", "0*0"]
"3456237490", 9191 -> []
```

## Think
This problem has a lot of edge cases to be considered:

1. overflow: we use a long type once it is larger than Integer.MAX_VALUE or minimum, we get over it.
2. 0 sequence: because we can't have numbers with multiple digits started with zero, we have to deal with it too.
3. a little trick is that we should save the value that is to be multiplied in the next recursion.


## Solution
```java
class Solution {

    public List<String> addOperators(String num, int target) {
        List<String> res = new ArrayList<>();
        helper(res, "", num, 0, target, 0L, 0L);
        return res;
    }
    
    private void helper(List<String> res, String cur, String num, int idx, int target, long preVal, long nextVal) {
       if(idx == num.length()) {
            if(preVal == target)
                res.add(new String(cur));
            return;
       }
       
       for(int i = idx; i < num.length(); i++) {
           if(i != idx && num.charAt(idx) == '0') break;
           String sbstr = num.substring(idx, i+1);
           long curVal = Long.parseLong(sbstr);
           if(idx == 0)
                helper(res, sbstr, num, i+1, target, curVal, curVal);
           else {
               helper(res, cur + "+" + curVal, num, i+1, target, preVal + curVal,  curVal);
               helper(res, cur + "-" + curVal, num, i+1, target, preVal - curVal, 0 - curVal);
               helper(res, cur + "*" + curVal, num, i+1, target, preVal - nextVal + nextVal * curVal, nextVal * curVal);
           }
       }
    }
}
```
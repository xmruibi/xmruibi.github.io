+++
date = "2015-11-09T19:43:13-07:00"
levels = ["Medium"]
tags = ["String", "Stack"]
title = "Delete Digits"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

Given string A representative a positive integer which has N digits, remove any k digits of the number, the remaining digits are arranged according to the original order to become a new positive integer.

Find the smallest integer after remove k digits.

N <= `240` and k <= N,
<!--more-->
### Example
Given an integer A = `"178542"`, k = `4`

return a string `"12"`

## Think
- Setup a Stack. 
- Iterate through input number
- If current digit is less than the peek of stack, pop out the stack until the peek is not larger than current digit. 
- Push current digit
- Limit the pop out times by K. That means the pop action is regarded as remove digit. So when the pop out times is not less than K, keep push the digit even if it is less than peek element.
- Rebuild the output string by reading elements in stack.
- Two corner case should be careful: 
    - When the iterate through digits finished, the remove(pop out) counter still less than K, we should ignore the first  `k-count` element in stack.
    - When the output result has the zero on first element, remove the zero.

## Solution
```java
    /**
     *@param A: A positive integer which has N digits, A is a string.
     *@param k: Remove k digits.
     *@return: A string
     */
    public String DeleteDigits(String A, int k) {
        if(A == null || A.length() == 0)
            return "";
        // setup stack
        Stack<Integer> stack = new Stack<>();
        // read digits from input string
        int removeCnt = 0;
        for(char c : A.toCharArray()) {
            int cur = c - '0';
            // pop out the digit larger than current digit
            while(!stack.isEmpty() && removeCnt < k && stack.peek() > cur) {
                stack.pop();
                removeCnt ++;
            }
            stack.push(cur);
        }
        
        StringBuilder sb = new StringBuilder();
        while(!stack.isEmpty()) {
            // corner case one:
            if(removeCnt < k) {
                stack.pop();
                removeCnt ++;
            }else
                sb.insert(0, "" + stack.pop());
        }
        // corner case two:
        while(sb.charAt(0) == '0')
            sb.deleteCharAt(0);
        
        return sb.toString();
    }
```
+++
date = "2015-11-13T16:13:13-07:00"
levels = []
tags = ["String", "Math", "Complex Implement"]
title = "Valid Number"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Validate if a given string is numeric.
<!--more-->

### Example
`"0"` => `true`

`" 0.1 "` => `true`

`"abc"` => `false`

`"1 a"` => `false`

`"2e10"` => `true`

## Think
- This question focus on thinking about all of corner case
	1. sign before the number (one sign; two sign)
	2. space before the number
	3. invalid character before / after the number
	4. 'e' or 'E' in the middle of number
	5. space after the number
	6. decimal checker


## Solution
```java
	public boolean isNumber(String s) {
        s = s.trim();
        int hasNum = 0;
        boolean allowE = true;
        boolean allowD = true;
        boolean afterE = true;

        for (int idx = 0; idx < s.length(); idx++) {
            char c = s.charAt(idx);
            if (c >= '0' && c <= '9') {
                hasNum++;
                if(!afterE)
                    afterE = true;
            } else if ((c == 'e' || c == 'E') && hasNum > 0 && allowE) {
                allowE = afterE = false;
            } else if (c == '.' && allowD && allowE) {
                allowD  = false;
            } else if(c == '-' || c == '+') {
                if(idx != 0 && s.charAt(idx-1) != 'e') {
                    return false;
                }
            }else
                return false;
        }
        return hasNum>0 && afterE;
    }
```


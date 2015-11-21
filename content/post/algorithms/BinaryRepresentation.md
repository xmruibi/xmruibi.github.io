+++
date = "2015-10-24T16:13:13-07:00"
levels = []
tags = ["Math", "Tenary - Binary"]
title = "Binary Representation"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

Given a (decimal - e.g. 3.72) number that is passed in as a string, return the binary representation that is passed in as a string. If the fractional part of the number can not be represented accurately in binary with at most 32 characters, return `ERROR`.

<!--more-->
### Example
For n = `"3.72"`, return `"ERROR"`.

For n = `"3.5"`, return `"11.1"`.


## Think
- For Integer part, we use `% 2` to get each digit from lowest bit to highest bit, or use a loop to make `&` with `1` and left shift until it get zero.
- For decimal part, we can use $$\times2$$ approach. For example: `int n = 0.75; n*2 = 1.5;` Therefore, the first digit of binary number after `.` is 1 (i.e. 0.1).  After constructed the first digit, n= n*2-1;
 

## Solution

```java
public class Solution {
    /**
    * Therefore, the first digit of binary number after '.' is 1 (i.e. 0.1).  After constructed the first digit, n= n*2-1 
     *@param n: Given a decimal number that is passed in as a string
     *@return: A string
     */
    public String binaryRepresentation(String n) {
        int intPart = Integer.parseInt(n.substring(0, n.indexOf('.')));
        StringBuilder res = new StringBuilder();
        while(intPart != 0) {
            res.insert(0, "" + (intPart & 1));
            intPart >>= 1;
        }
        if(res.length() == 0)
            res.append(0);
        double decPart = Double.parseDouble(n.substring(n.indexOf('.')));
        String decBit = "";
        // if it has decimal part, creat '.' in result string
        if(decPart > 0.0)
            res.append(".");
        // to count how many digit in decimal binary result
        int cnt = 0;
        while(decPart > 0.0) {
            double cur = (decPart * 2);
            cnt++;
            if(cnt > 32)
                return "ERROR";
            if(cur >= 1) {
                res.append(1);
                decPart = cur - 1.0;
            }else {
                res.append(0);
                decPart = cur;
            }
        }
        
        return res.toString();
    }
}
```
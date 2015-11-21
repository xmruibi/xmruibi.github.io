+++
date = "2015-10-16T21:43:13-07:00"
levels = []
tags = ["String", "Integer", "Roman"]
title = "Integer to Roman"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++
Given an integer, convert it to a roman numeral.

The number is guaranteed to be within the range from `1` to `3999`.
<!--more-->

### Example

`4` -> `IV`

`12` -> `XII`

`21` -> `XXI`

`99` -> `XCIX`


## Solution:

```
public class Solution {
    /**
     * @param n The integer
     * @return Roman representation
     */
    public String intToRoman(int n) {
        int[] numTab = {1,4,5,9,10,40,50,90,100,400,500,900,1000};
        String[] romanTab = {"I", "IV", "V", "IX", "X", "XL", "L", "LC", "C", "CD", "D", "DM","M"};
        
        StringBuilder sb = new StringBuilder();
        for(int i = numTab.length - 1; i >= 0; i--) {
            while(n >= numTab[i]) {
                sb.append(romanTab[i]);
                n -= numTab[i];
            }
        }
        return sb.toString();
    }
}
```

+++
date = "2015-10-16T21:43:13-07:00"
levels = []
tags = ["String", "Integer", "Roman"]
title = "Roman to Integer"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++


Given a roman numeral, convert it to an integer.

The answer is guaranteed to be within the range from 1 to 3999.
<!--more-->

### Example
`IV` -> `4`

`XII` -> `12`

`XXI` -> `21`

`XCIX` -> `99`

### Clarification


|Symbol | Value|
|-----|------|
| I | 1 |
|V	| 5 |
|X	| 10 |
|L	| 50 |
|C	| 100 |
|D	| 500 |
|M  | 1,000 |

- 同一数码最多只能出现三次，如40不可表示为XXXX，而要表示为XL。
- 在较大的罗马数字的右边记上较小的罗马数字，表示大数字加小数字。
- 在较大的罗马数字的左边记上较小的罗马数字，表示大数字减小数字。
- 左减的数字有限制，仅限于I、X、C。比如45不可以写成VL，只能是XLV。
- 但是，左减时不可跨越一个位数。比如，99不可以用IC（100 - 1）表示，是用XCIX（[100 - 10] + [10 - 1]）表示。
- 左减数字必须为一位，比如8写成VIII，而非IIX。
- 右加数字不可连续超过三位，比如14写成XIV，而非XIIII。（见下方“数码限制”一项。）


```
public class Solution {
    /**
     * @param s Roman representation
     * @return an integer
     */
    public int romanToInt(String s) {
        // Write your code here
        HashMap<Character, Integer> map = new HashMap<>();
        map.put('I', 1);map.put('V', 5);
        map.put('X', 10);map.put('L', 50);
        map.put('C', 100);map.put('D', 500);
        map.put('M', 1000);
        
        int res = 0;
        for (int i = 0; i < s.length() ; i++) {
            if(i < s.length() - 1 && map.get(s.charAt(i)) < map.get(s.charAt(i+1)) )
                res -= map.get(s.charAt(i));
            else
                res += map.get(s.charAt(i));
        }
        
        return res;
    }
}

```
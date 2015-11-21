+++
date = "2015-11-12T12:43:13-07:00"
levels = ["Hard"]
tags = ["Math", "String", "Complex Implement"]
title = "Integer to English Words"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Convert a non-negative integer to its english words representation. Given input is guaranteed to be less than 231 - 1.
<!--more-->
### Example
`123` -> `"One Hundred Twenty Three"`

`12345` -> `"Twelve Thousand Three Hundred Forty Five"`

`1234567` -> `"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"`

### Hint

- Did you see a pattern in dividing the number into chunk of words? For example, 123 and 123000.

- Group the number by thousands (3 digits). You can write a helper function that takes a number less than 1000 and convert just that chunk to words.

- There are many edge cases. What are some good test cases? Does your code work with input such as `0` ? Or `1000010`? (middle chunk is zero and should not be printed out)


## Think
- The regular pattern in English word to count number is splitting by `1000`, so set each `000.` by `"Thousand ", "Million ", "Billion "`
- Be aware to number less than `20`


## Solution
```java
class Solution {
    private final String[] lessThan20 = {"", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "};
    private final String[] tens = {"", "Ten ", "Twenty ", "Thirty ", "Forty ", "Fifty ", "Sixty ", "Seventy ", "Eighty ", "Ninety "};
    private final String[] thousands = {"", "Thousand ", "Million ", "Billion "};

    public String numberToWords(int num) {
        if (num == 0)
            return "Zero";
        int i = 0;
        String words = "";
        
        while(num > 0) {
            if (num % 1000 != 0)
                words = eachThousand(num % 1000)+ thousands[i] + words;
            num /= 1000;
            i++;
        }
        return words.trim();
    }
    
    private String eachThousand(int each) {
        StringBuilder sb = new StringBuilder();
        if(each / 100 > 0) {
            sb.append(lessThan20[each / 100] + "Hundred ");
        }
        int ten = each % 100;
        if(ten >= 20) {
            sb.append(tens[ten/10]);
            sb.append(lessThan20[ten%10]);
        }else {
            sb.append(lessThan20[ten]);
        }
        return sb.toString();
    }
}
```
+++
date = "2015-11-10T22:43:13-07:00"
levels = ["Medium"]
tags = ["String", "Array"]
title = "Bull and Cows"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

You are playing the following Bulls and Cows game with your friend: You write down a number and ask your friend to guess what the number is. Each time your friend makes a guess, you provide a hint that indicates how many digits in said guess match your secret number exactly in both digit and position (called `"bulls"`) and how many digits match the secret number but locate in the wrong position (called `"cows"`). Your friend will use successive guesses and hints to eventually derive the secret number.
<!--more-->

### Example

```
Secret number:  "1807"
Friend's guess: "7810"
```
`1` bull and `3` cows. (The bull is `8`, the cows are `0`, `1` and `7`.)


Write a function to return a hint according to the secret number and friend's guess, use `A` to indicate the bulls and `B` to indicate the cows. In the above example, your function should return `"1A3B"`.

Please note that both secret number and friend's guess may contain duplicate digits, for example:

```
Secret number:  "1123"
Friend's guess: "0111"
```
In this case, the 1st 1 in friend's `guess` is a bull, the 2nd or 3rd 1 is a cow, and your function should return `"1A1B"`.
You may assume that the secret number and your friend's guess only contain digits, and their lengths are always equal.

## Think
It's pretty tricky to think about one pass solution without HashMap.    
Here are some pattern we should notice.
    1. Every character in string is number `0` to `9`
    2. Number in `guess` and `secret` should also be recorded during the pass
    3. Avoid duplicate is tough


- Solve it by set a int array with length of 10 for counting
- meet a number in `guess` do a minus on `arr[guess_digit]` while meet a number in `secrett` do a addition on `arr[secret_digit]`
- check `arr[secret_digit]` if it is negative, which means that number should existed in `guess` number
- check `arr[guess_digit]` if it is negative, which means that number should existed in `secret` number
- when iteration on number is the same from `guess` and `secret` numbers, that should be the `bull` but without any modification on counting array.

## Solution
```java
    public String getHint(String secret, String guess) {
        int cntA = 0;
        int cntB = 0;
        int[] valIdx = new int[10];
        for(int i = 0; i < secret.length(); i++) {
            int sIdx = secret.charAt(i) - '0';
            int gIdx = guess.charAt(i) - '0';
            if(gIdx == sIdx)
                cntA++;
            else{ 
                if(valIdx[sIdx] < 0) 
                    cntB++;
                if(valIdx[gIdx] > 0) 
                    cntB++;
            }
            valIdx[sIdx]++;
            valIdx[gIdx]--;
        }
        return "" + cntA + "A" + cntB + "B";
    }
```











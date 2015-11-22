+++
date = "2015-11-04T15:43:13-07:00"
levels = []
tags = ["String", "Two Pointers"]
title = "Encode String"
topics = ["Algorithm"]

+++
Given a String like `"ABBCCCC"`, encode it to `A2B4C`. Avoid to make the encode string larger than original string. Do it in-place! The repeat count should less than 10.
<!--more-->

## Think
- Pass the char array by reversed order so that it's easier to modify the char to count number in-place
- Index passing should from `len - 2` to `-1`, this is tricky part to avoid the case when index is zero cannot be count
- The in-place modification index come from the `len - 1`, rewrite the result char by this index
- For the integer convert to character, it may need to use `Character.forDigit(count, 10)`
- For those rest char less than rewrite index, set them as null character `"\u0000"`

## Solution
```java
class Solution {
  public static void main(String[] args) {
    String str = "ABC";
    inplaceEncode(str.toCharArray());
  }
  
  public static void inplaceEncode(char[] chars){
    int idx = chars.length - 1;
    int count = 1;
    for(int i = chars.length - 2; i >= -1; i--) {
      if(i>=0 && chars[i] == chars[i+1])
        count++;
      else {
        char cur = chars[i+1];
        if(count > 1){
          chars[idx--] = cur;
          chars[idx--] = Character.forDigit(count, 10);
        }else
          chars[idx--] = cur;
        count = 1;
      }
    }
    
    // place the rest char position as null char
    while(idx>=0)
      chars[idx--] = '\u0000';
  }
}
```
+++
date = "2015-11-03T16:13:13-07:00"
levels = []
tags = ["String", "Array"]
title = "Reverse Word"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++
Given an input string, reverse the string word by word.

For example,
Given s = `"the sky is blue"`,
return `"blue is sky the"`.
<!--more-->
Have you met this question in a real interview? Yes

### Note
- What constitutes a word?
	A sequence of non-space characters constitutes a word.
- Could the input string contain leading or trailing spaces?
	Yes. However, your reversed string should not contain leading or trailing spaces.
- How about multiple spaces between two words?
	Reduce them to a single space in the reversed string.

## Solution # StringBuilder
```java
    /**
     * @param s : A string
     * @return : A string
     */
    public String reverseWords(String s) {
        StringBuilder sb = new StringBuilder();
        int idx = 0, prev = 0;
        while(idx <= s.length()) {
            if(idx == s.length() || s.charAt(idx) == ' ') {
                if(idx != prev) 
                    sb.insert(0, s.substring(prev, idx) + " ");
                prev = idx + 1;
            }
            idx++;
        }
        return sb.toString().trim();
    }
```

## Solution # Times Reverse
```java
  public String reverseWords(String s) {
        if(s == null || s.length() == 0)
            return "";
            
        char[] carr = s.toCharArray();
        reverse(carr, 0, carr.length - 1);
        
        int prev = 0, idx = 0;
        while(idx <= carr.length) {
            if(idx == carr.length || carr[idx] == ' ') {
                if(idx > prev) {
                    reverse(carr, prev, idx - 1);
                }
                prev = idx + 1;
            }
            idx ++;
        }
        return new String(carr).trim();
    }
    
    private void reverse(char[] arr, int l, int r) {
        while(l < r) {
            char tmp = arr[l];
            arr[l++] = arr[r];
            arr[r--] = tmp;
        }
    }
```
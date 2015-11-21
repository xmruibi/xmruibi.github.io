+++
date = "2015-11-14T13:43:13-07:00"
levels = ["Medium"]
tags = ["String","Hash Map"]
title = "Repeated DNA Sequences"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: "ACGAATTCCG". When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.

Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.
<!--more-->
### Example

Given `s` = `"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"`, Return:  `["AAAAACCCCC", "CCCCCAAAAA"]`.

## Think #Rolling Hash
- The idea based on the rolling hash, we store each segment as a hash code.
- If the segment repeated, its hashcode should be the same.
- Iterate through the input String, find each segment and its hashcode.
- Check the index map where has a index list more than one size.
- Just record a substring by the index bound from `list.get(0)`
- O(n) time complexity

## Solution #Rolling Hash
```java
    public List<String> findRepeatedDnaSequences(String s) {
        Set<String> res = new HashSet<>();
        if(s==null||s.length()==0)
            return new ArrayList(res);
        Map<Character, Integer> dict = new HashMap<>();
        dict.put('A',0); dict.put('C',1); dict.put('G',2); dict.put('T',3);
       //int A_SIZE_POW_9 = (int) Math.pow(dict.size(), 9);
        Set<Integer> hashCodes = new HashSet<>();
        int hashCode = 0;
        for(int i=0;i<s.length();i++){
            if(i>9) // remove first 
                hashCode -= Math.pow(4,9)*dict.get(s.charAt(i-10));
            hashCode = 4*hashCode + dict.get(s.charAt(i));
            if(i>8&&!hashCodes.add(hashCode)) // set add operation return true
                res.add(s.substring(i-9,i+1));
        }
        return new ArrayList(res);
    }
```
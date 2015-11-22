+++
date = "2015-10-01T20:33:13-07:00"
levels = []
tags = ["Sort"]
title = "Largest Number"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++


Given a list of non negative integers, arrange them such that they form the largest number.

For example, given `[3, 30, 34, 5, 9]`, the largest formed number is `9534330`.

### Note
The result may be very large, so you need to return a string instead of an integer.

## Think
- Sort the elements in array by the rule of pair combination:
    - a, b -> `compare(ab, ba)`;
- One pass the sorted array and make the largest number

## Solution
```java
    public String largestNumber(int[] nums) {
        if(num==null || num.length==0)
            return "";
        
        // customized sort method only can sort the object
        // so here it should change to a String array
        String[] Snum = new String[num.length];
        for(int i=0;i<num.length;i++)
            Snum[i] = num[i]+"";
    
        Comparator<String> comp = new Comparator<String>(){
            @Override
            public int compare(String str1, String str2){
                String s1 = str1+str2;
                String s2 = str2+str1;
                return s1.compareTo(s2);
            }
        };
    
        Arrays.sort(Snum,comp);
        if(Snum[Snum.length-1].charAt(0)=='0')
            return "0";
    
        StringBuilder sb = new StringBuilder();
    
        for(String s: Snum)
            sb.insert(0, s);
    
        return sb.toString();
    }
```
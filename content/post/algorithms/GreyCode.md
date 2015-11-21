+++
date = "2015-11-20T22:43:13-07:00"
levels = ["Medium"]
tags = ["Math", "Array"]
title = "Few questions from Old Version"
topics = ["Leetcode","Amazon", "Algorithm"]
banner = "/media/leetcode.png"
+++
<!--more-->

## Probelam I: Grey Code
Given 2 numbers. Find if they are consecutive gray (grey) code sequences.

## Solution 
```java
public class Solution{
	public int greyCode(byte term1, byte term2) {
		byte x = (byte)(term1 ^ term2);
		int total = 0;
		while(x != 0){
			x = (byte) (x & (x - 1));
			total++;
		}
		if(total == 1) 
			return 1; 
		else 
			return 0;
	}
}
```

## Probelam II: Remove Vowels

## Solution 
```java
public class Solution{
	public int removeVowel(String str) {
		StringBuffer sb = new StringBuffer();
		String v = "aeiouAEIOU";
		for(int i = 0; i < string.length(); i++){
			if(v.indexOf(string.charAt(i)) > -1)
		 		continue;
			sb.append(string.charAt(i));
		}
		return sb.toStirng();
	}
}
```

## Problem III:
String rotation (if string is the rotate of the other)

## Solution
```java
boolean isRotation(String s1,String s2) {  
    return (s1.length() == s2.length()) && ((s1+s1).indexOf(s2) != -1);  
} 
```


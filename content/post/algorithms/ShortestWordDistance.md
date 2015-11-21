+++
date = "2015-11-09T09:43:13-07:00"
levels = ["Medium"]
tags = ["String", "Hash Map"]
title = "Shortest Word Distance"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given a list of words and two words word1 and word2, return the shortest distance between these two words in the list.
<!--more-->

## Problem I
### Example
Assume that words = `["practice", "makes", "perfect", "coding", "makes"]`.
Given word1 = `“coding”`, word2 = `“practice”`, return `3`.
Given word1 = `"makes"`, word2 = `"coding"`, return `1`.

### Note
You may assume that word1 does not equal to word2, and word1 and word2 are both in the list.

### Think
- The problem can be solved by one-pass of the array. 
- Iterate through the array, use two pointers pointing to the index of the word1 and word2, maintain the minimum distance.


### Solution
```java
	 public int shortestDistance(String[] words, String word1, String word2) {
		 if(words == null)
		    throw new IllegalArgumentException("Invalid Input!");
		 int w1Idx = -1, w2Idx = -1;
		 int min = Integer.MAX_VALUE;
		 for(int i = 0; i < words.length; i++) {
			 if(words[i].equals(word1))
				 w1Idx = i;
			 else if(words[i].equals(word2))
				 w2Idx = i;
			 if(w1Idx!=-1 && w2Idx!=-1){
				 min = Math.min(min, Math.abs(w2Idx-w1Idx));
			 }
		 }
		 return min;
	 }
```

## Problem II
This is a follow up of Problem I.The only difference is now you are given the list of words and your method will be called repeatedly many times with different parameters. How would you optimize it?
Design a class which receives a list of words in the constructor, and implements a method that takes two words word1 and word2 and return the shortest distance between these two words in the list.

### Example,
Assume that words = `["practice", "makes", "perfect", "coding", "makes"]`.
Given word1 = `"coding"`, word2 = `"practice"`, return `3`.
Given word1 = `"makes"`, word2 = `"coding"`, return `1`.

### Think
- Since the calls are from different words, we have to save the index for each word. So HashMap is a good choice. 
- Preprocess the list and save the word and its indexes as key and value in constructor. 


### Solution
```java
public class ShortestWordDistance {
  
    private final HashMap<String, List<Integer>> map;

	public ShortestWordDistance(String[] words) {
		map = new HashMap<>();
		for (int i = 0; i < words.length; i++) {
			List<Integer> list = new ArrayList<>();
			if (map.containsKey(words[i]))
				list = map.get(words[i]);
			list.add(i);
			map.put(words[i], list);
		}
	}

	public int shortestDistanceII(String word1, String word2) {
		int min = Integer.MAX_VALUE;
		if (!map.containsKey(word1) || !map.containsKey(word2))
			return min;
		for (int i : map.get(word1)) {
			for (int j : map.get(word2)) {
				min = Math.min(min, Math.abs(i - j));
			}
		}
		return min;
	}
}

```

## Problem III
This is a follow up of Problem I. The only difference is **now word1 could be the same as word2**.
Given a list of words and two words word1 and word2, return the shortest distance between these two words in the list.
word1 and word2 may be the same and they represent two individual words in the list.

### Example,
Assume that words = `["practice", "makes", "perfect", "coding", "makes"]`.
Given word1 = `"makes"`, word2 = `"coding"`, return `1`.
Given word1 = `"makes"`, word2 = `"makes"`, return `3`.

### Think
- Most code should remain the same as the Problem I. But need to deal with the situation that word1 and word2 are the same.
- `w1Idx` always record the index when `word[i].equals(word1)` but `w2Idx` should be assigned as the value from `w1Idx` when `word1 == word2`

### Solution
```java
	 public int shortestDistance(String[] words, String word1, String word2) {
		 if(words == null)
		    throw new IllegalArgumentException("Invalid Input!");
		 int w1Idx = -1, w2Idx = -1;
		 int min = Integer.MAX_VALUE;
		 for(int i = 0; i < words.length; i++) {
			 if(words[i].equals(word1))
				 w1Idx = i;
			 else if(words[i].equals(word2)) // else if to avoid w2Idx be recorded whrn word1==word2
				 w2Idx = i;
			 if(w1Idx!=-1 && w2Idx!=-1 && w1Idx != w2Idx){
				 min = Math.min(min, Math.abs(w2Idx-w1Idx));
			 }
			 if(word2.equals(word1))
			    w2Idx = w1Idx; // update previous index record
		 }
		 return min;
	 }
```


## Follow Up






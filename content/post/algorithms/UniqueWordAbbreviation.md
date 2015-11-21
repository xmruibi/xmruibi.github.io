+++
date = "2015-11-12T12:43:13-07:00"
levels = ["Medium"]
tags = ["Hash Map", "String", "Complex Implement"]
title = "Unique Word Abbreviation"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

An abbreviation of a word follows the form `<first letter><number><last letter>`. 
<!--more-->
Below are some examples of word abbreviations:
```
    a) it                      --> it    (no abbreviation)
    
         1
    b) d|o|g                   --> d1g
    
                  1    1  1
         1---5----0----5--8
    c) i|nternationalizatio|n  --> i18n
    
                  1
         1---5----0
    d) l|ocalizatio|n          --> l10n
```

Assume you have a dictionary and given a word, find whether its abbreviation is unique in the dictionary. A word's abbreviation is unique if no other word from the dictionary has the same abbreviation.

### Example
Given dictionary = [ "deer", "door", "cake", "card" ]

`isUnique("dear")` -> `false`; 

`isUnique("cart")` -> `true` ;

`isUnique("cane")` -> `false`;

`isUnique("make")` -> `true`;

## Think
- Save dictionary words in a set
- Save the abbreviation from dictionary word to a HashMap.
- HashMap has the key with abbreviation and value with the original word
- check `isUnique(word)` by make abbreviation from that word and compare with the hashmap
- If hashmap doesn't contain that word, return true. 
- If hashmap contains that word, we should compare if the word is equal to the word saved in hashmap.

## Solution
```java
public class UniqueWordAbbreviation {

	Set<String> dict = new HashSet<>(); // keep the dictionary has unique words
	Map<String, String> abbrDict = new HashMap<>();

	public UniqueWordAbbreviation(String[] dictionary) {
		for (String str : dictionary) {
			if (dict.contains(str))
				continue;
			String abbr = makeAbbr(str);
			if (!abbrDict.containsKey(abbr))
				abbrDict.put(abbr, str);
			else
				abbrDict.put(abbr, "");
			dict.add(str);
		}
	}

	public boolean isUnique(String word) {
		String abbr = makeAbbr(word);
		if (abbrDict.containsKey(abbr))
			return word.equals(abbrDict.get(abbr));
		return true;
	}

    private String makeAbbr(String str) {
		if (str == null || str.length() <= 2)
			return str;
		int mid = str.length() - 2;
		StringBuilder sb = new StringBuilder();
		sb.append(str.charAt(0));
		sb.append(mid);
		sb.append(str.charAt(str.length() - 1));
		return sb.toString();
	}
}
```




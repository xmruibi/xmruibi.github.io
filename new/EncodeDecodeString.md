+++
date = "2015-11-10T22:43:13-07:00"
levels = ["Medium"]
tags = ["String"]
title = "Encode and Decode String"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.
<!--more-->
Machine 1 (sender) has the function:
```java
public String encode(String[] strs) {
  // ... your code
  return encoded_string;
}
```

Machine 2 (receiver) has the function:

```java
public String[] decode(String s) {
  //... your code
  return strs;
}
```

So Machine 1 does:

```java
String encoded_string = encode(strs);
```

and Machine 2 does:
```java
String[] strs2 = decode(encoded_string);
```

`strs2` in Machine 2 should be the same as `strs` in Machine 1.

Implement the encode and decode methods.

### Note
The string may contain any possible characters out of 256 valid ascii characters. Your algorithm should be generalized enough to work on any possible characters.

Do not use class **member / global / static variables** to store states. Your encode and decode algorithms should be **stateless**.

Do not rely on any library method such as eval or serialize methods. You should implement your own encode/decode algorithm.

## Think
- In theoretic way, there should be nothing can do separation for Strings
- So just make the encode as adding the length of word and "#" before the word
- Decode function should be carefully designed


## Solution
```java
public class EncodeDecodeString {
	public String encode(List<String> strs) {
		StringBuilder sb = new StringBuilder();
		for (String str : strs) {
			sb.append(str.length());
			sb.append("#");
			sb.append(str);
		}

		return sb.toString();
	}

	public List<String> decode(String str) {
		List<String> list = new ArrayList<>();
		int strlen = 0;
		for (int i = 0; i < str.length(); i++) {
			char cur = str.charAt(i);
			if (cur == '#' && strlen > 0) {
				StringBuilder sb = new StringBuilder();
				while (strlen > 0 && i < str.length()) {
					sb.append(str.charAt(++i));
					strlen--;
				}
				list.add(sb.toString());
			} else
				strlen = strlen * 10 + (cur - '0');
		}
		return list;
	}
}
```



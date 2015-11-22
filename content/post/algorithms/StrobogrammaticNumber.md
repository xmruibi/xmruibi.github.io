+++
topics = ["Leetcode","Algorithm"]
date = "2015-11-08T22:10:29-07:00"
levels = ["Medium"]
tags = ["Combination", "String", "Backtracking"]
title = "Strobogrammatic Number"
banner = "/media/leetcode.png"
+++
A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).
<!--more-->
## Problem I
Write a function to determine if a number is strobogrammatic. The number is represented as a string.

For example, the numbers `"69"`, `"88"`, and `"818"` are all strobogrammatic.

### Solution
```java
public class Strobogrammatic {
	public boolean isStrobogrammatic(String num) {
		if (num == null || num.length() == 0)
			return true;
		int l = 0, r = num.length() - 1;
		while (l < r) {
			if (isEqual(num.charAt(l), num.charAt(r))) {
				l++;
				r--;
			} else
				return false;
		}
		return true;
	}

	private boolean isEqual(char l, char r) {
		if ((l == '9' && r == '6') || (l == '6' && r == '9')
				|| (l == '1' && r == '1') || (l == '8' && r == '8')
				|| (l == '0' && r == '0'))
			return true;
		else
			return false;
	}
	
    // Use HashMap
	public boolean isStrobogrammatic(String num) {
        if(num == null || num.length() == 0) {
            return true;
        }
         
        Map<Character, Character> map = new HashMap<>();
        map.put('0', '0');
        map.put('1', '1');
        map.put('8', '8');
        map.put('6', '9');
        map.put('9', '6');
         
        int lo = 0;
        int hi = num.length() - 1;
         
        while (lo <= hi) {
            char c1 = num.charAt(lo);
            char c2 = num.charAt(hi);
             
            if (!map.containsKey(c1) || map.get(c1) != c2) {
                return false;
            }
             
            lo++;
            hi--;
        }
         
        return true;
    }
}
```

## Problem II
A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down). Find all strobogrammatic numbers that are of length = n.

### Example,
Given n = 2, return `["11","69","88","96"]`.

### Think
- Typical backtracking to generate something question


### Solution
```java
	public static List<String> findStrobogrammatic(int n) {
        Map<Character, Character> map = new HashMap<>();
        map.put('0', '0');
        map.put('1', '1');
        map.put('8', '8');
        map.put('6', '9');
        map.put('9', '6');
        List<String> res = new ArrayList<>();
        // two cases: even or odd
        if(n%2==0)
        		generate(res, map, "", n);
        else{
            // the central digit can be any number
        	for(int i = 0; i <= 9; i++)
        		generate(res, map, ""+i, n);
        }
        return res;
	}
	
	private static void generate(List<String> res, Map<Character, Character> map, String cur, int n) {
		if(cur.length() == n) {
			res.add(new String(cur));
			return;
		}
		
		for(Map.Entry<Character, Character> entry : map.entrySet()) {
			String origin = new String(cur);
			cur = entry.getKey() + cur + entry.getValue();
			generate(res, map, cur, n);
			cur = origin;
		}
	}
```

## Problem III
A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Write a function to count the total strobogrammatic numbers that exist in the range of low <= num <= high.

### Example

Given low = "50", high = "100", return 3. Because 69, 88, and 96 are three strobogrammatic numbers.

### Note

Because the range might be a large number, the low and high numbers are represented as string.

### Solution
```java
public static int strobogrammaticInRange(String low, String high) {
		Map<Character, Character> map = new HashMap<>();
		map.put('0', '0');
		map.put('1', '1');
		map.put('8', '8');
		map.put('6', '9');
		map.put('9', '6');
		int[] cnt = new int[1];
		for (int n = low.length(); n <= high.length(); n++) {
			if (n % 2 == 0)
				generateII(cnt, map, "", n, low, high);
			else {
				for (int i = 0; i <= 9; i++)
					generateII(cnt, map, "" + i, n, low, high);
			}
		}
		return cnt[0];
	}

	private static void generateII(int[] cnt,
			Map<Character, Character> map, String cur, int n, String low,
			String high) {
		if (cur.length() == n) {
			if (cur.charAt(0) != '0' && compare(low, cur) < 0
					&& compare(cur, high) < 0)
				cnt[0]++;
			return;
		}

		for (Map.Entry<Character, Character> entry : map.entrySet()) {
			String origin = new String(cur);
			cur = entry.getKey() + cur + entry.getValue();
			generateII(cnt, map, cur, n, low, high);
			cur = origin;
		}
	}

	private static int compare(String s1, String s2) {
		return Integer.compare(Integer.parseInt(s1), Integer.parseInt(s2));
	}
```

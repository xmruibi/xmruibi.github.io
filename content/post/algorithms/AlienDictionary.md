+++
date = "2015-11-09T20:43:13-07:00"
levels = ["Medium"]
tags = ["Topological Sort", "String", "Graph", "Hash Map"]
title = "Alien Dictionary"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++
There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of words from the dictionary, where words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.
<!--more-->
### Example
Given the following words in dictionary,
`[
  "wrt",
  "wrf",
  "er",
  "ett",
  "rftt"
]`
The correct order is: `"wertf"`.

### Note
- You may assume all letters are in lowercase.
- If the order is invalid, return an empty string.
- There may be multiple valid order of letters, return any one of them is fine.


## Think
- Typical topological problem


## Solution
```java
	public static String alienOrder(String[] words) {
		// build up the node map, find node according to the char
		HashMap<Character, Node> map = new HashMap<>();
		// iterate through all provided words
		for (String str : words) {
			// read each word and learn their order
			map.put(str.charAt(0),
					map.containsKey(str.charAt(0)) ? map.get(str.charAt(0))
							: new Node(str.charAt(0)));
			for (int i = 1; i < str.length(); i++) {
				char cur = str.charAt(i);
				// ignore the adjacent equal characters
				if(cur == str.charAt(i-1))
					continue;
				Node node = map.containsKey(cur) ? map.get(cur) : new Node(cur);
				Node prev = map.get(str.charAt(i - 1));
				// make current node indegree plus one only if the previous node doesn't have current node in its neighborhood list 
				if (!prev.neighbors.contains(node) ) {
					node.indegree++;
					map.get(str.charAt(i - 1)).neighbors.add(node);
				}
				map.put(cur, node);
			}
		}

		// find the node with zero indegree
		Queue<Node> queue = new LinkedList<>();
		for (Node node : map.values())
			if (node.indegree == 0)
				queue.offer(node);
		// build the final string,
		StringBuilder sb = new StringBuilder();
		// each time pop the node with zero indegree 
		// reduce their neighbor's indegree and push node when it has zero indegree
		while (!queue.isEmpty()) {
			Node node = queue.remove();
			sb.append(node.c);
			map.remove(node.c);
			for (Node nb : node.neighbors) {
				nb.indegree--;
				if (nb.indegree == 0 && map.containsKey(nb.c))
					queue.offer(nb);
			}
		}
		// if map has any entry means the cycle existed
		if (map.size() > 0)
			return "";

		return sb.toString();
	}

	private static class Node {
		char c;
		int indegree;
		List<Node> neighbors;

		public Node(char c) {
			this.c = c;
			this.indegree = 0;
			this.neighbors = new ArrayList<>();
		}
	}
```
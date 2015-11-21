+++
date = "2015-10-25T20:33:13-07:00"
levels = []
tags = ["Two Pointers", "String", "Binary Search Tree"]
title = "Convert Sorted List to Binary Search Tree"
topics = ["Google","Algorithm"]
banner = "/media/google.jpg"
+++


Given a tree string expression in balanced parenthesis format: `[A[B[C][D]][E][F]]`
Construct a tree and return the root of the tree.
<!--more-->

```
                A 
            /   |   \
          B     E    F
         / \
       C   D
```

## Think
- Store Nodes in a Stack

## Solution
```java
	public static Node buildTree(String str) {
		java.util.Stack<Node> nodes = new java.util.Stack();
		int idx = 0;
		Node root = null;
		while (idx < str.length()) {
			char cur = str.charAt(idx);
			if (cur == ']') {
				Node pop = nodes.pop();
				root = pop;
				if (nodes.isEmpty())
					break;
				nodes.peek().children.add(pop);
			} else if (cur != '[') {
				Node node = new Node(cur);
				nodes.push(node);
			}
			idx++;
		}
		return root;
	}
```
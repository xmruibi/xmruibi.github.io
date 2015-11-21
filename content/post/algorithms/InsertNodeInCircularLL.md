+++
date = "2015-11-19T20:33:13-07:00"
levels = []
tags = ["Linked List"]
title = "Insert Node for Circular Linked List"
topics = ["Geeks for Geeks","Amazon","Algorithm"]
banner = "/media/geeks.png"
+++

Write a function to insert a new node in a sorted Circular Linked List (CLL). For example, if the input CLL is following.
<!--more-->

## Solution
```java
public class Solution{
	public void insertNode(CNode root, CNode insert) {
		CNode cur = root;
		// step one: find the node just less than root
		do{
			if(cur.val <= insert.val && cur.next.val >= insert.val)
				break;
			cur = cur.next;
		}while(cur != root);

		CNode tmp = cur.next;
		insert.next = tmp;
		cur.next = insert;
	}
}

class CNode{
	int val;
	CNode next;
	public CNode(int val) {
		this.val = val;
	}
}
```


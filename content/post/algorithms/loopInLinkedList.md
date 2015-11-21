+++
date = "2015-11-18T12:43:13-07:00"
levels = ["Medium"]
tags = ["Linked List"]
title = "Find Loops in Linked List"
topics = ["Career Cup", "Amazon", "Algorithm"]
banner = "/media/careercup.png"
+++

Given a linked list, find if it has a loop inside and return the loop beginning if it has the loop
<!--more-->

## Solution
```java
public class Solution{
	public boolean findLoop(ListNode root) {
		if(root == null || root.next == null)
			return false;
		ListNode runner = root;
		ListNode walker = root;
		while(runner != null && runner.next != null) {
			runner = runner.next.next;
			walker = walker.next;
			if(runner == walker)
				return true;
		}
		return false;
	}

	public ListNode findLoopEntry(ListNode root){
		if(root == null || root.next == null)
			return root;
		ListNode runner = root;
		ListNode walker = root;
		while(runner != null && runner.next != null) {
			runner = runner.next.next;
			walker = walker.next;
			if(runner == walker)
				break;
		}
		if(runner == null || runner.next == null)
		    return null;
		walker = root;
		while(walker != runner) {
			walker = walker.next;
			runner = runner.next;
		}
		return walker;
	}
}
```
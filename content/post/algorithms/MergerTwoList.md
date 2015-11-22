+++
date = "2015-11-17T22:43:13-07:00"
levels = ["Medium"]
tags = ["Linked List"]
title = "Merge Two Linked List"
topics = ["Leetcode","Amazon", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given two sorted linked lists, merge two lists into one.

<!--more-->

## Solution 
```java
public class Solution{
	public ListNode merge(ListNode n1, ListNode n2) {
		if(n1 == null)
			return n2;
		if(n2 == null)
			return n1;

		// create dummy node for pointing on next node from list n1
		ListNode dummy = new ListNode(0);
		
		// create pre node as a pointer on current nodes from n1
		ListNode pre = dummy;
		pre.next = n1;

		// iterate passing two lists 
		while(n1!=null && n2!=null) {
			// if n1 has value larger than n2, 
			// move it forward and set that n1 in the rear of inserted node
			if(n1.val > n2.val) {
				ListNode next = n2.next;
				n2.next = pre.next;
				pre.next = n2;
				n2 = next;
			}else {
			    n1 = n1.next;
			}
		    pre = pre.next;
		}

		// if n2 still has nodes, attach n2 directly into pre
		if(n2!=null)
			pre.next = n2;
		return dummy.next;
	}
}
```
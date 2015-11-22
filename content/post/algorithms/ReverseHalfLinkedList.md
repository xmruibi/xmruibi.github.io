+++
date = "2015-11-17T22:43:13-07:00"
levels = ["Medium"]
tags = ["Linked List"]
title = "Reverse Half of Linked List"
topics = ["Career Cup", "Amazon", "Algorithm"]
banner = "/media/careercup.png"
+++

Given a linked list, reverse the half rear linked list.

<!--more-->

## Solution 
```java
public class Solution{
	
	public ListNode reverseHalf(ListNode node) {
		if(node == null || node.next == null)
			return node;

		ListNode runner = node;
		// creat a dummy node that is just a lead for head node
		ListNode walker = new ListNode(0);
		walker.next = node;

		// find the middle point: the index of head of half rear node should according to the question requirement:
		// here I just define the real middle one is the head of rear half 
		while(runner != null && runner.next != null) {
			runner = runner.next.next;
			walker = walker.next;
		} 

		// reverse the rear half
		walker.next = reverse(walker.next);
		return node;
	}

	/**
	* @param: node - the head node of list 
	* @return: node - the head node of reversed list
	*/
	private ListNode reverse(ListNode node) {
		ListNode head = null;
		while(node != null) {
			ListNode next = node.next;
			node.next = head;
			head = node;
			node = next;
		}	
		return head;
	}
}
```


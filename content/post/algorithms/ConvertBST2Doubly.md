+++
topics = ["Career Cup","Algorithm"]
date = "2015-11-15T17:10:29-07:00"
levels = ["Medium"]
tags = ["Tree", "Stack"]
title = "Convert BST to Sorted Doubly-Linked List"
banner = "/media/careercup.png"
+++

Given a Binary Tree (BT), convert it to a Doubly Linked List(DLL) In-Place. The left and right pointers in nodes are to be used as previous and next pointers respectively in converted DLL. The order of nodes in DLL must be same as Inorder of the given Binary Tree. The first node of Inorder traversal (left most node in BT) must be head node of the DLL.
<!--more-->

## Think 
- Inorder traversal

## Solution #Stack
```java
	private static Node convertBST2DoublyLinkedList(Node root) {
		Node dummy = new Node(0);
		Node prev = dummy;
		java.util.Stack<Node> stack = new java.util.Stack<>();

		do {
			while (root != null) {
				stack.push(root);
				root = root.prev;
			}
			Node cur = stack.pop();
			prev.next = cur;
			cur.prev = prev;
			prev = prev.next;
			if (cur.next != null)
				root = cur.next;
			else
				root = null;
		} while (!stack.isEmpty() || root != null);

		return dummy.next;
	}
```

## Solution #Recursion
```java
public class Solution{
	static Node dummy = new Node(0);
	static Node pre = dummy;

	private static Node convertII(Node root) {
		if (root == null)
			return root;
		Node prev = convertII(root.prev);
		pre.next = root;
		root.prev = pre;
		pre = root;
		Node next = convertII(root.next);
		return root;
	}
}
```
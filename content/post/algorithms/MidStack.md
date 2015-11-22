+++
date = "2015-11-13T17:50:13-07:00"
levels = []
tags = ["Stack", "Linked List"]
title = "Middle Index Stack"
topics = ["Career Cup","Algorithm"]
banner = "/media/careercup.png"
+++

Design a stack with operations on middle element.
<!--more-->
How to implement a stack which will support following operations in O(1) time complexity?
1) push() which adds an element to the top of stack.
2) pop() which removes an element from top of stack.
3) findMiddle() which will return middle element of the stack.
4) deleteMiddle() which will delete the middle element.
Push and pop are standard stack operations.


## Think
The important question is, whether to use a linked list or array for implementation of stack?
- The key of this question is to design an doubly linked list to deal with those required functions.

## Solution
```java
public class MidStack implements MyStack{
	int size;
	Node top;
	Node mid;
	
	public MidStack() {
		int size = 0;
		top = mid = null;
	}
	@Override
	public void push(int val) {
		Node newNode = new Node(val);
		if(top == null) {
			top = newNode;
			mid = top;
		}else{
			top.next = newNode;
			newNode.prev = top;
			top = newNode;
			if(size % 2 ==0)
				mid = mid.next;
		}
		size++;
	}
	@Override
	public int pop() {
		int pop = top.val;
		top = top.prev;
		top.next = null;
		if(size % 2 !=0)
			mid = mid.prev;
		size--;
		return pop;
	}
	@Override
	public int findMiddle() {
		return mid.val;
	}
	@Override
	public void deleteMiddle() {
		if(size <= 2) {
			mid = top;
			top.prev = null;
			size--;
			return;
		}
			
		mid.next.prev = mid.prev;
		mid.prev.next = mid.next;
		mid = mid.prev;
		size--;
	}
	
	public static void main(String[] args) {
		MidStack stack = new MidStack();
		stack.push(1);stack.push(2);
		stack.push(3);stack.push(4);	
		System.out.println(stack.pop());
		System.out.println(stack.findMiddle());
		stack.deleteMiddle();
		stack.push(2);
		stack.push(3);stack.push(4);	
		System.out.println(stack.findMiddle());
		System.out.println(stack.pop());
		System.out.println(stack.findMiddle());
		System.out.println(stack.pop());
	}
}

interface MyStack{
	public void push(int val);
	public int pop();
	public int findMiddle();
	public void deleteMiddle();
}
class Node{
	int val;
	Node prev, next;
	public Node(int val) {
		this.val = val;
	}
}
```
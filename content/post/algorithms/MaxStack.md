+++
date = "2015-11-15T10:43:13-07:00"
levels = ["Medium"]
tags = ["Array", "Stack", "Data Structure"]
title = "Max Stack"
topics = ["Career Cup", "Algorithm"]
banner = "/media/google.jpg"
+++

Design a stack, which makes the following function, try to reduce the time compaxity less than `O(n)`
- `pop()` pop the top of stack
- `push()` push a element into stack
- `peek()` peek the top of stack
- `peekMax()` peek the max element of stack
- `popMax()` pop the max element of stack
<!--more-->
## Think
- Typically, we can think about using one stacks and one heap. One of value, one of tracking the max stack.
- The most tricky part is pop max function. Make the node removal in O(n) should use the doubly linked list.


## Solution
```java
public class MaxStack {
	Stack elem = new Stack();
	PriorityQueue<ListNode> heap = new PriorityQueue<ListNode>((o1,o2) -> Integer.compare(o2.val, o1.val));
	
	// take O(logn): the depth of heap tree 
	public void push(int val) {
		ListNode newnode = new ListNode(val);
		heap.add(newnode); 
		elem.push(newnode);
	}
	
	// take O(logn): the depth of heap tree 
	public void pop() {
		ListNode remove = elem.pop();
		heap.remove(remove); 
	}
	
	// O(1) time
	public int peek() {
		return elem.peek().val;
	}

	// O(1) time
	public int peekMax() {
		return heap.peek().val; 
	}

	// take O(logn): the depth of heap tree 
	public void popMax() {
		ListNode node = heap.poll(); 
		elem.remove(node);
	}

	public static void main(String[] args) {
		MaxStack ms = new MaxStack();
		ms.push(1);
		ms.push(3);
		ms.push(2);
		System.out.println(ms.peekMax()); // == 3
		ms.popMax();
		System.out.println(ms.peekMax()); // == 2
		ms.push(4);
		ms.push(8);
		ms.pop();
		System.out.println(ms.peekMax()); // == 4
	}
}

class Stack {
	ListNode head, rear;

	public Stack() {
		head = new ListNode(0);
		rear = new ListNode(0);
		head.next = rear;
		rear.prev = head;
	}

	public void push(ListNode newnode) {
		rear.prev.next = newnode;
		newnode.prev = rear.prev;
		newnode.next = rear;
		rear.prev = newnode;
	}

	public ListNode pop() {
		if (isEmpty())
			return null;
		ListNode remove = rear.prev;
		rear.prev = remove.prev;
		remove.prev.next = rear;
		return remove;
	}

	public ListNode peek() {
		if (isEmpty())
			return null;
		ListNode peek = rear.prev;
		return peek;
	}

	public void remove(ListNode node) {
		node.prev.next = node.next;
		node.next.prev = node.prev;
	}

	public boolean isEmpty() {
		return head.next == rear;
	}
}

class ListNode {
	int val;
	ListNode prev, next;

	public ListNode(int val) {
		this.val = val;
	}
}
```
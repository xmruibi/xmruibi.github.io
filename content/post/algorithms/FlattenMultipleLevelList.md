+++
topics = ["Algorithm"]
date = "2015-09-08T23:10:29-07:00"
levels = ["Medium"]
tags = ["Linked List", "DFS"]
title = "Flaten Multiple Level Linked List"
+++


Given a linked list where in addition to the next pointer, each node has a child pointer, which may or may not point to a separate list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in below figure.You are given the head of the first level of the list. Flatten the list so that all the nodes appear in a single-level linked list. You need to flatten the list in way that all nodes at first level should come first, then nodes of second level, and so on.
<!--more-->

### Example
```
		1 -> 2 -> 3 -> 4
			 |		   |
			 5 —> 6 -> 7
			 	  |    |
			 	  8 -> 9
```
### Node Structure
```java
class Node{
	int val;
	Node next;
	Node child;
}

```
## Solution #1
```java
	private static void flatten(MLNode root) {
		Queue<MLNode> queue = new LinkedList<>();
		queue.add(root);
		while (!queue.isEmpty()) {
			MLNode cur = queue.poll();
			while (cur != null) {
				System.out.print(cur.val + "  ");
				queue.offer(cur.child);
				cur = cur.next;
			}
		}
	}
```
## Solution #2Avoid duplicate
```
public class Solution{
	/**
	* BFS with queue
	* @param root Node 
	**/
	public Set<Integer> flatten(Node root) {

		Queue<Node> queue = new LinkedList<>();
		Set<Integer> res = new HashSet<>();
		queue.offer(root);
		while(!queue.isEmpty()){
			Node root = queue.remove();
			set.add(root.val);
			if(root.next!=null && !set.contains(root.next.val))
				queue.offer(root.next);
			if(root.child!=null && !set.contains(root.child.val))
				queue.offer(root.child);
		}
		return res
	}
}
```
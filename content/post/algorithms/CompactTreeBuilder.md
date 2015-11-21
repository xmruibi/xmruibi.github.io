+++
date = "2015-11-15T20:33:13-07:00"
tags = ["BFS", "Tree"]
title = "Compact Tree Builder"
topics = ["Career Cup","Algorithm"]
banner = "/media/careercup.png"
+++


Given a root of a binary tree. Transform it in a way that each node(except probably one) would either have N or 0 children.

<!--more-->
```
   * A               A                 A                         A
     *  |               |                 |_B                       |_B
     *  |_B             |_B                  |_C                    |
     *     |            |  |                    |_D                 |_C
     *     |            |  |_D                     |_E              |
     *     |            |  |                          |_F           |_D
     *     |_C          |  |_E                           |_G        |
     *     | |_D        |    |_H                            |_H     |_E
     *     |    |_F     |                                           |
     *     |            |_C                                         |_F
     *     |_E            |                                         |
     *       |_G          |_F                                       |_G
     *       |            |                                         |
     *       |_H          |_G                                       |_H
```

## Think
- BFS entire tree into a queue.
- Read that queue and build posssible children according to the limit and add it into the root.
- Record the next root in another queue.


## Solution 
```java
	private static CTree compact(TreeNode node, int limit) {

		// bfs the original tree into a queue
		List<TreeNode> queue = new LinkedList<>();
		queue.add(node);
		int idx = 0;
		while (idx < queue.size()) {
			TreeNode cur = queue.get(idx++);
			if (cur.left != null)
				queue.add(cur.left);
			if (cur.right != null)
				queue.add(cur.right);
		}
		// get the root for final return
		CTree root = new CTree(queue.remove(0).val);
		// build a queue for store the new type tree
		Queue<CTree> helperQueue = new LinkedList<>();
		helperQueue.add(root);
		while (!queue.isEmpty()) {
			CTree cRoot = helperQueue.remove();
			// build the children for current CTree
			int curLv = 0; // make sure the amount of children
			List<CTree> nexlv = new ArrayList<>();
			while (curLv < limit && !queue.isEmpty()) {
				nexlv.add(new CTree(queue.remove(0).val));
				helperQueue.offer(nexlv.get(curLv++));
			}			
			cRoot.nodes = nexlv;
		}	
		return root;
	}
```

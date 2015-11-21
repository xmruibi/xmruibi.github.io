+++
date = "2015-11-13T17:50:13-07:00"
levels = []
tags = ["Tree", "Recursion"]
title = "Level Order with Position Preserved"
topics = ["Career Cup","Algorithm"]
banner = "/media/careercup.png"
+++
Given a Tree, each node contains one digit value, print each level in a format with relative position preserved.
<!--more-->
### Example
```
       eg.           1
                   /   \
                 2      4
                  \       \
                  3        7
    output:
                   1
               2      4
                 3      7
```          

## Think
- Tricky part is we should know the depth firstly. So that we can know how many space should be reserved in final line. Since the each line should preserved as most the length with the node's amount in full tree of that depth.
- The length of each line should be the $2^{depth} - 1$
- Recursively to set the node value in the middle of left and right range.


## Solution
```java
public class TreeLevelOrder {
	public List<String> printLevelwithSpacePreserved(TreeNode root) {
		List<String> res = new ArrayList<>();
		int depth = getDepth(root);
		int len = (int) Math.pow(2, depth) - 1;
		List<List<Character>> space = new ArrayList<>();
		for (int i = 0; i < depth; i++) {
			List<Character> line = new ArrayList<>();
			for(int j = 0; j < len; j++)
				line.add(' ');
			space.add(line);
		}
		levelOrderRecrusion(space, root, 0, len - 1, 0);
		for (List<Character> cs : space) {
			StringBuilder sb = new StringBuilder();
			for (char c : cs)
				sb.append(c);
			res.add(sb.toString());
		}
		return res;
	}

	private void levelOrderRecrusion(List<List<Character>> res, TreeNode node,
			int l, int r, int lv) {
		if (node == null)
			return;
		List<Character> line = res.get(lv);
		int m = l + ((r - l) >> 1);
		line.set(m, (char) (node.val + '0'));
		levelOrderRecrusion(res, node.left, l, m - 1, lv + 1);
		levelOrderRecrusion(res, node.right, m + 1, r, lv + 1);
	}

	private int getDepth(TreeNode node) {
		if (node == null)
			return 0;
		return 1 + Math.max(getDepth(node.left), getDepth(node.right));
	}
}
```


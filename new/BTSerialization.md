+++
date = "2015-11-10T22:43:13-07:00"
levels = ["Medium"]
tags = ["Binary Tree"]
title = "Serialize and Deserialize Binary Tree"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Design an algorithm and write code to serialize and deserialize a binary tree. Writing the tree to a file is called 'serialization' and reading back from the file to reconstruct the exact same binary tree is 'deserialization'.
<!--more-->
There is no limit of how you deserialize or serialize a binary tree, you only need to make sure you can serialize a binary tree to a string and deserialize this string to the original structure.

### Example
An example of testdata: Binary tree `{3,9,20,#,#,15,7}`, denote the following structure:

```
  3
 / \
9  20
  /  \
 15   7
```
Our data serialization use bfs traversal. This is just for when you got wrong answer and want to debug the input.

You can use other method to do serializaiton and deserialization.

## Think
- BFS with queue

## Solution
```java
class Solution {
    /**
     * This method will be invoked first, you should design your own algorithm 
     * to serialize a binary tree which denote by a root node to a string which
     * can be easily deserialized by your own "deserialize" method later.
     */
    public String serialize(TreeNode root) {
        if (root == null)
            return "#";
        
        // write your code here
        StringBuilder sb = new StringBuilder();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while(!queue.isEmpty()) {
            TreeNode node = queue.remove();
            if(node == null) {
                sb.append("#,");
            }else {
                sb.append(node.val+",");
                queue.offer(node.left);
                queue.offer(node.right);
            }
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }
    
    /**
     * This method will be invoked second, the argument data is what exactly
     * you serialized at method "serialize", that means the data is not given by
     * system, it's given by your own serialize method. So the format of data is
     * designed by yourself, and deserialize it here as you serialize it in 
     * "serialize" method.
     */
    public TreeNode deserialize(String data) {
        if (data == null || data.length() == 0 || data.equals("#"))
            return null;
        // write your code here
        String[] strs = data.split(",");
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(new TreeNode(Integer.parseInt(strs[0])));
        TreeNode root = queue.peek();
        int idx = 1;
        while(idx < strs.length) {
            TreeNode node = queue.remove();
            node.left = strs[idx].equals("#")? null : new TreeNode(Integer.parseInt(strs[idx]));
            idx++;
            node.right = strs[idx].equals("#")? null : new TreeNode(Integer.parseInt(strs[idx]));
            idx++;
            if(node.left!=null)
                queue.offer(node.left);
            if(node.right!=null)
                queue.offer(node.right);
        }
        return root;
    }
}
```
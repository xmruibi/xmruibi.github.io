+++
date = "2015-10-25T20:33:13-07:00"
levels = []
tags = ["Linked List", "Two Pointers", "Divide and Conquer", "Binary Search Tree"]
title = "Convert Sorted List to Binary Search Tree"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.
<!--more-->
### Example
```
               2
1->2->3  =>   / \
             1   3
```
## Think
- Find the middle point in list
- Divide and Conquer to build left child and right child node

## Solution
```java
public class Solution {
    /**
     * @param head: The first node of linked list.
     * @return: a tree node
     */
    public TreeNode sortedListToBST(ListNode head) {  
        // write your code here
        if(head == null)
            return null;
        if(head.next == null)
            return new TreeNode(head.val);
            
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode runner = head;
        ListNode walker = dummy;
        while(runner!=null && runner.next!=null) {
            runner = runner.next.next;
            walker = walker.next;
        }
        
        ListNode m = walker.next;
        TreeNode root = new TreeNode(m.val);
        ListNode left = dummy.next;
        ListNode right = walker.next.next;
        walker.next = null;
        root.left = sortedListToBST(left);
        root.right = sortedListToBST(right);
        return root;
    }
}
```

+++
date= "2015-10-17T17:50:34-07:00"
title = "Swap Nodes in Pairs"
topics = ["Lintcode", "Algorithm"]
tags = ["Linked List", "Two Pointers", "Reverse"]
banner = "/media/lintcode.png"
+++

Given a linked list, swap every two adjacent nodes and return its head.
<!--more-->


### Example
Given 1->2->3->4, you should return the list as 2->1->4->3.

### Challenge
Your algorithm should use only constant space. You may not modify the values in the list, only nodes itself can be changed.


## Solution
- Record next two node:  dummy pre -> A -> B -> C.
- Get C as next, change pre.next to B(head.next), B.next to A(head) and A(head.next) to C.
- Do while loop when head and head.next are both not null node


```
public class Solution {
    /**
     * @param head a ListNode
     * @return a ListNode
     */
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;

        while(head != null && head.next != null) {

            ListNode next = head.next.next;
            pre.next = head.next;
            pre.next.next = head;
            pre = head;
            head.next = next;
            head = next;
        }
        return dummy.next;
    }
}
```
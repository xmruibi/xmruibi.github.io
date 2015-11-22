+++
date = "2015-10-25T16:13:13-07:00"
levels = []
tags = ["Linked List", "Two Pointers", "Sort"]
title = "Remove Nth Node From End of List"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given a linked list, remove the nth node from the end of list and return its head.
<!--more-->

### Example
Given linked list: `1->2->3->4->5->null`, and n = `2`.

After removing the second node from the end, the linked list becomes `1->2->3->5->null`.


### Note
The minimum number of nodes in list is n.

### Challenge
O(n) time


## Think
- Typical idea on runner and walker linked list question
- Let runner node run for N step further than walker node.
- Get the N + 1 th position from end of list.
- Remove walker.next which is the target node.

## Solution
```java
public class Solution {
    /**
     * @param head: The first node of linked list.
     * @param n: An integer.
     * @return: The head of linked list.
     */
    ListNode removeNthFromEnd(ListNode head, int n) {
        if(head==null)
            return head;
        ListNode runner = head;
        ListNode pre = new ListNode(0);
        pre.next = head;
        ListNode walker = pre;
        while(n>0&&runner!=null){
            runner = runner.next;
            n--;
        }
        while(runner!=null){
            runner = runner.next;
            walker = walker.next;
        }
        walker.next = walker.next.next;
        return pre.next;
    }
}
```
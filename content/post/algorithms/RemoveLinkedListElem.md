+++
date= "2015-10-17T17:50:34-07:00"
title = "Remove Linked List Elements"
topics = ["Leetcode","Algorithm"]
tags = ["LinkedList", "Dummy Node"]
banner = "/media/leetcode.png"
+++

Remove all elements from a linked list of integers that have value `val`.
<!--more-->

```
public class Solution {
    /**
     * @param head a ListNode
     * @param val an integer
     * @return a ListNode
     */
    public ListNode removeElements(ListNode head, int val) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        while(head!=null) {
            if(head.val != val) {
                pre.next = head;
                pre = pre.next;
            }
            head = head.next;
        }
        // this is important
        pre.next = null;
        return dummy.next;
    }
}

```

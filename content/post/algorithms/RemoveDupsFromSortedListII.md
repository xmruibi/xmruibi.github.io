+++
date = "2015-10-25T20:33:13-07:00"
levels = []
tags = ["Linked List", "Two Pointers", "Duplicates Remove"]
title = "Remove Duplicates from Sorted List II"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++



Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.
<!--more-->

### Example
Given `1->2->3->3->4->4->5`, return `1->2->5`.
Given `1->1->1->2->3`, return `2->3`.


## Solution
```java
public class Solution {
    /**
     * @param ListNode head is the head of the linked list
     * @return: ListNode head of the linked list
     */
    public static ListNode deleteDuplicates(ListNode head) {
        // write your code here
        if(head == null || head.next == null)
            return head;
        
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        while(head != null){
            ListNode cur = head;
            while(head.next != null && cur.val == head.next.val)
                head = head.next;
            
            if(head != cur){
                pre.next = head.next;
            }else
                pre = pre.next;
            head = head.next;
        }
        
        return dummy.next;
    }
}
```
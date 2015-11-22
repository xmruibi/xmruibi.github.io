+++
date = "2015-10-25T15:13:13-07:00"
levels = []
tags = ["Linked List", "Two Pointers", "Sort"]
title = "Insertion Sort for Linked List"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Sort a linked list using insertion sort.
<!--more-->
### Example
Given `1->3->2->0->null`, return `0->1->2->3->null`.


## Think
- Pass nodes from head to end.
- Once it get an element larger than its next one, do a swap.
- Then return to the head and to do the passing again.
- Loop until get all sorted.

## Solution
```java
public class Solution {
    /**
     * @param head: The first node of linked list.
     * @return: The head of linked list.
     */
    public ListNode insertionSortList(ListNode head) {
        if(head == null || head.next == null)
            return head;
            
            ListNode dummy = new ListNode(0);
            ListNode pre = dummy;
            ListNode cur = head;
            while(cur != null){
                pre = dummy;
                ListNode next = cur.next;
                while(pre.next != null && pre.next.val < cur.val)
                    pre = pre.next;
                cur.next = pre.next;
                pre.next = cur;
                cur = next;
            }
            
            return dummy.next;
    }
}
```

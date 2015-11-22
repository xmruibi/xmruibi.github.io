+++
date = "2015-10-25T15:13:13-07:00"
levels = []
tags = ["Linked List", "Two Pointers"]
title = "Reverse Nodes in k-Group"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

You may not alter the values in the nodes, only nodes itself may be changed. Only constant memory is allowed.
<!--more-->

### Example
Given this linked list: `1->2->3->4->5`

For k = `2`, you should return: `2->1->4->3->5`

For k = `3`, you should return: `3->2->1->4->5`

## Think
- Consider the list like following:
```
	
	dummy(pre) -> l1 -> l2 -> l3 -> l4 -> l5 -> null
```
- Get the reversed segment:
```
 when cnt % k == 0:

		pre.next	  node  node.next
		   |            |     |
	pre -> l1 -> l2 -> l3 -> l4 -> l5 -> null

		  last	  ---->	     end
		    |		          |
	pre -> l1 -> l2 -> l3 -> l4 -> l5 -> null
			|     |	    
		pre.next pre.next(final status)	
			   \     \
			      |  -> |     |
				 cur   cur	 cur.next (final status)
```

## Solution
```java
public class Solution {
    /**
     * @param head a ListNode
     * @param k an integer
     * @return a ListNode
     */
    public ListNode reverseKGroup(ListNode head, int k) {
        if(head == null || head.next == null)
            return head;
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        int cnt = 1;
        ListNode front = head;
        while(head != null) {
            if(cnt % k == 0) {
                pre = reverse(pre, head.next);
                head = pre.next;
            }else
                head = head.next;
            cnt++;
        }
        return dummy.next;
    }
    
    private ListNode reverse(ListNode pre, ListNode end) {
        ListNode last = pre.next, cur = last.next;
        while(cur != end) {
            last.next = cur.next;
            cur.next = pre.next;
            pre.next = cur;
            cur = last.next;
        }
        return last;
    }
}
```




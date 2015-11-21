+++
date = "2015-10-18T11:43:13-07:00"
levels = ["Medium"]
tags = ["Linked List", "Two Pointers"]
title = "Intersection of Two Linked Lists"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Write a program to find the node at which the intersection of two singly linked lists begins.
<!--more-->


### Example
The following two linked lists:
```
A:          a1 → a2
                   ↘
                     c1 → c2 → c3
                   ↗            
B:     b1 → b2 → b3
```

begin to intersect at node c1.

### Note
If the two linked lists have no intersection at all, return null.
The linked lists must retain their original structure after the function returns.
You may assume there are no cycles anywhere in the entire linked structure.


## Solution
- Count the length of each linked list
- Make two counts to be equal, then start moving and check if there are two nodes the same as each other.


```
public class Solution {
    /**
     * @param headA: the first list
     * @param headB: the second list
     * @return: a ListNode 
     */
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        
        ListNode a = headA;
        ListNode b = headB;
        int alen = 0, blen = 0;
        
        while(a!=null) {
            a = a.next;
            alen++;
        }
        while(b!=null) {
            b = b.next;
            blen++;
        }
        
        while(alen > blen) {
            headA = headA.next;
            alen--;
        }
        
        while(alen < blen) {
            headB = headB.next;
            blen--;
        }
        
        while(headA != null && headB != null) {
            if(headA == headB)
                return headA;
            headA = headA.next;
            headB = headB.next;
        }
        return null;
    }  
}

```
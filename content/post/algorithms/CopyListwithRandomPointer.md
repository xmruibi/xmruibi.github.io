+++
date = "2015-10-25T15:13:13-07:00"
levels = []
tags = ["Linked List", "Two Pointers"]
title = "Copy List with Random Pointer"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++


A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.

Return a deep copy of the list.
<!--more-->

### Challenge
Could you solve it with O(1) space?

## Think
- Three pass:
	- Clone every node and attach it right next of original node,
	- Copy the random pointer for clone node (the next of origianl node's random pointer)
	- Cut down the original and clone one 

## Solution
```java
public class Solution {
    /**
     * @param head: The head of linked list with a random pointer.
     * @return: A new head of a deep copy of the list.
     */
    public RandomListNode copyRandomList(RandomListNode head) {
        // write your code here
        if(head == null)
            return null;
        RandomListNode dummyHead = head;
        while(head != null) {
            RandomListNode clone = new RandomListNode(head.label);
            RandomListNode next = head.next;
            head.next = clone;
            clone.next = next;
            head = next;
        }
        head = dummyHead;
        while(head != null) {
            RandomListNode clone = head.next;
            if(head.random != null)
                clone.random = head.random.next;
            head = clone.next;
        }
        head = dummyHead;
        RandomListNode resHead = dummyHead.next;
        while(head != null) {
            RandomListNode clone = head.next;
            head.next = clone.next;
            head = head.next;
            if(head != null)
                clone.next = head.next;
        }
        
        return resHead;
    }
}
```
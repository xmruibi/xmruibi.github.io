+++
date = "2015-10-25T20:13:13-07:00"
levels = []
tags = ["Linked List", "Two Pointers"]
title = "Copy List with Random Pointer"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Merge k sorted linked lists and return it as one sorted list.

Analyze and describe its complexity.
<!--more-->

### Example
Given lists:
```
[
  2->4->null,
  null,
  -1->null
],
```
return `-1->2->4->null`.

## Think
- Use a heap to receive element from linked list
- Tricky part: 
	- Just entered k node in heap instead of pass all nodes in lists.
	- When poll out element, it also need to push back the next node of polled node.


## Solution
```java
public class Solution {
    /**
     * @param lists: a list of ListNode
     * @return: The head of one sorted list.
     */
    public ListNode mergeKLists(List<ListNode> lists) {  
        if(lists == null)
            return null;
        
        PriorityQueue<ListNode> queue = new PriorityQueue<ListNode>(10, new Comparator<ListNode>(){
            @Override
            public int compare(ListNode o1, ListNode o2){
                return Integer.compare(o1.val, o2.val);
            }
        });
        // O(n) : n total nodes 
        for(ListNode node : lists){
            if(node != null)
                queue.offer(node);
        }
        
        ListNode dummy = new ListNode(0);
        ListNode pre = dummy;
        while(!queue.isEmpty()){
            ListNode cur = queue.remove();
            if(cur.next != null)
                queue.offer(cur.next);
            pre.next = cur;
            pre = cur;
        }
        
        return dummy.next;
    }
}
```
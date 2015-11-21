+++
date = "2015-10-18T14:43:13-07:00"
levels = []
tags = ["Data Structure", "Segement Tree", "Interval Problem"]
title = "Segment Tree Modify"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++


For a Maximum Segment Tree, which each node has an extra value max to store the maximum value in this node's interval.

Implement a modify function with three parameter root, index and value to change the node's value with [start, end] = [index, index] to the new given value. Make sure after this change, every node in segment tree still has the max attribute with the correct value.
<!--more-->


### Example
For segment tree:
```
                      [1, 4, max=3]
                    /                \
        [1, 2, max=2]                [3, 4, max=3]
       /              \             /             \
[1, 1, max=2], [2, 2, max=1], [3, 3, max=0], [4, 4, max=3]
```

if call modify(root, 2, 4), we can get:
```
                      [1, 4, max=4]
                    /                \
        [1, 2, max=4]                [3, 4, max=3]
       /              \             /             \
[1, 1, max=2], [2, 2, max=4], [3, 3, max=0], [4, 4, max=3]
```
or call modify(root, 4, 0), we can get:
```
                      [1, 4, max=2]
                    /                \
        [1, 2, max=2]                [3, 4, max=0]
       /              \             /             \
[1, 1, max=2], [2, 2, max=1], [3, 3, max=0], [4, 4, max=0]
```

### Note
We suggest you finish problem Segment Tree Build and Segment Tree Query first.

### Challenge
Do it in O(h) time, h is the height of the segment tree.

## Solution:

```
public class Solution {
    /**
     *@param root, index, value: The root of segment tree and 
     *@ change the node's value with [index, index] to the new given value
     *@return: void
     */
    public void modify(SegmentTreeNode root, int index, int value) {
        if(root.start == root.end) {
            root.max = value;
            return;
        }
        int m = root.start + ((root.end - root.start)>>1);
        if(m < index)
            modify(root.right, index, value);
        else
            modify(root.left, index, value);
            
        // update max each time, this is important
        root.max = Math.max(root.left.max, root.right.max);
    }
}
```







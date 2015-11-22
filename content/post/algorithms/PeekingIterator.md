+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-31T10:10:29-07:00"
levels = ["Medium"]
tags = ["Iterator"]
title = "Peeking Iterator"
+++


Given an Iterator class interface with methods: `next()` and `hasNext()`, design and implement a PeekingIterator that support the peek() operation -- it essentially `peek()` at the element that will be returned by the next call to `next()`.
<!--more-->
Here is an example. Assume that the iterator is initialized to the beginning of the list: `[1, 2, 3]`.

Call `next()` gets you 1, the first element in the list.

Now you call `peek()` and it returns 2, the next element. Calling `next()` after that still return 2.

You call `next() `the final time and it returns 3, the last element. Calling `hasNext()` after that should return false.

## Solution
```java
class PeekingIterator implements Iterator<Integer> {
    
    int cur;
    Iterator<Integer> it;
	public PeekingIterator(Iterator<Integer> iterator) {
	    this.it = iterator;
	    cur = it.hasNext() ? it.next() : null;
	}

    // Returns the next element in the iteration without advancing the iterator.
	public Integer peek() {
        return cur;
	}

	// hasNext() and next() should behave the same as in the Iterator interface.
	// Override them if needed.
	@Override
	public Integer next() {
	    int res = curl
	    cur = it.next() ? it.next() : null;
	    return res;
	}

	@Override
	public boolean hasNext() {
	    return it.hasNext();
	}
}
```
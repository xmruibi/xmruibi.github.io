+++
topics = ["Career Cup","Algorithm"]
date = "2015-11-15T10:10:29-07:00"
levels = ["Medium"]
tags = ["Iterator"]
title = "Iterator for Merging Sorted Stream"
banner = "/media/careercup.png"
+++

Design a iterator, with input a list and a hop parameter. Then output the element according to that hop number. List: `1, 2, 3, 4, 5, 6, 7, 8, 9; hop = 2` -> `2, ,4, 6, 8`.
<!--more-->

## Solution
```java
public class HopIterator<E> implements Iterator<E> {
	int hop;
	Iterator<E> itr;

	public HopIterator(Collection<E> list, int hop) {
		this.itr = list.iterator();
		this.hop = hop;
	}

	@Override
	public boolean hasNext() {
		int k = 1;
		while (k < hop && itr.hasNext()) {
			k++;
			itr.next();
		}
		return k == hop && itr.hasNext();
	}

	@Override
	public E next() {
		return itr.next();
	}
}
```


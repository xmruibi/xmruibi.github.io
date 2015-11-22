+++
topics = ["Google","Algorithm"]
date = "2015-11-15T10:10:29-07:00"
levels = ["Medium"]
tags = ["Iterator"]
title = "Iterator for Merging Sorted Stream"
banner = "/media/google.jpg"
+++

Given a `Merge Sorted Stream` class contains some sorted stream which implements iterator interface. Each sorted stream class has some methods: `hasNext()`, `next()`. Sorted Stream defines the stream read data by ascending order, so that in `Merge Sorted Stream` when call `next()` method, it will return values by ascending order. Pleas complete the following codes.
<!--more-->

###  Partital Code
```java
class SortedStream implments Iterator<Integer>{
	List<Integer> content;
	int cursor;
	public SortedStream(List<Integer> content){
		if(content == null)
			throw new IllegalArgumentException("Null Input");
		this.content = content;
		this.cursor = 0;
	}

	public boolean hasNext(){return cursor < content.size();}

	public int next(){return content.get(cursor++);}
}

class MergeSortedStream implments Iterator<SortedStream>{
    List<SortedStream> content;
	SortedStream cursor;
	public MergeSortedStream(List<SortedStream> content){...}
	
	public boolean hasNext(){...};

	public int next(){...};
}
```

## Think
- Implement a new wrapper class for original iterator class and make it comparable.
- The new wrapper class is just like peek iterator, and implement `compareTo()` method with comparing the peek element.
- Put all new iterator class in a minheap.

## Solution 
```java
public class MergeKSortedIterator implements Iterable<Integer> {

	Collection<Iterator<Integer>> listOfItr;

	public MergeKSortedIterator(Collection<Iterator<Integer>> lists) {
		this.listOfItr = lists;
	}

	@Override
	public Iterator<Integer> iterator() {
		Queue<NewIterator> minHeap = new PriorityQueue<NewIterator>(
				listOfItr.size());
		for (Iterator<Integer> it : listOfItr)
			minHeap.add(new NewIterator(it));

		return new Iterator<Integer>() {
			@Override
			public boolean hasNext() {
				return !minHeap.isEmpty();
			}

			@Override
			public Integer next() {
				NewIterator pop = minHeap.poll();
				int res = pop.next();
				if (pop.hasNext()) {
					minHeap.add(pop);
				}
				return res;
			}

		};
	}

	class NewIterator implements Comparable<NewIterator>, Iterator<Integer> {
		Integer cur;
		Iterator<Integer> itr;

		public NewIterator(Iterator<Integer> itr) {
			this.itr = itr;
			cur = itr.hasNext() ? itr.next() : null;
		}

		@Override
		public int compareTo(NewIterator o) {
			return Integer.compare(this.peek(), o.peek());
		}

		@Override
		public boolean hasNext() {
			return cur != null;
		}

		@Override
		public Integer next() {
			int res = cur;
			cur = itr.hasNext() ? itr.next() : null;
			return res;
		}

		public Integer peek() {
			return cur;
		}
	}
}
```
+++
topics = ["Algorithm"]
date = "2015-11-01T10:10:29-07:00"
levels = ["Medium"]
tags = ["Iterator", "Matrix"]
title = "Rotate Iterator"
+++

The followup question for `Iterator of Iterators`. But this time, the output is like 'up-down' format. 
<!--more-->

### Example
```java
public class RotateIterators<T> implements Iterator<T> {
    public static void main(String[] args) {
        List<Integer> l1 = new ArrayList<Integer>();
		l1.add(1);
		l1.add(4);
		l1.add(3);
		l1.add(8);
		l1.add(10);
		List<Integer> l2 = new ArrayList<Integer>();
		l2.add(17);
		l2.add(12);

		List<Integer> l3 = new ArrayList<Integer>();
		l3.add(3);
		l3.add(5);
		l3.add(14);
		List<Iterator<Integer>> list = new ArrayList<>();
		list.add(l1.iterator());
		list.add(l2.iterator());
		list.add(l3.iterator());
		RotateIterators rt = new RotateIterators<>(list);
		while(rt.hasNext()){
			System.out.println(rt.next());
		}
	}
}
```
### Output
```
1
17
3
4
12
5
3
14
8
10
```
## Think
- `hasNext()` is only for checking the pointer is null or valid
- `next()` should return the current value and also jump the pointer

## Solution
```java
public class RotateIterators<T> implements Iterator<T> {
	private Iterator<T> current; // the current concrete iterator (small, detail)
	private List<Iterator<T>> iterators; // the cursor iterator which current iterator belong to (big, indexing)
	private int listIdx;

	public RotateIterators(List<Iterator<T>> iterators) {
		if (iterators == null)
			throw new IllegalArgumentException("iterators is null");
		this.iterators = (List<Iterator<T>>) iterators;
		this.current = iterators.get(listIdx = 0);
	}

	@Override
	public boolean hasNext() {
		int cntLmt = iterators.size(); // limit the loop, the max search limit is the size of iterators list
		while (current == null || !current.hasNext() && cntLmt > 0){
			cntLmt--;
			if (listIdx < iterators.size() - 1)
				current = iterators.get(++listIdx);
			else
				current = iterators.get(listIdx = 0);	
		}
		return current.hasNext();
	}

	@Override
	public T next() {
		T res = current.next();
		// current pointer should jump to next 
		if (listIdx < iterators.size() - 1)
			current = iterators.get(++listIdx);
		else
			current = iterators.get(listIdx = 0);	
		return res;
	}
}
```
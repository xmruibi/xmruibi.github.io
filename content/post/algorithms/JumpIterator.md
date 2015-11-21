+++
topics = ["Algorithm"]
date = "2015-10-31T10:10:29-07:00"
levels = ["Medium"]
tags = ["Iterator"]
title = "Jump Iterator"
+++

Implements an iterator in each output it print the number and skip the next one. 
<!--more-->
### Partial Code
```java
public class JumpIterator implements Iterator<Integer> {
    public static void main(String[] args) {
		List<Integer> list = new ArrayList<Integer>();
		list.add(1); list.add(4);
		list.add(3); list.add(5);
		list.add(6); list.add(7);
		list.add(2);
		JumpIterator it = new JumpIterator(list.listIterator());
		while(it.hasNext()){
			System.out.println(it.next());
		}
	}
}
```

### Output
```
1
3
6
2
```

## Solution
```java
public class JumpIterator implements Iterator<Integer> {

	Iterator<Integer> iterator;

	public JumpIterator(Iterator<Integer> iterator) {
		this.iterator = iterator;
	}

	@Override
	public boolean hasNext() {
		return iterator.hasNext();
	}

	@Override
	public Integer next() {
		int res = iterator.next();
		if (iterator.hasNext())
			iterator.next();
		return res;
	}

	public static void main(String[] args) {
		List<Integer> list = new ArrayList<Integer>();
		list.add(1); list.add(4);
		list.add(3); list.add(5);
		list.add(6); list.add(7);
		list.add(2);
		JumpIterator it = new JumpIterator(list.listIterator());
		while(it.hasNext()){
			System.out.println(it.next());
		}
	}
}
```
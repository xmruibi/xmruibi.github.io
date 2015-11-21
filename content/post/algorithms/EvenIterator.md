+++
topics = ["Algorithm"]
date = "2015-10-31T10:10:29-07:00"
levels = ["Medium"]
tags = ["Iterator"]
title = "Even Iterator"
+++

Implements an iterator only output the even number. 
<!--more-->

### Example
```java
public class EvenIterator implements Iterator<Integer> {
    public static void main(String[] args) {
		List<Integer> list = new ArrayList<Integer>();
		list.add(1); list.add(4); list.add(3); list.add(5);
		list.add(6); list.add(7); list.add(9); list.add(2);
		EvenIterator it = new EvenIterator(list.listIterator());
		while(it.hasNext()){
			System.out.println(it.next());
		}
	}
}
```
### Output
```
4
6
2
```
## Solution
```java
public class EvenIterator implements Iterator<Integer> {

	Iterator<Integer> iterator;

	public EvenIterator(Iterator<Integer> iterator) {
		this.iterator = iterator;
	}

	@Override
	public boolean hasNext() {
		return iterator.hasNext();
	}

	@Override
	public Integer next() {
		int res = 0;
		while (iterator.hasNext() && (res = iterator.next()) % 2 != 0)
			;
		return res;
	}

	
	public static void main(String[] args) {
		List<Integer> list = new ArrayList<Integer>();
		list.add(1); list.add(4);
		list.add(3); list.add(5);
		list.add(6); list.add(7);
		list.add(9); list.add(2);
		EvenIterator it = new EvenIterator(list.listIterator());
		while(it.hasNext()){
			System.out.println(it.next());
		}
	}
}
```
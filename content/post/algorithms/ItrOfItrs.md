+++
topics = ["Algorithm"]
date = "2015-09-28T10:10:29-07:00"
levels = ["Medium"]
tags = ["Iterator"]
title = "Iterator of Iterator"
+++
Create an iterator of iterator, supporting any type in Java. The purpose is to iterate over the objects of the iterators.
<!--more-->
## Solution
```java
import java.util.*;

public class Iterators<T> implements Iterator<T> {
	
    private Iterator<T> current; // the current concrete iterator (small, detail)
    private Iterator<Iterator<T>> cursor; // the cursor iterator which current iterator belong to (big, indexing)
    
	public Iterators(Iterable<Iterator<T>> iterators) {
        if (iterators == null) throw new IllegalArgumentException("iterators is null");
        this.cursor = iterators.iterator();
    }
	
	private Iterator findNext() {
		while(cursor.hasNext()) {
			current = cursor.next();
			if(current.hasNext())
				return current;
		}
		return null;
	}
	
	@Override
	public boolean hasNext() {
		if(current == null || !current.hasNext())
			current = findNext();
		// make sure the current iterator has next
		return (current != null && current.hasNext());
	}

	@Override
	public T next() {		
		return current.next();
	}

	
    @Override
    public void remove() {
        if (current != null) {
            current.remove();
        }
    }
}

```
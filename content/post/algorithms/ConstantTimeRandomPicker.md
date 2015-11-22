+++
date = "2015-11-14T00:30:13-07:00"
levels = []
tags = ["Hash Map", "Data Structure", "Array"]
title = "Constant Time Random Picker"
topics = ["Career Cup","Algorithm"]
banner = "/media/google.jpg"
+++


Design a data structure that supports insert, delete, search and getRandom in constant time.
<!--more-->

Design a data structure that supports following operations in Θ(1) time.

- `insert(x)`: Inserts an item x to the data structure if not already present.
- `remove(x)`: Removes an item x from the data structure if present.
- `search(x)`: Searches an item x in the data structure.
- `getRandom()`: Returns a random element from current set of elements


## Think
We can use hashing to support first 3 operations in Θ(1) time. How to do the 4th operation? The idea is to use a resizable array (ArrayList in Java, vector in C) together with hashing. Resizable arrays support insert in Θ(1) amortized time complexity. To implement getRandom(), we can simply pick a random number from 0 to size-1 (size is number of current elements) and return the element at that index. The hash map stores array values as keys and array indexes as values.

Following are detailed operations.

- insert(x)
1. Check if x is already present by doing a hash map lookup.
2. If not present, then insert it at the end of the array.
3. Add in hash table also, x is added as key and last array index as index.

- remove(x)
1. Check if x is present by doing a hash map lookup.
2. If present, then find its index and remove it from hash map.
3. Swap the last element with this element in array and remove the last element.
Swapping is done because the last element can be removed in O(1) time.
4. Update index of last element in hash map.

- getRandom()
1. Generate a random number from 0 to last index.
2. Return the array element at the randomly generated index.

- search(x)
Do a lookup for x in hash map.

## Solution #1
```java
public class ConstantTimeRandomPicker {
	
	private final ArrayList<Integer> arr;
	private final HashMap<Integer, Integer> map; // value - index
    Random r;
	
	public ConstantTimeRandomPicker() {
		this.arr = new ArrayList<Integer>();
		this.map = new HashMap<Integer, Integer>();
	}
	
	public void add(int val) {
		arr.add(val);
		map.put(arr.size() - 1, val);
	}
	
	public void remove(int val) {
		remove(map.get(val), val);
	}
	
	public void removeRandom() {
		int val = arr.get(r.nextInt(arr.size()));
		remove(map.get(val), val);
	}
	
	public int getRandom() {
		return arr.get(r.nextInt(arr.size()));
	}
	
	public int search(int val) {
		return arr.get(map.get(val));
	}

	private void remove(int idx, int val) {
		
		// swap with the last element
		int last = arr.get(arr.size() - 1);
		// put the last element to the current index
		arr.set(idx, last);
		// remove the last element
		arr.remove(arr.size() - 1);
				
		// update the last element's index in hashmap
		map.put(last, idx);		
		// remove the removal value
		map.remove(val);
	}
}
```

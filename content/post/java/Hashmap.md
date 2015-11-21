+++
date = "2015-10-22T00:03:07-07:00"
levels = []
tags = ["Java Data Structure"]
title = "Analysis  on HashMap API Source Code"
topics = ["Java"]
+++
 Hash table based implementation of the Map interface.  This implementation provides all of the optional map operations, and permits `null` values and the `null` key.  (The HashMap class is roughly equivalent to Hashtable, except that it is unsynchronized and permits nulls.)  This class makes no guarantees as to the order of the map; in particular, it does not guarantee that the order will remain constant over time.
 <!--more-->


## How HashMap store data?
##### The least unit in hashmap data storage is the `Entry Node<K,V>`. The node implements `Map.Entry<K,V>`
```java
 static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;
        final K key;
        V value;
        // chaining address, point to next Entry Node
        Node<K,V> next;

        Node(int hash, K key, V value, Node<K,V> next) {
            this.hash = hash;
            this.key = key;
            this.value = value;
            this.next = next;
        }

        public final K getKey()        { return key; }
        public final V getValue()      { return value; }
        public final String toString() { return key + "=" + value; }

        public final int hashCode() {
            return Objects.hashCode(key) ^ Objects.hashCode(value);
        }

        public final V setValue(V newValue) {
            V oldValue = value;
            value = newValue;
            return oldValue;
        }

        public final boolean equals(Object o) {
            if (o == this)
                return true;
            if (o instanceof Map.Entry) {
                Map.Entry<?,?> e = (Map.Entry<?,?>)o;
                if (Objects.equals(key, e.getKey()) &&
                    Objects.equals(value, e.getValue()))
                    return true;
            }
            return false;
        }
    }
```

##### All of these `Node<K, V>` are stored in `table` as a Node Array
- Nodes Array `Node<K, V>[] table`
```java
    /**
     * The table, initialized on first use, and resized as
     * necessary. When allocated, length is always a power of two.
     * (We also tolerate length zero in some operations to allow
     * bootstrapping mechanics that are currently not needed.)
     */
    transient Node<K,V>[] table;
```

##### However, HashMap provides three views for retrieving the inside data: `keySet()`, `values()` and `entrySet()`
- KeySet: stores all keys in this hashmap
```java
    /**
     * NOTE! This field is in AbstractMap class 
     * Each of these fields are initialized to contain an instance of the
     * appropriate view the first time this view is requested.  The views are
     * stateless, so there's no reason to create more than one of each.
     */
    transient volatile Set<K>        keySet;
```

- Values: stores all values in this hash Map
```java
    /**
     * NOTE! This field is in AbstractMap class 
     */
    transient volatile Collection<V> values;
```

- EntrySet: stores Entry Node(K-V pair) in this HashMap
```java
    /**
     * This field is in HashMap class 
     * Holds cached entrySet(). Note that AbstractMap fields are used
     * for keySet() and values().
     */
    transient Set<Map.Entry<K,V>> entrySet;
```

## How HashMap manipulate with a certain K-V pair?

### Insertion
##### Here is the public entrance `put(key, value)` to insert K - V pair into HashMap. But we have to notice it has the return value, which is the previous value associated with this key.
```java
    /**
     * @return the previous value associated with key, or
     *         null if there was no mapping for key.
     *         (A null return can also indicate that the map
     *         previously associated null with key.)
     */
    public V put(K key, V value) {
        return putVal(hash(key), key, value, false, true);
    }
    /**
     * The original version about put k-v pair node implement.
     * Notice those two boolean value
     * @param hash hash for key
     * @param key the key
     * @param value the value to put
     * @param onlyIfAbsent if true, don't change existing value
     * @param evict if false, the table is in creation mode.
     * @return previous value, or null if none
     */
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict){...}
```
##### I made a Lite Edition about `putVal` function according to HashMap source code. The main procedure on insert a K-V pair to HashMap can be concluded as following:
- Check the Entry Node table if it's null, re-size it if necessary.
- Get the bucket index by `(table.length - 1) & hash`.
- Iterate the nodes in target bucket and check if there is any exist same node `exist.hash == hash && ((prevKey = exist.key) == key || (key != null && key.equals(prevKey))`. If exist the node with the same key, update its value.
- Record the previous node of insert position for returning the previous value.
- Insert the new node and update the previous node next pointer: `prev.next = new Node(hash, key, value, null)`.

```java
/**
*  Lite Editon for HashMap input K - V pair function
**/
final V putVal(int hash, K key, V value) {
	// the reference for node table
	Node<K,V>[] tab; 
	// the reference for node in current bucket
	Node<K,V> prev;
    int n; // the table length
    
	if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
    int idx = (n - 1) & hash; // the bucket index
	if((prev = table[idx]) == null) {
		table[idx] = new Node(hash, key, value, null);
	}else {
		Node<K,V> exist; K prevKey;
		// if key equal to the first node in current bucket
		if(prev.hash == hash && (prevKey = prev.key) == key || (key != null && key.equals(prevKey)) {
			exist = prev;
		} else { 
			// find the top node in current bucket and iterate nodes in this bucket
			for (int binCount = 0; ; ++binCount) {
				// insert new node when find the next pointer of a node is null 
				if((exist = prev.next)  == null) {
					prev.next = new Node(hash, key, value, null);
					break;
				}
				// if any node in this bucket is the same as the insert one 
				if (exist.hash == hash && ((prevKey = exist.key) == key || (key != null && key.equals(prevKey))))
                    break;
                prev = exist;
			}
		}
		if (exist != null) { // existing mapping for key
            V oldValue = exist.value;
            if (oldValue == null)
                exist.value = value;
            return oldValue;
        }
	}
    // modification count for fail-fast
	++modCount;
	// check current node amount, if larger than threshodl do resize
    if (++size > threshold)
        resize();
    return null;
}
```

### Retrieve 
##### The public entrance `get(key)` returns the value to which the specified key is mapped, or null if this map contains no mapping for the key. More formally, if this map contains a K - V pair `key==null` then this method returns `v` or `null`. Pleas note that return `null` doesn't necessarily indicates the map contains no mapping for the key! It's also possible that the map explicitly maps the key to `NULL`. Source code shown as below:
```java
    public V get(Object key) {
        Node<K,V> e;
        return (e = getNode(hash(key), key)) == null ? null : e.value;
    }
```
##### The main procedure on get a K-V pair to HashMap can be concluded as following:
- Get the index by hash code `(table.length - 1) & hash` ;
- Check the first node in target bucket if it is the same as the input key and hash code
- Check the rest nodes iterative in target bucket if it matches the retrieval condition.

```java
 final Node<K,V> getNode(int hash, Object key) {
        Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
        if ((tab = table) != null && (n = tab.length) > 0 &&
            (first = tab[(n - 1) & hash]) != null) {
            if (first.hash == hash && // always check first node in the target bucket
                ((k = first.key) == key || (key != null && key.equals(k))))
                return first;
            if ((e = first.next) != null) {
                do { // check the rest nodes in this bucket
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        return e;
                } while ((e = e.next) != null);
            }
        }
        return null;
    }
```

### Deletion 

##### Removes the mapping for the specified key from this map if present. Return the previous value associated with input key or `null` if there was no mapping for input key (A `null` return can also indicate that the map previously associated `null` key). 
```java
    public V remove(Object key) {
        Node<K,V> e;
        return (e = removeNode(hash(key), key, null, false, true)) == null ?
            null : e.value;
    }
    
    /**
     * The original version about remove node implement.
     * Notice those two boolean value
     * @param hash hash for key
     * @param key the key
     * @param value the value to match if matchValue, else ignored
     * @param matchValue if true only remove if value is equal
     * @param movable if false do not move other nodes while removing
     * @return the node, or null if none
     */
    final Node<K,V> removeNode(int hash, Object key, Object value,
                               boolean matchValue, boolean movable) {...}
```
##### Implements Map.remove and related methods with lite version.
```java
    final Node<K,V> removeNode(int hash, Object key) {
        Node<K,V>[] tab; Node<K,V> p; int n, index;
        if ((tab = table) != null && (n = tab.length) > 0 &&
            (p = tab[index = (n - 1) & hash]) != null) {
            Node<K,V> node = null, e; K k; V v;
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                node = p;
            else if ((e = p.next) != null) {
                do {
                    if (e.hash == hash && ((k = e.key) == key ||
                            (key != null && key.equals(k)))) {
                        node = e;
                        break;
                    }
                        p = e;
                } while ((e = e.next) != null);
            }
            
            if (node != null ) {
                if (node == p)
                    tab[index] = node.next;
                else
                    p.next = node.next;
                ++modCount;
                --size;
                return node;
            }
        }
        return null;
    }
```

## How to hash by key?
##### Hash function is very important to HashMap. It requires quick, efficient and disperse distribution for nodes.
> Computes key.hashCode() and spreads (XORs) higher bits of hash to lower.  Because the table uses power-of-two masking, sets of hashes that vary only in bits above the current mask will always collide. (Among known examples are sets of Float keys holding consecutive whole numbers in small tables.)  So we apply a transform that spreads the impact of higher bits downward. There is a tradeoff between speed, utility, and quality of bit-spreading. Because many common sets of hashes are already reasonably distributed (so don't benefit from spreading), and because we use trees to handle large sets of collisions in bins, we just XOR some shifted bits in the cheapest possible way to reduce systematic lossage, as well as to incorporate impact of the highest bits that would otherwise never be used in index calculations because of table bounds.

```java
    static final int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }
```

## Resize and Rehash

```java
final Node<K,V>[] resize() {
    Node<K, V> newtab = new Node<>[(table.length << 1)];
    for(int i = 0; i < table.length; i++){
        Node<K, V> cur = table[i];
        while(cur != null) {
            Node<K, V> next = cur.next;
            cur.next = null;
            int newidx = cur.key.hashCode()%newtab.length;
            Node<K, V> prev = newtab[newidx];
            if(prev == null)
                newtab[newidx] = cur;
            else{
                while(prev.next != null)
                    prev = prev.next;
                prev.next = cur;
            }
            cur = next;
        }
    }
    table = newtab;
    return newtab;
}
```



















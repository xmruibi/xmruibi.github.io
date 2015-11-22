+++
date = "2015-10-20T16:13:13-07:00"
levels = []
tags = ["Union Find"]
title = "Find the Weak Connected Component in the Directed Graph"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Find the number Weak Connected Component in the directed graph. Each node in the graph contains a label and a list of its neighbors. (a connected set of a directed graph is a subgraph in which any two vertices are connected by direct edge path.)
<!--more-->

### Example
Given graph:
```
A----->B  C
 \     |  | 
  \    |  |
   \   |  |
    \  v  v
     ->D  E <- F
```
Return `{A,B,D}`, `{C,E,F}`. Since there are two connected component which are `{A,B,D}` and `{C,E,F}`

### Note
Sort the element in the set in increasing order

## Think
- Union Find
```
class UnionFind{
	// child - parent pair table:
	HashMap<Integer, Integer> pairTab;

	public UnionFind(HashSet<Integer> set) {
		pairTab = new HashMap<>();
		for(Integer i : set) 
			pairTab.put(i, i);
	}

	public int find(int x) {
		int parent = pairTab.get(x);
		while(parent != pairTab.get(parent)){
			parent = pairTab.get(parent);
		}
		return parent;
	}

	public void union(int x, int y) {
		int parent_x = find(x);
		int parent_y = find(y);
		if(parent_x != parent_y)
			pairTab.put(parent_x, parent_y);
	}
}
```

## Solution

```java
public class Solution {
    /**
     * @param nodes a array of Directed graph node
     * @return a connected set of a directed graph
     */
    public List<List<Integer>> connectedSet2(ArrayList<DirectedGraphNode> nodes) {
        
        HashSet<Integer> set = new HashSet<>();
        for(DirectedGraphNode node : nodes) 
            set.add(node.label);
        
        // to make union
        UnionFind uf = new UnionFind(set);
        for(DirectedGraphNode x : nodes) {
            for(DirectedGraphNode y : x.neighbors) {
                uf.union(x.label, y.label);
            }
        }
        
        HashMap<Integer, ArrayList<Integer>> map = new HashMap<>();
        for(Integer label : set) {
            int parent = uf.find(label);
            if(!map.containsKey(parent)) 
                map.put(parent, new ArrayList<Integer>());
            ArrayList<Integer> cur = map.get(parent);
            cur.add(label);
            map.put(parent, cur);
        }
        
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        for(Map.Entry<Integer, ArrayList<Integer>> entry : map.entrySet()) {
            Collections.sort(entry.getValue());
            res.add(entry.getValue());
        }
        return res;
    }
}
```


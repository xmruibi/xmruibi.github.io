+++
date = "2015-11-09T18:23:13-07:00"
levels = ["Medium"]
tags = ["BFS", "Graph", "DFS"]
title = "Graph Valid Tree"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.
<!--more-->

### Example
Given n = `5` and edges = `[[0, 1], [0, 2], [0, 3], [1, 4]]`, return true.
Given n = `5` and edges = `[[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]`, return false.

### Hint


##### The definition of tree on Wikipedia: 
> a tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.


###### Note: You can assume that no duplicate edges will appear in edges. Since all edges are undirected, `[0, 1]` is the same as `[1, 0]` and thus will not appear together inedges.

## Think
Given n = `5` and edges = `[[0, 1], [1, 2], [3, 4]]`, what should your return? Is this case a valid tree?

No, isolate node shouldn't be allowed.

Design a Node class:
```java
    private class Node {
		int val;
		List<Integer> neighbors;

		public Node(int val) {
			this.val = val;
			this.neighbors = new ArrayList<>();
		}
	}
```

## Solution #BFS
```java
    public boolean validTree(int n, int[][] edges) {
		Node[] nodes = new Node[n];
		for (int i = 0; i < nodes.length; i++)
			nodes[i] = new Node(i);
		for (int[] edge : edges) {
			nodes[edge[0]].neighbors.add(edge[1]);
			nodes[edge[1]].neighbors.add(edge[0]);
		}

		boolean[] visited = new boolean[n];
		Queue<Integer> queue = new LinkedList<Integer>();
		queue.offer(0);

		while (!queue.isEmpty()) {
			int vertexId = queue.poll();
			// touch the cycle
			if (visited[vertexId]) 
				return false;
			
			visited[vertexId] = true;
			for (int neighbor : nodes[vertexId].neighbors) {
				if (!visited[neighbor])
					queue.offer(neighbor);
			}
		}

		// Check the isolate
		for (boolean v : visited) {
			if (!v)
				return false;
		}
		return true;
	}
```
## Solution #DFS
```java
	public boolean validTreeDFS(int n, int[][] edges) {
		Node[] nodes = new Node[n];
		for (int i = 0; i < nodes.length; i++)
			nodes[i] = new Node(i);
		for (int[] edge : edges) {
			nodes[edge[0]].neighbors.add(edge[1]);
			nodes[edge[1]].neighbors.add(edge[0]);
		}

		// all node should connected from zero
		boolean[] visited = new boolean[n];
		if (!dfsHelper(nodes, visited, 0, -1))
			return false;
		
		// Check the isolate
		for (boolean v : visited) {
			if (!v)
				return false;
		}
		return true;
	}

	private boolean dfsHelper(Node[] nodes, boolean[] visited, int idx,
			int parentIdx) {
		if (visited[idx])
			return false;
		visited[idx] = true;
		for (int i = 0; i < nodes[idx].neighbors.size(); i++) {
			if (nodes[idx].neighbors.get(i) == parentIdx)
				continue;
			if (!dfsHelper(nodes, visited, nodes[idx].neighbors.get(i), idx))
				return false;
		}
		return true;
	}
```
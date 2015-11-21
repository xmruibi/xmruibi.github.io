+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-11T15:14:18-07:00"
levels = ["Easy"]
tags = ["Graph", "DFS", "BFS"]
title = "Route Between Two Nodes in Directed Graph"
banner = "/media/leetcode.png"
+++
Given a directed graph, design an algorithm to find out whether there is a route between two nodes.


#### Solution:

- Most typical Graph algorithm question!
- Try two ways: DFS, BFS.

<!--more-->

<pre>
<code class="java">
public class Solution {
   /**
     * @param graph: A list of Directed graph node
     * @param s: the starting Directed graph node
     * @param t: the terminal Directed graph node
     * @return: a boolean value
     */
     
     // BFS
     public boolean hasRoute(ArrayList<DirectedGraphNode> graph, 
                            DirectedGraphNode s, DirectedGraphNode t) {
        
        if(s == t)
            return true;

        Queue<DirectedGraphNode> queue = new LinkedList<>();
        queue.offer(s);
        graph.remove(s);
        while(!queue.isEmpty()) {
            DirectedGraphNode cur = queue.remove();
           	graph.remove(cur);
            for(DirectedGraphNode next : cur.neighbors) {
            	if(!graph.contains(next))
            		continue;
                if(next == t)
                    return true;
                queue.offer(next);
            }
        }
        return false;
    }
     
     
    // DFS
    public boolean hasRoute(ArrayList<DirectedGraphNode> graph, 
                            DirectedGraphNode s, DirectedGraphNode t) {
        // write your code here
        if(s == t)
            return true;
            
        graph.remove(s);
        for(DirectedGraphNode next : s.neighbors) {
        	if(!graph.contains(next))
            		continue;
            if(hasRoute(graph, next, t))
                return true;
        }
        graph.add(s);
        return false;
    }
}


</code>
</pre>
+++
topics = ["Algorithm"]
date = "2015-10-18T22:10:29-07:00"
levels = ["Medium"]
tags = ["Top K", "Array", "Iterator", "Heap"]
title = "Iterator and Top N Element"
+++

Given a Iterator with next giving instances of Line class
Design the function:`List<String> get_top_ips(Iterator iterator, int topN)`
<!--more-->
```
class Line { 
	String ip; 
	String request; 
}
```
## Solution
```java

	public List<String> get_top_ips(Iterator iterator, int topN) {
		Map<String, Integer> map = new HashMap<>();
		while(itertor.hasNext()) {
			Line cur = iterator.next();
			map.put(cur.ip, map.containsKey(cur.ip)? map.get(cur.ip) + 1 : 1);
		}
		PriorityQueue<Map.Entry<String, Integer>> heap = new PriorityQueue<>(new Comparator<Map.Entry<String, Integer>>(){
			@Override
			public int compare(Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2){
				return Integer.compare(o2.getValue(), o1.getValue());
			}
		});
		for(Map.Entry<String, Integer> entry : map) {
			heap.offer(entry);
		}
		List<String> res = new ArrayList<>();
		while(topN > 0) {
			res.add(heap.poll().getKey());
		}
		return res;
	}
```


+++
topics = ["Google","Algorithm"]
date = "2015-11-15T10:10:29-07:00"
levels = ["Medium"]
tags = ["Iterator"]
title = "Find Union and Intersection by Iterators"
banner = "/media/google.jpg"
+++

Given two iterators, find their union and intersection.
<!--more-->

## Solution
```java
	private static List<Integer> union(Iterator<Integer> itr1,
			Iterator<Integer> itr2) {
		Integer num1 = itr1.hasNext() ? itr1.next() : null;
		Integer num2 = itr2.hasNext() ? itr2.next() : null;
		List<Integer> res = new ArrayList<>();
		while (num1 != null || num2 != null) {
			if (num1 != null && num2 != null) {
				if (num1 < num2) {
					res.add(num1);
					num1 = itr1.hasNext() ? itr1.next() : null;
				} else if (num1 > num2) {
					res.add(num2);
					num2 = itr2.hasNext() ? itr2.next() : null;
				} else {
					res.add(num1);
					num1 = itr1.hasNext() ? itr1.next() : null;
					num2 = itr2.hasNext() ? itr2.next() : null;
				}
			} else if (num1 != null) {
				res.add(num1);
				num1 = itr1.hasNext() ? itr1.next() : null;
			} else {
				res.add(num2);
				num2 = itr2.hasNext() ? itr2.next() : null;
			}
		}
		return res;
	}

	private static List<Integer> intersection(Iterator<Integer> itr1,
			Iterator<Integer> itr2) {
		Integer num1 = itr1.hasNext() ? itr1.next() : null;
		Integer num2 = itr2.hasNext() ? itr2.next() : null;
		List<Integer> res = new ArrayList<>();
		while (num1 != null && num2 != null) {
			if (num1 < num2) {
				num1 = itr1.hasNext() ? itr1.next() : null;
			} else if (num1 > num2) {
				num2 = itr2.hasNext() ? itr2.next() : null;
			} else {
				res.add(num1);
				num1 = itr1.hasNext() ? itr1.next() : null;
				num2 = itr2.hasNext() ? itr2.next() : null;
			}
		}
		return res;
	}
```
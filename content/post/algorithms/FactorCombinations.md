+++
date = "2015-11-09T20:33:13-07:00"
levels = ["Medium"]
tags = ["Combination", "Recursion","Math"]
title = "Factor Combinations"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Numbers can be regarded as product of its factors. For example,
```
8 = 2 x 2 x 2;
  = 2 x 4.
```

Write a function that takes an integer n and return all possible combinations of its factors.

### Note

Each combination’s factors must be sorted ascending, for example: The factors of `2` and `6` is `[2, 6]`, not `[6, 2]`.

You may assume that n is always positive.

Factors should be greater than 1 and less than n.

### Examples

input: `1`

output: `[]`

input: `37`

output: `[]`

input: `12`

output:
`[ [2, 6], [2, 2, 3], [3, 4] ]`

input: `32`

output:
`[ [2, 16], [2, 2, 8], [2, 2, 2, 4], [2, 2, 2, 2, 2], [2, 4, 4], [4, 8] ]`

## Think
- Typical DFS idea. 
- For input value `n`, it has possible factors start from `2` to `Sqrt(n)`
- For every factor, we also calculate its factors, like: `16 -> 2, 8 -> 2, 2, 4 -> 2, 2, 2, 2, 2`
- Build helper function, the only difference between main recursion and helper recursion function is, in helper, we have to consider about the input value is one of factor which should also include in result list


## Solution
```java
	public List<List<Integer>> getFactors(int n) {
		// use hashset to avoid replicate
		Set<List<Integer>> res = new HashSet<>();
		int end = (int) Math.sqrt(n);
		for (int i = 2; i <= end; i++) {
			if (n % i != 0)
				continue;
			List<List<Integer>> prev = helper(n / i);
			for (List<Integer> each : prev) {
				each.add(i);
				// make sure the elements are sorted
				Collections.sort(each);
				res.add(each);
			}
		}
		return  new ArrayList<>(res);
	}

	private List<List<Integer>> helper(int n) {
		List<List<Integer>> res = new ArrayList<>();
		// add it self which is also a factor
		List<Integer> list = new ArrayList<>();
		list.add(n);
		res.add(list);

		int end = (int) Math.sqrt(n);
		for (int i = 2; i <= end; i++) {
			if (n % i != 0)
				continue;
			List<List<Integer>> prev = helper(n / i);
			for (List<Integer> each : prev) {
				each.add(i);
				res.add(each);
			}
		}
		return res;
	}
```
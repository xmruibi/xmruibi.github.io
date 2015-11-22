+++
topics = ["Algorithm"]
date = "2015-10-29T15:14:18-07:00"
levels = ["Easy"]
tags = ["Backtracking", "Permutation"]
title = "Scramble Number Pair Calculator"
+++

Let a pair of distinct positive integers, (i, j), be considered "scrambled" if you can obtain j by reordering the digits of i.  For example, (12345, 25341) is a scrambled pair, but (12345, 67890) is not.

Given integers A and B with the same number of digits and no leading zeroes, how many distinct scrambled pairs (i, j) are there that satisfy: A <= i < j <= B?
<!--more-->
For instance, if we let A = 10 and B = 99, the answer is 36:
(12,21), (13,31), (14,41), (15,51), (16,61), (17,71), (18,81), (19,91), (23,32), (24,42), (25,52), (26,62), (27,72), (28,82), (29,92), (34,43), (35,53), (36,63), (37,73), (38,83), (39,93), (45,54), (46,64), (47,74), (48,84), (49,94), (56,65), (57,75), (58,85), (59,95), (67,76), (68,86), (69,96), (78,87), (79,97), (89,98)

## Think and Solution
```java
public class Test {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.println("Input min range: ");
		int min = scanner.nextInt();
		System.out.println("Input max range: ");
		int max = scanner.nextInt();
		System.out.print(scrambleNumberCalculator(min, max));
		Map<Object,Object>  map = new HashMap();
		
	}
	
	/**
	 * Main function to do the scramble number pair calculation
	 * @param minRange  : minimum of range 
	 * @param maxRange : maximum of range
	 * @return
	 */
	public  static long scrambleNumberCalculator(int min, int max) {
		// the total scramble number set to avoid duplicate calculate
		Set<Integer> pairs = new HashSet<>();
				
		// the result of pairs count;
		long cnt = 0;	
		int[] range = new int[]{min, max};
		for (int i = range[0]; i <= range[1]; i++) {
			if (pairs.contains(i))
				continue;
			Set<Integer> res = new HashSet<>();
			List<Integer> list = convertDigitsList(i);
			permutation(res, list, range, 0, list.size());			
			cnt += combinationPair(res.size());
			// res size equal to one means there is no pair for this number
			// for saving pairs space I don't add the number with no scramble pair.
			if(res.size() > 1)
				pairs.addAll(res);
		}
		// System.out.println(pairs);
		return cnt;
	}
	
	/**
	 * The function to check current number has how many scramble number and store it in a set,
	 * recursion without return value but values are recorded in permutation set
	 * 
	 * @param res: the permutation result storage as a set
	 * @param digits: the current number digits for permutation 
	 * @param range: the range of output val
	 * @param cur: current permutation value
	 * @param idx: current permutation index for digits list
	 */
	private static void permutation(Set<Integer> res, List<Integer> digits, int[] range,
			int cur, int idx) {
		if (idx == 0) {
			if (cur >= range[0] && cur <= range[1])
				res.add(cur);
			return;
		}
		for (int i = 0; i < digits.size(); i++) {
			// avoid the zero leading number
			if (cur == 0 && digits.get(i) == 0)
				continue;
			cur = cur * 10 + digits.get(i);
			digits.remove(i);
			permutation(res, digits, range, cur, idx - 1);
			digits.add(i, cur % 10);
			cur /= 10;
		}
	}

	/**
	 * The function to count the pair amount in permutation set by just using the size of current scramble number set
	 * @param num: consider the large input I use long type here
	 * @return the amount of pair in current permutation set
	 */
	private static long combinationPair(long num) {
		long pairCnt = 0;
		for (int i = 0; i < num - 1; i++)
			for (int j = i + 1; j < num; j++)
				pairCnt++;
		return pairCnt;
	}

	/**
	 * The function to convert a number into a list with digits make the permutation more convenient
	 * @param num
	 * @return
	 */
	private static List<Integer> convertDigitsList(int num) {
		List<Integer> res = new LinkedList<>();
		while (num > 0) {
			res.add(0, num % 10);
			num /= 10;
		}
		return res;
	}
}
```
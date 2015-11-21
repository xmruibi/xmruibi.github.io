+++
date = "2015-11-14T22:43:13-07:00"
levels = ["Medium"]
tags = ["Array"]
title = "Balanced Point in Array"
topics = ["Career Cup", "Algorithm"]
banner = "/media/google.jpg"
+++

Balanced index of an array is an index such that the sum of elements at lower indexes is equal to the sum of elements at higher indexes. 
<!--more-->

### Example

In an arrya A:
```
A[0] = -7, A[1] = 1, A[2] = 5, A[3] = 2, A[4] = -4, A[5] = 3, A[6]=0
```

- `3` is an Balanced index, because: `A[0] + A[1] + A[2] = A[4] + A[5] + A[6]`

- `6` is also an Balanced index, because sum of zero elements is zero, i.e., `A[0] + A[1] + A[2] + A[3] + A[4] + A[5]=0`

- `7` is not an Balanced index, because it is not a valid index of array A.

Write a function int `balancedPoint(int[] arr)`; that given a sequence arr[] of size n, returns an Balanced index (if any) or -1 if no Balanced indexes exist.


## Think
The idea is to get total sum of array first. Then Iterate through the array and keep updating the left sum which is initialized as zero. In the loop, we can get right sum by subtracting the elements one by one. 

```
1) Initialize leftsum  as 0
2) Get the total sum of the array as sum
3) Iterate through the array and for each index i, do following.
    a)  Update sum to get the right sum.  
           sum = sum - arr[i] 
       // sum is now right sum
    b) If leftsum is equal to sum, then return current index. 
    c) leftsum = leftsum + arr[i] // update leftsum for next iteration.
4) return -1 // If we come out of loop without returning then
             // there is no equilibrium index
```

## Solution
```java
	// find all balance point in an array return balanced index
	public List<Integer> findBalancedPoint(int[] arr) {
		int leftsum = 0, rightsum = 0;
		List<Integer> res = new ArrayList<>();

		for (int i = 0; i < arr.length; i++) 
			leftsum += arr[i];
		
		for (int i = arr.length - 1; i>=0; i--) {
			leftsum -= arr[i];
			if(leftsum == rightsum)
				res.add(i);
			rightsum+=arr[i];
		}
		return -1;
	}
```

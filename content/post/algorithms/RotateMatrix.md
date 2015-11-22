+++
date = "2015-11-18T12:43:13-07:00"
levels = ["Medium"]
tags = ["Array", "Queue"]
title = "Rotate Matrix"
topics = ["Career Cup", "Amazon", "Algorithm"]
banner = "/media/careercup.png"
+++

Given A Matrix and rotate by input flag represent the direction of rotation.
<!--more-->

## Solution
```java
public class Solution{
	public int[][] rotateMatrix(int[][] matrix, boolean flag) {
		int n = matrix.length - 1;
		// in-place solution
		for (int i = 0; i < n; i++) {
			for (int j = i; j < n - i; j++) {
			// do it in 1/4 area of matrix
				int temp;
				if(flag) {
					temp = matrix[j][n - i];
					matrix[j][n - i] = matrix[i][j];
					matrix[i][j] = matrix[n - j][i];
					matrix[n - j][i] = matrix[n - i][n - j];
					matrix[n - i][n - j] = temp;
				}else{
					temp = matrix[n - i][n - j];
					matrix[n - i][n - j] = matrix[n - j][i];
					matrix[n - j][i] = matrix[i][j];
					matrix[i][j] = matrix[j][n - i];
					matrix[j][n - i] = temp;
				}
			}
		}
	}
}
```


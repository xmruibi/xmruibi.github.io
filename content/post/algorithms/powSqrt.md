+++
date = "2015-11-15T13:11:13-07:00"
levels = ["Medium"]
tags = ["Binary Search", "Math"]
title = "Pow() and Sqrt()"
topics = ["Career Cup", "Algorithm"]
banner = "/media/careercup.png"
+++
Write function to get the power `n` of `x` and the square root of `x`;
<!--more-->
## Solution # Pow
```java
	// basic  
	public float pow(float x, int n) {
	    if(n==0)
            return 1.0;
		if (n == 1)
			return x;
		if (n % 2 == 0)
			return pow(x, n / 2) * pow(x, n / 2);
		else
			return x * pow(x, n / 2) * pow(x, n / 2);
	}

	// improved
	public double pow(double x, int n) {
        if(n==0)
            return 1.0;
        boolean neg = false;
        if(n<0)
            neg = true;
        double res = 1.0;
        while(n != 0){
            if(n%2 != 0){
                res *= x;
            }
            x *= x;
            n /= 2;
        }
        return neg?1.0/res:res;
    }
```

## Solution # Sqrt
```java
	public float sqrt(float n) {
		float low = 0, high = n;
		float mid = low + (high - low) / 2;
		while (Math.abs(mid * mid - n) > 0.00001) {
			if (mid * mid < n)
				low = mid;
			else if (mid * mid > n)
				high = mid;
			mid = low + (high - low) / 2;
		}
		return mid;
	}
```
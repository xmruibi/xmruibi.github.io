+++
date = "2015-11-12T00:03:07-07:00"
levels = []
tags = ["Data Type"]
title = "Double Type and Float Type"
topics = ["Java"]
banner = "/media/java.jpg"
+++

Float number and Double number are always a headache for Java developer. Lots of traps inside of these two types. Let's see how it works inside on physical memory and software layer.
<!--more-->
## Memory Structure
### Float:
- 1 bit for Sign  
- 8 bits Exponent (-128~+127) (complement)
- 23 bits Integer       
```
	| 1  |    8    |         23       |
	|sign| exponent|       number     |
```

### Double:
- 1 bit for Sign  
- 11 bits Exponent (-1024~+1023) (complement)
- 52 bits Integer       
```
	| 1  |     11    |         52        |
	|sign|  exponent |        number     |
```


## Accuracy
float和double的精度是由尾数的位数来决定的。浮点数在内存中是按科学计数法来存储的，其整数部分始终是一个隐含着的“1”，由于它是不变的，故不能对精度造成影响。

float：2^23 = 8388608，一共七位，由于最左为1的一位省略了，这意味着最多能表示8位数： 2*8388608 = 16777216 。有8位有效数字，但绝对能保证的为7位，也即float的精度为7~8位有效数字；

double：2^52 = 4503599627370496，一共16位，同理，double的精度为16~17位。

之所以不能用f1==f2来判断两个数相等，是因为虽然f1和f2在可能是两个不同的数字，但是受到浮点数表示精度的限制，有可能会错误的判断两个数相等！

可以用下面这段代码检验一下：
```java
		float f1 = 16777215f;  
		for (int i = 0; i < 10; i++) {  
		    System.out.println(f1);  
		    f1++;  
		}  
```

对于小数来说，更容易会因为精度而出错误。
```java
		float f = 2.2f;  
		double d = (double) f;  
		System.out.println(d);   
		f = 2.25f;  
		d = (double) f;  
		System.out.println(d);   
```
输出结果为：
```
        2.200000047683716
        2.25
```

2.25的单精度存储方式，转化为2进制位便是`10.01`，整理为`1.001*2` 很简单。
2.25的双精度表示为:`0 100 0000 0001 0010 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000`,这样2.25在进行强制转换的时候，数值是不会变的。

2.2用科学计数法表示应该为：将十进制的小数转换为二进制的小数的方法为将小数*2，取整数部分，所以0.282=0.4，所以二进制小数第一位为0.4的整数部分0，0.4×2=0.8，第二位为0,0.8*2=1.6,第三位为1，0.6×2 = 1.2，第四位为1，0.2*2=0.4，第五位为0，这样永远也不可能乘到=1.0，得到的二进制是一个无限循环的排列 00110011001100110011... ,对于单精度数据来说，尾数只能表示24bit的精度，所以2.2的float存储为:
`0 1000 0001 001 1001 1001 1001 1001 1001`. 但是这样存储方式，换算成十进制的值，却不会是2.2的，因为十进制在转换为二进制的时候可能会不准确，如2.2，而double类型的数据也存在同样的问题，所以在浮点数表示中会产生些许的误差，在单精度转换为双精度的时候，也会存在误差的问题。




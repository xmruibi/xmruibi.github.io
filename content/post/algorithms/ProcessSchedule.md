+++
date = "2015-11-18T12:43:13-07:00"
levels = ["Medium"]
tags = ["Array", "Queue"]
title = "Process Schedule Problems"
topics = ["Career Cup", "Amazon", "Algorithm"]
banner = "/media/careercup.png"
+++
Process schedule is very important to Operation System. There are several algorithm to deal with such problem. Here we discuss two of them. At first, we are given a process class for coding conveninence. 
```java
	private class Process{
		int arrTime;
		int exeTime;
		public Process(int arrTime, int exeTime) {
			this.arrTime = arrTime;
			this.exeTime = exeTime;
		}
	}
```
<!--more-->

## Problem One
**Robin Round:** The question is about the robin round. Given an array with start time of each task and another array represent the executing time of each task and `q` for quantum which is allowance of CPU time, means the maximum time for exeuting one task. Write a function, calculate the average waiting time on each task. 


## Solution #Robin Round
```java
public class Solution{
	public double robinRound(int[] arrTime, int[] exeTime, int q) {
		if(arrTime == null || exeTime == null || arrTime.length == 0 || exeTime.length == 0)
			return 0;
		Queue<Process> queue = new LinkedList<>();
		int idx = 0, waitTime = 0, curTime = 0;
		while(idx < arrTime.length || !queue.isEmpty()) {
			if(queue.isEmpty()) {
				queue.offer(new Process(arrTime[idx], exeTime[idx]));
				curTime = arrTime[idx++];
			}else{
				Process curProcess = queue.poll();
				waitTime += (curTime - curProcess.arrTime);
				curTime += Math.min(curProcess.exeTime, q);
				// push those process which has arrival time less than current time
				while(idx < arrTime.length && arrTime[idx] < curTime) {
					queue.offer(new Process(arrTime[idx], exeTime[idx++]));
				}
				// if current process didn't be processed at all, push it back to queue
				if(curProcess.exeTime > q) {
					curProcess.exeTime -= q; 
					queue.offer(curProcess);
				}
			}
		}
		return (double) waitTime / (double) arrTime.length;
	}

}
```


## Problem Two
Given an array with start time of each task and another array represent the executing time of each task. Process these task by the principle that the shortest job should always run firstly. Write a function to achieve that.

## Solution #Shortest Job First
```java
public class Solution{
	public double robinRound(int[] arrTime, int[] exeTime, int q) {
		if(arrTime == null || exeTime == null || arrTime.length == 0 || exeTime.length == 0)
			return 0;
		PriorityQueue<Process> queue = new PriorityQueue<>(new Comparator<Process>(){
			@Override
			public int compare(Process p1, Process p2) {
				if (p1.exeTime == p2.exeTime)
					return p1.arrTime - p2.arrTime;
				return Integer.compare(p1.exeTime, p2.exeTime);
			}
		});
		int idx = 0, waitTime = 0, curTime = 0;
		while(idx < arrTime.length || !queue.isEmpty()) {
			if(queue.isEmpty()) {
				queue.offer(new Process(arrTime[idx], exeTime[idx]));
				curTime = arrTime[idx++];
			}else{
				Process curProcess = queue.poll();
				waitTime += (curTime - curProcess.arrTime);
				curTime += curProcess.exeTime;
				// push those process which has arrival time less than current time
				while(idx < arrTime.length && arrTime[idx] <= curTime) {
					queue.offer(new Process(arrTime[idx], exeTime[idx++]));
				}
			}
		}
		return (double) waitTime / (double) arrTime.length;
	}
}
```

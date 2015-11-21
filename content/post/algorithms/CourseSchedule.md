+++
date = "2015-11-14T13:43:13-07:00"
levels = ["Medium"]
tags = ["Topological Sort"]
title = "Course Schedule I/II"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

<!--more-->
## Problem I
There are a total of n courses you have to take, labeled from `0` to `n - 1`.

Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: `[0,1]`

Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

For example:
```
2, [[1,0]]
```
There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.
```
2, [[1,0],[0,1]]
```
There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

### Solution #Topological Sort
```java
public class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        HashMap<Integer, Course> map = new HashMap<>();
        for(int[] pair : prerequisites) {
            int pre = pair[1];
            int cur = pair[0];
            if(!map.containsKey(pre))
                map.put(pre, new Course(pre));
            if(!map.containsKey(cur))
                map.put(cur, new Course(cur));
            map.get(pre).nexts.add(map.get(cur));
            map.get(cur).preq++;
        }
        Queue<Course> queue = new LinkedList<>();
        for(Course c : map.values()) {
            if(c.preq == 0)
                queue.offer(c);
        }
        
        while(!queue.isEmpty()) {
            Course cur = queue.poll();
            map.remove(cur.idx);
            for(Course next : cur.nexts) {
                next.preq--;
                if(next.preq == 0)
                    queue.offer(next);
            }
        }
        return map.size() == 0;
    }
}
class Course{
    int idx;
    int preq;
    ArrayList<Course> nexts;
    public Course(int index) {
        this.idx = index;
        this.preq = 0;
        this.nexts = new ArrayList<>();
    }
}
```

## Problem II
Given the total number of courses and a list of prerequisite pairs, return the ordering of courses you should take to finish all courses.

There may be multiple correct orders, you just need to return one of them. If it is impossible to finish all courses, return an empty array.

#### Example
```
2, [[1,0]]
```
There are a total of 2 courses to take. To take course `1` you should have finished course `0`. So the correct course order is `[0,1]`
```
4, [[1,0],[2,0],[3,1],[3,2]]
```
There are a total of 4 courses to take. To take course `3` you should have finished both courses `1` and `2`. Both courses `1` and `2` should be taken after you finished course 0. So one correct course order is `[0,1,2,3]`. Another correct ordering is `[0,2,1,3]`.

### Solution #Topological Sort
```java
public class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        if(prerequisites == null || prerequisites.length == 0)
            return new int[0];
            
        HashMap<Integer, Course> map = new HashMap<>();
        for(int[] pair : prerequisites) {
            int pre = pair[1];
            int cur = pair[0];
            if(!map.containsKey(pre))
                map.put(pre, new Course(pre));
            if(!map.containsKey(cur))
                map.put(cur, new Course(cur));
            map.get(pre).nexts.add(map.get(cur));
            map.get(cur).preq++;
        }
        Queue<Course> queue = new LinkedList<>();
        for(Course c : map.values()) {
            if(c.preq == 0)
                queue.offer(c);
        }
        int[] res = new int[numCourses];
        int index = 0;
        while(!queue.isEmpty()) {
            Course cur = queue.poll();
            res[index++] = cur.idx;
            map.remove(cur.idx);
            for(Course next : cur.nexts) {
                next.preq--;
                if(next.preq == 0)
                    queue.offer(next);
            }
        }
        return map.size() == 0 ? res : new int[0];
    }
}
class Course{
    int idx;
    int preq;
    ArrayList<Course> nexts;
    public Course(int index) {
        this.idx = index;
        this.preq = 0;
        this.nexts = new ArrayList<>();
    }
}
```
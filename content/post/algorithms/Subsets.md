+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-08T22:10:29-07:00"
levels = ["Medium"]
tags = ["Combination", "Array"]
title = "Subsets I & II"
banner = "/media/leetcode.png"
+++


Given a set of distinct integers, return all possible subsets.
<!--more-->

### Example
If S = `[1,2,3]`, a solution is:

```
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

### Note
Elements in a subset must be in non-descending order.

For Question I: The solution set must not contain duplicate subsets.
For Question II: The solution set may contain duplicate subsets.

```
// Question I：
public class Solution {
    public ArrayList<ArrayList<Integer>> subsets(int[] num) {
        ArrayList<ArrayList<Integer>> result = new ArrayList<ArrayList<Integer>>();
        if(num == null || num.length == 0) {
            return result;
        }
        ArrayList<Integer> list = new ArrayList<Integer>();
        Arrays.sort(num);  
        subsetsHelper(result, list, num, 0);

        return result;
    }


    private void subsetsHelper(ArrayList<ArrayList<Integer>> result,
        ArrayList<Integer> list, int[] num, int pos) {

        result.add(new ArrayList<Integer>(list));

        for (int i = pos; i < num.length; i++) {
            list.add(num[i]);
            subsetsHelper(result, list, num, i + 1);
            list.remove(list.size() - 1);
        }
    }
}


// Question II:
public class Solution {
    public ArrayList<ArrayList<Integer>> subsetsWithDup(ArrayList<Integer> num) {
        ArrayList<ArrayList<Integer>> result = new ArrayList<ArrayList<Integer>>();
        if(num == null || num.size() == 0) {
            return result;
        }
        ArrayList<Integer> list = new ArrayList<Integer>();
        Collections.sort(num);  
        subsetsHelper(result, list, num, 0);

        return result;
    }


    private void subsetsHelper(ArrayList<ArrayList<Integer>> result,
        ArrayList<Integer> list, ArrayList<Integer> num, int pos) {

        result.add(new ArrayList<Integer>(list));

        for (int i = pos; i < num.size(); i++) {
            if(i > pos && num.get(i) == num.get(i-1))
                continue;
            list.add(num.get(i));
            subsetsHelper(result, list, num, i + 1);
            list.remove(list.size() - 1);
        }
    }
}
```
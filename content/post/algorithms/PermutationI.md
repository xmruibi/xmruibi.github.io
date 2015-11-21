+++
date = "2015-10-19T20:43:13-07:00"
levels = []
tags = ["Permutation", "Math"]
title = "Permutation"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given a list of numbers, return all possible permutations.
 <!--more-->

### Example
For nums = [1,2,3], the permutations are:
```
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

### Challenge
Do it without recursion.

## Think 
#### Method One:
 Backtracking, with memorized the element usage, which takes space, or we can search on arraylist(more time);

## Solution
```java
class Solution {
    /**
     * @param nums: A list of integers.
     * @return: A list of permutations.
     */
    public ArrayList<ArrayList<Integer>> permute(ArrayList<Integer> nums) {

        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        if(nums == null || nums.size() == 0)
            return res;
        helper(res, new ArrayList<Integer>(), nums);
        return res;
    }
    
    private void helper(ArrayList<ArrayList<Integer>> res, ArrayList<Integer> list,  ArrayList<Integer> nums ) {
        
        if(list.size() == nums.size()) {
            res.add(new ArrayList<Integer>(list));
            return;
        }
        
        for(int i = 0; i<nums.size(); i++){
        	// to check if this number already taken
            if(list.contains(nums.get(i)))
                continue;
            
            list.add(nums.get(i));
            helper(res, list, nums);
            list.remove(list.size() - 1);
        }
    }
}
```

## Solution #[Swap](https://www.cs.princeton.edu/~rs/talks/perms.pdf);

<img src="/media/PermutationSwap.png" alt="" /> 

``` java
class Solution {
  private static Set<Integer> exchPermutation(int[] arr) {
    Set<Integer> set = new HashSet<>();
    int i = 0, num = 0;
    outer: while(true) {
      
      while(i < arr.length - 1) {
        num = exchGenerate(arr, i, ++i);
        if(set.contains(num))
          break outer;
        set.add(num);
      }
      
      num = exchGenerate(arr, 0, 1);
      if(set.contains(num))
        break outer;
      set.add(num);
      
      while(i > 0) {
        num = exchGenerate(arr, --i, i+1);
        if(set.contains(num))
          break outer;
        set.add(num);
      }
      
      num = exchGenerate(arr, arr.length - 2, arr.length - 1);
      if(set.contains(num))
        break outer;
      set.add(num);
    }
    return set;
  }
  
  private static int exchGenerate(int[] arr, int i, int j) {
    int tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    
    int res = 0;
    for(int n : arr){
      res = res*10 + n;
    }
    return res;
  }
}

```

## Follow Up
Given a collection of numbers that might contain duplicates, return all possible unique permutations.

### Example
`[1,1,2]` have the following unique permutations:
`[1,1,2]`, `[1,2,1]`, and `[2,1,1]`.


## Solution #Followup
```java
    public List<List<Integer>> permuteUnique(int[] num) {
      List<List<Integer>> result = new ArrayList<List<Integer>>();
      Arrays.sort(num);
      helper(new boolean[num.length], num, new ArrayList<Integer>(),result);
      return result;
    }

    public void helper(boolean[] isUsed, int[] num, List<Integer> cur, List<List<Integer>> result){
      if(cur.size() == num.length){
        result.add(new ArrayList<Integer>(cur));
        return;
      }

      for(int i=0;i<num.length;i++){
        if ((i>0&&num[i]==num[i-1]&&(!isUsed[i-1])) || isUsed[i])
          continue;
        cur.add(num[i]);
        isUsed[i] = true;
        helper(isUsed, num, cur,result);
        isUsed[i] = false;
        cur.remove(cur.size() - 1);
      }
    }
```
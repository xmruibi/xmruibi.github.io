+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-14T20:10:29-07:00"
levels = ["Medium"]
tags = ["String", "Combination", "Recursion"]
title = "Letter Combinations of a Phone Number"
banner = "/media/leetcode.png"
+++

Given a digit string, return all possible letter combinations that the number could represent.

<!--more-->

### Example
Given `23`

Return `["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]`

### Note
Although the above answer is in lexicographical order, your answer could be in any order you want.



```
public class Solution {
    /**
     * @param digits A digital string
     * @return all posible letter combinations
     */
    public ArrayList<String> letterCombinations(String digits) {
        ArrayList<String> res = new ArrayList<>();
        if(digits == null ||digits.length() == 0)
            return res;
        HashMap<Character, String> dict = new HashMap<>();
        dict.put('2',"abc");dict.put('3',"def");dict.put('4',"ghi");dict.put('5',"jkl");
        dict.put('6',"mno");dict.put('7',"pqrs");dict.put('8',"tuv");dict.put('9',"wxyz");

        helper(dict, res, "", digits, 0);
        return res;
    }
    
    private void helper(HashMap<Character, String> dict, ArrayList<String> res, String str, String digits, int idx) {
        if(idx == digits.length()) {
            res.add(new String(str));
            return;
        }
        String letters = dict.get(digits.charAt(idx));
        for(int i = 0; i < letters.length(); i++) {
            str += letters.charAt(i);
            helper(dict, res, str, digits, idx + 1);
            str = str.substring(0, idx);
        }
    }
}
```
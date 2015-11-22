+++
date = "2015-11-11T10:43:13-07:00"
levels = ["Hard"]
tags = ["Math", "Dynamic Programming"]
title = "Nim Game"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

You are playing the following Nim Game with your friend: There is a heap of stones on the table, each time one of you take turns to remove 1 to 3 stones. The one who removes the last stone will be the winner. You will take the first turn to remove the stones.
<!--more-->

Both of you are very clever and have optimal strategies for the game. Write a function to determine whether you can win the game given the number of stones in the heap.

For example, if there are 4 stones in the heap, then you will never win the game: no matter 1, 2, or 3 stones you remove, the last stone will always be removed by your friend.

### Hint

If there are 5 stones in the heap, could you figure out a way to remove the stones such that you will always be the winner?

## Think
- Similar with the Coin in A Line I
- The death number will be the multiply of `the max amount your can taken +1`.
- So just check if the total amount is the multiply of `4`

#### Proof:

1. the base case: when `n` = `4`, as suggested by the hint from the problem, no matter which number that that first player, the second player would always be able to pick the remaining number.

2. For `1 x 4` < `n` < `2 x 4`, (`n` = `5, 6, 7`), the first player can reduce the initial number into 4 accordingly, which will leave the death number 4 to the second player. i.e. The numbers `5, 6, 7` are winning numbers for any player who got it first.

3. Now to the beginning of the next cycle, n = 8, no matter which number that the first player picks, it would always leave the winning numbers (5, 6, 7) to the second player. Therefore, `8 % 4 == 0`, again is a death number.

4. Following the second case, for numbers between `(2 x 4 = 8)` and `(3 x 4=12)`, which are `9`,`10`, `11`, are winning numbers for the first player again, because the first player can always reduce the number into the death number 8.

## Solution
```java
    public boolean canWinNim(int n) {
        return n%4 != 0;
    }
```
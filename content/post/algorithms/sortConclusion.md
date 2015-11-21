+++
date = "2015-11-01T16:13:13-07:00"
levels = []
tags = ["Sort"]
title = "Sort Algorithms Conclusion"
topics = ["Algorithm"]
+++

Sorting is ordering a list of objects. We can distinguish two types of sorting. If the number of objects is small enough to fits into the main memory, sorting is called internal sorting. If the number of objects is so large that some of them reside on external storage during the sort, it is called external sorting. In this chapter we consider the following internal sorting algorithms
<!--more-->
## By Complexity
- Time Complexity: $O(N^2)$
    - Bubble Sort
    - Selection Sort
    - Insertion Sort (min: $O(N))$
- Time Complexity: $O(Nlog_2N)$
    - Quick Sort (Space Complexity: $O(Nlog_2N)$)
    - Merge Sort (Space Complexity: $O(N)$)
    - Heap Sort
- Time Complexity: $O(N)$ && Space Complexity: $O(N)$
    - Bucket sort


## By Stable
- Stable
    - Insertion sort
    - Merge Sort
- Not Stable    
    - Bubble Sort
    - Selection Sort
    - Quick Sort
    - Merge Sort
    - Heap Sort


Elementary Sort
===

These are most basic sort methods with $O(N^2)$ time complexity.

## Bubble Sort
### Think
- Swap when the two adjacent elements is not in order
- Do a while loop until swap not happened in previous element order check

### Solution
```java
public void bubbleSort(int[] arr){
    boolean swap;
    do{
        swap = false;
        for(int i = 0; i < arr.length - 1; i++){
            if(arr[i] > arr[i + 1]){
                int tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                swap = true;
            }
        }
    }while(swap);
}
```

## Insertion Sort
### Think
- Get the target value from head of array
- Find its suitable position from 0 to its position

### Solution
```java
public void insertionSort(int[] arr){
    for(int i = 1; i < arr.length; i++){
        for(int j = 0; j < i; j++) {
            if(arr[j] > arr[i]) {
                int tmp = arr[j];
                arr[j] = arr[i];
                arr[i] = tmp;
            }
        }
    }
}
```

## Selection Sort
### Think
- Get the target value from head of array
- Find the minimum element on the right of target, swap them if minimum less then target

### Solution
```java
public void selectionSort(int[] arr){
    for(int i = 0; i < arr.length - 1; i++){
        int min = i;
        for(int j = i + 1; j < arr.length; j++) {
            if(arr[min] > arr[j])
                min = j;
        }
        if(i!=min) {
            int tmp = arr[min];
            arr[min] = arr[i];
            arr[i] = tmp;
        }
    }
}
```


Advanced Sort
===

## Merge Sort
### Think 
- Divide and Conquer
- Recursion

### Solution
```java
public void mergeSort(int[] arr, int left, int right){
    if(left >= right)
        return;
    int mid = left + ((right - left) >> 1);
    mergeSort(arr, left, mid - 1);
    mergeSort(arr, mid, right);
    merge(arr, left, mid, right);
}

private void merge(int[] arr, int left, int mid, int right){
    int[] newarr = new int[right - left + 1];
  
    for(int i = left; i <= right; i++)
        newarr[i - left] = arr[i];
  
    int l = 0;
    int r = mid - left + 1;
    for(int i = left; i <= right; i++){
        if(l > mid - left)
            arr[i] = newarr[r++];
        else if(r > right - left)
            arr[i] = newarr[l++];
        else
            arr[i] = newarr[l] < newarr[r]? newarr[l++] : newarr[r++];
    }
}
```


## Quick Sort
### Think
- Set pivot (the rear of array or ) and consider it as a standard
- Pass the array and make the element less than pivot on the pivot's left and the element larger than pivot on the pivot's right;


### Solution
```java
public void quickSort(int[] arr, int l, int r){
    if(l > r)
        return;
        
    int pivot = pivot(arr, l, r);
    quickSort(arr, l, pivot - 1);
    quickSort(arr, pivot + 1, r);
}


private int pivot(int[] arr, int l, int r){
    int pivot = arr[r];
    int idx = l;
    for(int i = l; i < r; i++){
        if(arr[i] < pivot){
            int tmp = arr[idx];
            arr[idx++] = arr[i];
            arr[i] = tmp;
        }
    }
    arr[r] = arr[idx];
    arr[idx] = pivot;
    return idx;
}
```
















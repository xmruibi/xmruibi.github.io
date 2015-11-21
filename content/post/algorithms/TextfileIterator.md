+++
topics = ["Career Cup","Algorithm"]
date = "2015-11-13T20:40:29-07:00"
levels = ["Medium"]
tags = ["Iterator"]
title = "Text File Iterator"
banner = "/media/careercup.png"
+++

Implement a (Java) Iterable object that iterates lines one by one from a text file.
<!--more-->
```java
/** A reference to a file. */
public class TextFile implements Iterable<String> {
  public TextFile(String fileName) { 
  	// please implement this
  }
  /** Begin reading the file, line by line. The returned Iterator.next() will return a line. */ 
  @Override
  public Iterator<String> iterator() { 
  	// please implement this
  }
```
## Think #1
- Keep maintain a BufferedReader
- The tricky part is the hasNext function, we should not use checking `br.readline() != null` in this function, since it will cause the line skipping.
- So notice the `mark()` and `reset()` method in bufferedreader.

## Solution #1
```java
public class TextFileIterator implements Iterable<String> {

	private final BufferedReader br;

	public TextFileIterator(String path) throws FileNotFoundException {
		br = new BufferedReader(new InputStreamReader(new FileInputStream(
				new File(path))));

	}

	public Iterator<String> iterator() {
		return new Iterator<String>() {
			@Override
			public boolean hasNext() {
				try {
					br.mark(1);
					if (br.read() < 0) 
						return false;					
					br.reset();
					return true;
				} catch (IOException e) {
					return false;
				}
			}

			@Override
			public String next() {
				try {
					return br.readLine();
				} catch (IOException e) {
					return null;
				}
			}
		};
	}
}
```

## Think #2
- Scanner

## Solution #2
```java
public class TextFileIterator implements Iterable<String> {

	private final Scanner sc;
	
	public TextFileIterator(String path) throws FileNotFoundException {
			sc = new Scanner(new File(path));
	}

	public Iterator<String> iterator() {
		return new Iterator<String>() {
			@Override
			public boolean hasNext() {
				return sc.hasNext();
			}

			@Override
			public String next() {
				return sc.nextLine();
			}
		};
	}
}
```

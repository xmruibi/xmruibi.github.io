+++
date = "2015-11-14T22:43:13-07:00"
levels = ["Medium"]
tags = ["String"]
title = "Find Valid IP Address in a File"
topics = ["Career Cup", "Algorithm"]
banner = "/media/careercup.png"
+++

Given a file with many lines of Strings, find those valid IP address from them.
<!--more-->

## Solution
```java
class ValidIPAddress {

	public List<String> findValidIPAddr(String filePath) throws IOException {
		List<String> addresses = new ArrayList<>();
		Scanner sc = new Scanner(new File(filePath));
		while (sc.hasNext()) {
			String line = sc.next();
			if(validIP(line))
				addresses.add(line);
		}
		return addresses;
	}

	private boolean validIP(String str) {
		try {
			String[] parts = str.split(".");
			// check segment length;
			if (parts.length != 4 || str.endsWith("."))
				return false;

			// check each segment valid or not
			for (int i = 0; i < parts.length; i++) {
				String s = parts[i];
				int val = Integer.parseInt(s);
				if ((s.charAt(0) == '0') || (val < 0 || val > 255)
						|| (i == 0 && val == 0))
					return false;
			}
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}
}
```
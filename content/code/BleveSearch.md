+++
type = "post"
date = "2015-10-10T23:56:15-07:00"
tags = ["Bleve Search", "Configuration"]
title = "How to do the insite search in Hugo?"
topics = ["Information Retrieval", "JavaScript"]
lightbox = true
author = "Rui Bi"
banner = "/media/banner/bleve-search.png"
+++

Since I tried to avoid using the Google tool, searching insite content in static site like Hugo seems a tough thing for me.  However, I just found <a href="https://github.com/blevesearch/hugoidx">Bleeve Search</a>, which is a great tool to assist the insite search.

There are three steps to adding search to your site. First, you must build the index. Second, you must host the index. Third, you add a search page to your site.

### Building the Index
0.  Preparation: Check you have installed Go. Two ways to install Go, see the instruction in <a href="https://golang.org/dl/"> Download GO</a>. Also, be awared to the GOPATH
	
		export %GOPATH = ".../..."
		source etc/profile
		echo $GOPATH
	

1.  Be sured you've also installed Mercurial. Check it by command `hg`. You can use `brew` to install it.
		
		brew install hg

2.  Install **hugoidx** - this is the command we will use build the search index.  Anytime you update your content and regenerate your site using the `hugo` command, you'll also want to rebuild your search index.

        go get github.com/blevesearch/hugoidx

3.  `cd <your hugo site>`
4.  `hugoidx`

	You should now have a file named `search.bleve`.

### Hosting the Index

In order to host the index we need to run a small Go program that is available on the internet.  To simplify this process, we have built a reusable application called `bleve-hosted`.  You can use this application safely answer queries to the index (read-only operations).

1.  Install `bleve-hosted`

		go get github.com/blevesearch/bleve-hosted

2.  `cd $GOPATH/src/github.com/blevesearch/bleve-hosted`
3.  `bleve-hosted`
4.  Test that its working:

		curl http://localhost:8080/api/test.bleve/_search -d '{"query":{"query":"bleve"}}'

	The resulting JSON should include "total_hits": 1

5.  Copy the `search.bleve` index you generated earlier into your `indexes/` folder.  (This can really be anywhere, it will always look for an `indexes/` folder relative to the current working directly when you launch `bleve-hosted`.)

6.  Restart `bleve-hosted` and optionally configure your server to keep this process running long term (init-scripts, etc)

### Add Search to your Site

Finally, we're ready to add a search page to our site.  Several files were downloaded as a part of the `hugoidx` package to help you get started.  Feel free to customize these files to best adapt them to your site.

1.  `cd <your hugo site>`
2.  Copy the main search page:

		cp $GOPATH/src/github.com/blevesearch/hugoidx/search.md content/

3.  Check and copy two Javascript files in my Github:
		
		https://github.com/xmruibi/xmruibi.github.io/blob/master/js/handlebars.js
		https://github.com/xmruibi/xmruibi.github.io/blob/master/js/search.js

	Copy these two files into your `static/` folder. Also, make sure you've `jquery.min.js` in this folder.


	handlebars.js is used to render search results using a simple template syntax.  
	search.js is our custom code to bind everything together.


	jQuery is used to make AJAX requests from the browser to `bleve-hosted`.

4.  Update your layout to include these javascript files.  For many sites this will be in a file like `layouts/partial/footer.html` or `themes/<your theme>/layouts/partials/footer.html`.  In the section where javascript files are being included you'll want to add:

		<script src="/js/jquery.min.js"></script>
		<script src="/js/handlebars.js"></script>
		<script src="/js/search.js"></script>

5.  Finally, we need to update search.js to point to the correct URL for `bleve-hosted`.  On line 2 of `static/js/search.js` modify the value:

		var searchURL = 'http://<your server>:8080/api/search.bleve/_search'

### Touch the Search function

You need to setup file `search.html` in `layout/partials/modules/site/link`, which is for the search bar in navgation sidebar. And also a `search.md` file in your content folder. 

Here provided a great CSS to generate the beautiful search bar. Please check <a href ="https://github.com/xmruibi/xmruibi.github.io/blob/master/css/search.css"> Code </a>.

Make you search form includes both components:
		
		<input id="page" name="p" value="1" type="hidden"/>
        <input id="query" name="q" type="search" placeholder="Search" />

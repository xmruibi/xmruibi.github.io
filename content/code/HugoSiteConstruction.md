+++
type = "post"
date = "2015-10-12T23:33:07-07:00"
tags = ["Hugo", "Go", "JavaScript", "Markdown", "Website Construction"]
title = "How to build a Hugo Site like this site?"
topics = ["Web Development"]
banner = "/media/banner/hugo.png"
+++

This is how I build this site and the instruction for people who wanna use <a href="http://gohugo.io/">Hugo</a> to build static site as Github Personal Page.
<!--more-->

## What is Hugo?

> Hugo is a general-purpose website framework. Technically speaking, Hugo is a static site generator.

Yes, Hugo is a kind of static site generator. Unlike the WordPress, Ghost, or Drupal, static web site doesn't need to generate the page content when it received any request. So that means all pages should be set up once the site is built. Here is one more instruction for [Hugo](https://www.udemy.com/build-static-sites-in-seconds-with-hugo/)


## What should you learn?

Hugo is built by Go language. Why use the Go? Author [Steve Francia](http://spf13.com) said:

> I looked at existing static site generators like Jekyll, Middleman and nanoc. All had complicated dependencies to install and took far longer to render my blog with hundreds of posts than I felt was acceptable. I wanted a framework to be able to get rapid feedback while making changes to the templates, and the 5+-minute render times was just too slow. In general, they were also very blog minded and didn’t have the ability to have different content types and flexible URLs.

> I wanted to develop a fast and full-featured website framework without dependencies. The Go language seemed to have all of the features I needed in a language. I began developing Hugo in Go and fell in love with the language. I hope you will enjoy using (and contributing to) Hugo as much as I have writing it.


Another thing you must know is MarkDown language, which is for writing your article. Please see the introduction of [Markdown](https://en.wikipedia.org/wiki/Markdown)

## Start you Hugo journey!

Install by `brew`! What? You don't know that? Do the following:

```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Check you `brew` has updated! 
```
$ brew update
```
Make sure your `brew` has lastest `hugo` version
```
$ brew info hugo
hugo: stable 0.14 (bottled), HEAD
```

Then start install `hugo`!

```
$ brew install hugo
```

Well done! Finished! You've install Hugo! But...wait...How to build a site?

Let's go! 

```
$ hugo new site yourFolder/siteFileName
$ cd /thatPath

```

Then you'll see the Hugo structure like this!

```
 ▸ archetypes/ 
 ▸ content/
 ▸ layouts/
 ▸ static/
   config.toml

```

``config.toml`` that is most important thing! That guides your configuration globally for your site, includes ``baseurl``, ``title``, ``copyright``....

For other folders:

* archetypes：for content type! make your rules for new generate .md content.
* content：for your articles. stores all your articles by using markdown format!
* layouts：for layout pattern. decide how your site showing structure. You can make your html as modules here.
* static：includes css, js, fonts, media.

So easy! 

Make a new article? Try this!
```
$ hugo new /post/yourArticle.md
```

That will generate a `post` folder in your `content` folder and also a `yourArticle.md` file!

Try do write some thing in your article!


```
+++
date = "2015-02-01T18:19:54+08:00"
draft = true
title = "about"

+++

#About Me!

 - experience one
 - experience two
```

`+++` means the format for `.toml` format. You can also use `---` for `.yaml` format.


## Themes for Hugo

However, there is nothing can show in your site. Because you don't have the skin of your site! What is skin? That is the themes for Hugo! Theme for Hugo like the website template. That decides what your site look like! Hugo is convenient because your can easily to change your theme for entire site!

Let's make a folder in your site root directory and go inside it!
```
$ mkdir themes
$ cd themes
```
I used the `hyde-y` as my theme. You can download it by:
```
$ git clone https://github.com/enten/hyde-y
```
Then you'll see a `themes/hyde-y` folder, which contains similar structure like your site folder!

You also can get more themes from [here](http://themes.gohugo.io/).

However, you still not have linked your site and this theme! Back to the root path in your site folder, get the `config.toml` and add this:
```
# Theme to use (located in /themes/THEMENAME/)
theme = "hyde-y"

```

It seems everything finished! Let's try it!

```
$ hugo server -w
```

Then open `http://localhost:1313`, we will see your site!


## Add more function!

### Comment for your article
[Disqus](https://disqus.com/) is default supported by Hugo! Did you see that in `yourSite/themes/hyde-y/layouts/partials/modules/disqus.html`? That is internal html module for show disqus comment below your article! However, you need to register your Disqus account! And set your disqus short name in your `config.toml` file!

```
# Enable Disqus integration
disqusShortname = "yourShortName"
```
How to get your short name? Go your setting in Disqus profile home page and try `add disqus to your site`, then follow the guide!

Wait... Doesn't see the disqus module during using `localhost:1313`?

Go your  `yourSite/themes/hyde-y/layouts/partials/modules/disqus.html` file, comment the following lines:

```
    // if (window.location.hostname == "localhost")
    //   return;
```

Well you got it!

### Push on Github Home Page
1. Create repo for `your-username.github.io`. Note that the repo name should be your username of your github. Only by this way you can make it as your personal home page.

2. Enter your project directory.

`cd workspace/yourProject`

3. Remove your `public` folder under this directory. `rm -rf public`

4. Initilize this directory as github repo `git init`

5. Make `public/` directory sync with .github.io

`git submodule add git@github.com:<username>/<username>.github.io.git public`

6. Create a file 'deploy.sh' under the your project dir and copy the following:
```
#!/bin/bash
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi

# Push Hugo content 
git add -A
git commit -m "$msg"
git push origin master


# Build the project. 
hugo # if using a theme, replace by `hugo -t <yourtheme>`

# Go To Public folder
cd public
# Add changes to git.
git add -A

# Commit changes.

git commit -m "$msg"

# Push source and build repos.
git push origin master

# Come Back
cd ..
```

7. Run the above .sh file
`./deploy.sh`


### Try more? I'll be back soon!









---
title: 'Export Grav to Github Pages'
feature_image_file: feature_image.jpg
blog_post_image_file: tile.jpg
highlight:
    enabled: true
    lines: true
    theme: monokai
taxonomy:
    tag: [web development, grav, github]
date: 25-08-2017
---

Sometimes a static website proves to be a better solution than a full blown CMS. However, using a CMS during development can also be a faster than building a website statically from the ground up. The solution, is to use both: develop the website using a CMS and then convert its pages to static pages. This is what we will do
in this post using grav for development and github pages for hosting.


===

Grav is a powerful file-based CMS allowing one to easily develop websites that are fast in 
a flexible manner. It is written in PHP using some components of the Symfony2 project. 
It requires no installation per say and provides a framework of code that is easy to extend
and adapt to one's needs.

However, CMS solutions like Grav, Joomla, Wordpress, or Drupal need code to be run on a server. 
This makes it necessary to choose a hosting solution supporting a language such as PHP. This kind of solution is usually more expensive 
than static website hosting.

While developing my portfolio website I knew a few things:

- I would use Grav to update its content,
- I would update the content usually from home or a computer having access to the internet and a local PHP environment,
- I did not need any backend logic for things like forms.

I figured that a static hosting of the website would be an appropriate solution.
One of the goodies from Github is Github pages which allow its users to host static websites
for their projects for free. Therefore, I needed a way to export a Grav website to Github pages.

But how could I make a PHP website static ?

## Wget to the rescue
[GNU Wget](https://www.gnu.org/software/wget/) is a software package for retrieving files over the internet. In short, it allows one to download data from some of the most widely-used Internet protocols (HTTP, FTP, HTTPS etc.).
It is installed on most Unix machines making it accessible by the CLI. On Windows, there's a project called [Wget for Windows](http://gnuwin32.sourceforge.net/packages/wget.htm) which brings Wget to Windows.

One of the powerful features of Wget does just what we want: the mirror feature. This feature allows one to download a 
complete local copy of a website with all the necessary assets. (Images, stylesheets, javascript files, etc.)

to do this simply type the following command:

```bash
$ wget -mirror http://www.exmample.com
```

or in our case:

```bash
$ wget -mirror localhost/grav-site
```

The `-mirror` option is the mirror option.

However, there are some problems with solely using the `-mirror` option:

1. Most of the links will still point to the absolute URLs instead of relative ones.
In our case that is not what we want because we'd end up with things like `localhost/grav-site/page-2` which clearly won't work on github pages.
To fix this, we will need another option: `--convert-links`. As the wget documentation explains:  
`--convert-links` make links in downloaded HTML or CSS point to local files.
1. Another problem we face is that the files are downloaded without the right file extensions. the `--adjust-extension` will take care of this problem.
1. Also, the some the resources like the images and stylesheets are not downloaded correctly. The `--page-requisites` will get all resources needed to display the HTML page properly.
1. There might be a problem where wget tries to download everything from localhost. The `--no-parent` option will restrict the download to our grav-site subdirectory.

With all these changes in place we have the following resulting command:

```bash
$ wget --mirror --convert-links --adjust-extension --page-requisites --no-parent localhost/grav-site
```

Or it could be simplified as this (using the short options):

```bash
$ wget -mkEpnp  localhost/grav-site
```


## Post processing
When using the wget command it will create a directory structured in the following manner (in the current directory):

### Directory structure
```
localhost/
    - grav-site.html
    - grav-site/
        - images/
            ...
        - system/
            ...
        - user/
            ...
        - page1.html
        - page2.html
        - page3.html

```
The problem with this is that it is not usable (yet) by github pages. To fix this we will need to do some post processing.
(At this point I am taking for granted that you have created a repo for your static site.)

First, the files should should not be under the localhost directory, instead, they should be at the root of the repo.

This can be done using bash easily this way (given that your current working directory is the root of your repo):

```bash
$ mv localhost/* . && rm -rf localhost
```

Next, we need to rename grav-site.html to index.html:

```bash
$ mv  grav-site.html index.html
```

Now we have a usable directory structure that can be successfully displayed by github pages.

At this point it would be a good idea to add all the files to be tracked by git.

```bash
$ git add -A
```

### Fixing links
Now some links might be broken. Remember, we changed grav-site.html to index.html, therefore, every link that referenced grav-site.html is now broken.

To fix this we will use the following command:

```bash
$ git grep -l 'grav-site.html' | xargs sed -i 's/grav-site.html/index.html/g'
``` 
Let me explain this command.
First, we use `git grep` instead of a simple `grep`. The `git grep` command works exactly like `grep`, but it restricts the command to files being tracked by git, preventing us from greping .git/* files and potentially corrupting our repo.

This will give us a list of all the files containing a broken link to grav-site.html.

Using this list of files (| xargs), we will use the `sed` command to replace *grav-site.html* by *index.html*.

Another thing that is currently broken is the anchor links. Instead of having:
```html
href="#anchorId"
``` 
They are all relative to the page. Meaning that we have something like this instead: 

```html
href="index.html#anchorId"
```

To fix this we will do a simple regex that will take all links containing an anchor and remove the page name.

```bash
$ git grep -l 'href=' | xargs sed -i -r 's/href=".*?html#/href="#/g'
```

Having fixed all these issues we are now ready to push our code to github.

## Pushing to github
Now to push everything to github we simply have to do this:

```bash
git add -A
git commit -m "Updated Website"
git push origin master
```

## Putting it all together
In order for us not to be forced to write all these commands over and over every time we make a change to our grav site locally, we will create a script to automate the process for us.
The script could be named something like `deploy.sh` and should be executed in the local directory of the github pages repo.
To execute the script, do the following 
```bash
$ ./deploy.sh.
``` 
You might need to fix permissions:

```bash
$ chmod +x deploy.sh
```

```bash

# Name of the folder containing our grav installation under localhost
SITE_NAME="grav-site"
SITE_HOST="localhost/$SITE_NAME"
# First we must test that the host (localhost) is reachable
echo "Testing localhost ..."
if  ! wget -q --spider localhost/jwillp ; then
    echo "HOST localhost/jwillp could not be reached, did you forget to start local server ?"
    exit 1
fi

# At this point it could be a good idea to clear the cache of your grav installation
# to make sure you have the latest version of the pages from the site.
# Doing something like this:
# cd ~/webroot/$SITE_NAME
# $ bin/grav clear-cache
# cd $OLDPWD # to go back to the repos directory

echo "Generating static files ..."
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent $SITE_HOST

# CLean old files generated (we will overwrite everything)
rm -rf $SITE_NAME/
rm -f index.html

# Move new files to root
mv localhost/* . && rm -rf localhost

# Rename jwillp.html to index.html
mv $SITE_NAME.html index.html

echo "Static files generated"

echo "Post processing files ..."
# Fix index.html links (add so git grep knows what to work with)
git add -A
git grep -l '$SITE_NAME.html' | xargs sed -i 's/$SITE_NAME.html/index.html/g'

# Fix anchor links
git grep -l 'href=' | xargs sed -i -r 's/href=".*?html#/href="#/g'

echo "Post processing completed"


# Commit changes and push
echo "Deploying to github pages"
git add -A
git commit -m "Update"
git push origin master
echo "Deployment to github pages completed!"

```

In this script you simply have to change the variable $SITE_NAME to be the name of the directory containing your grav installation under localhost.

## Conclusion
Doing the steps above allows us to benefit from grav's code base to build our site, edit our content and from github's free static hosting.

Now, in order to make this process even more automated, we could do the following:
- Create a little grav plugin that would execute the deploy.sh script everytime we make a change in
the grav-admin interface and add a deploy button. 

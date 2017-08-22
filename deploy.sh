


# Generate static files in repository directory
cd ../jwillp.github.io
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent localhost/jwillp
mv localhost/* . && rm -rf localhost

# Rename jwillp.html to index.html
mv jwillp.html index.html

# Fix index.html links (add so git grep works)
git add -A 
git grep -l 'jwillp.html' | xargs sed -i 's/jwillp.html/index.html/g'

# Fix anchor links
git grep -l 'href=' | xargs sed -i -r 's/href=".*?html#/href="#/g'
#git grep -l 'index.html#content-container' | xargs sed -i 's/index.html#content-container/#content-container/g'
#git grep -l 'index.html#top' | xargs sed -i 's/index.html#top/#top/g'




# Commit changes and push
git add -A
git commit -m "Update"
git push origin master



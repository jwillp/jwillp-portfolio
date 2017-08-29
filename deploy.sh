# Must be sourced in order to get aliases from gk_start
# Generate static files in repository directory
hcd
cd ../jwillp.github.io


# Test if host is reachable
echo "Testing host ..."
if  ! wget -q --spider localhost/jwillp ; then
    echo "HOST localhost/jwillp could not be reached, did you forget to start local server ?"
    exit 1
fi


echo "Generating static files ..."
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent localhost/jwillp
echo "Static files generated"


echo "Cleaning old files"
# CLean old files
rm -rf jwillp
rm -f index.html

# Move new files to root
mv localhost/* . && rm -rf localhost

# Rename jwillp.html to index.html
mv jwillp.html index.html


echo "Post processing files ..."
# Fix index.html links (add so git grep works)
git add -A 
git grep -l 'jwillp.html' | xargs sed -i 's/jwillp.html/index.html/g'

# Fix anchor links
git grep -l 'href=' | xargs sed -i -r 's/href=".*?html#/href="#/g'
#git grep -l 'index.html#content-container' | xargs sed -i 's/index.html#content-container/#content-container/g'
#git grep -l 'index.html#top' | xargs sed -i 's/index.html#top/#top/g'
echo "Post processing completed"



# Commit changes and push
echo "Deploying to github pages"
git add -A
git commit -m "Update"
git push origin master


# Get back to project dir
hcd

echo "Deployment to github pages completed!"

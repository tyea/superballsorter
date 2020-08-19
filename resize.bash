DIMENSIONS=$(identify -format "%wx%h" images/master.png)
if [ "${DIMENSIONS}" = "192x192" ]
then
	convert images/master.png -resize 36x36 images/ldpi.png
	convert images/master.png -resize 48x48 images/mdpi.png
	convert images/master.png -resize 72x72 images/hdpi.png
	convert images/master.png -resize 96x96 images/xhdpi.png
	convert images/master.png -resize 144x144 images/xxhdpi.png
	convert images/master.png -resize 192x192 images/xxxhdpi.png
    exit 0
else
    echo "Invalid dimensions"
    exit 1
fi

import time
import MySQLdb
import cv2
import PIL
from PIL import Image
from azure.storage.blob import BlockBlobService

camera_port = 0
camera = cv2.VideoCapture(camera_port)
time.sleep(0.1)  # If you don't wait, the image will be dark
return_value, image = camera.read()
cv2.imwrite("photo.png", image)
del(camera)  # so that others can use the camera as soon as possible
basewidth = 1280
img = Image.open("/home/pi/Downloads/powerbi-python-iot-client-master/photo.jpg")
wpercent = (basewidth / float(img.size[0]))
hsize = int((float(img.size[1]) * float(wpercent)))
img = img.resize((basewidth, hsize), PIL.Image.ANTIALIAS)
img.save("rephoto.jpg")




block_blob_service = BlockBlobService(account_name='sliitrms', account_key='6sYHDz593soVE+c9/HYM3gCDghi1NxnEP3mFktzec38GYCE1a3KjUsoYF/IUwUoYt3r9rI1W+rNaAP5Rdr5jRg==')

block_blob_service.create_container('mycontainer')
from azure.storage.blob import PublicAccess
block_blob_service.create_container('mycontainer', public_access=PublicAccess.Container)
block_blob_service.set_container_acl('mycontainer', public_access=PublicAccess.Container)


block_blob_service.delete_blob('mycontainer', 'myblockblob')


from azure.storage.blob import ContentSettings
block_blob_service.create_blob_from_path(
    'mycontainer',
    'myblockblob',
    'photo.png',
    content_settings=ContentSettings(content_type='image/png')
            )




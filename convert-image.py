from PIL import Image

# Open the image file
image = Image.open("image-3.png")  # Replace "input.jpg" with your image file name

# Resize the image to 640x400
resized_image = image.resize((640, 400))

# Save the resized image
resized_image.save("imageconverted3.png")  # Save the resized image to a new file

# Close the original image
image.close()
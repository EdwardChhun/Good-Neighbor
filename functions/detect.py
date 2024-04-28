import os
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/dr.chhunry/Desktop/Coding /Python Projects/Google Vision/neuralninevisionproject-421608-cdc805941572.json'

"""
Functions that are going to be detecting images
- Image Labels
- Image Logos
- Image Properties (e.g. colors)
- Image w/ Multiple Objects
"""

def detect_labels(path):
    """Detects labels in the file."""
    from google.cloud import vision

    client = vision.ImageAnnotatorClient()

    with open(path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print("Labels:")
        
    for label in labels:
        print(label.description, label.score)

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )

def detect_logos(path):
    """Detects logos in the file."""
    from google.cloud import vision

    client = vision.ImageAnnotatorClient()

    with open(path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.logo_detection(image=image)
    logos = response.logo_annotations
    print("Logos:")

    for logo in logos:
        print(logo.description, logo.scrore)

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )

def detect_properties(path):
    """Detects image properties in the file."""
    from google.cloud import vision

    client = vision.ImageAnnotatorClient()

    with open(path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.image_properties(image=image)
    props = response.image_properties_annotation
    print("Properties:")

    for color in props.dominant_colors.colors:
        print(f"fraction: {color.pixel_fraction}")
        print(f"\tr: {color.color.red}")
        print(f"\tg: {color.color.green}")
        print(f"\tb: {color.color.blue}")
        print(f"\ta: {color.color.alpha}")

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )

def localize_objects(path):
    """Localize objects in the local image.

    Args:
    path: The path to the local file.
    """
    from google.cloud import vision

    client = vision.ImageAnnotatorClient()

    with open(path, "rb") as image_file:
        content = image_file.read()
    image = vision.Image(content=content)

    objects = client.object_localization(image=image).localized_object_annotations

    print(f"Number of objects found: {len(objects)}")
    for object_ in objects:
        print(f"\n{object_.name} (confidence: {object_.score})")
        print("Normalized bounding polygon vertices: ")
        for vertex in object_.bounding_poly.normalized_vertices:
            print(f" - ({vertex.x}, {vertex.y})")


# python/Images-Test/IMG_3169.JPG
print(detect_labels("python/Images-Test/IMG_3174.JPG"))
print(detect_logos("python/Images-Test/IMG_3179.JPG"))
print(detect_logos("python/Images-Test/IMG_3190"))
"""
print(detect_labels("python/Images-Test/IMG_3176.JPG"))
print(detect_labels("python/Images-Test/IMG_3180.JPG"))
print(detect_labels("python/Images-Test/IMG_3186.JPG"))
"""

"""
print(detect_labels("python/images/1.jpg"))
print(detect_logos('python/images/1.jpg'))
print(detect_properties('python/images/1.jpg'))
print(localize_objects("python/images/1.jpg"))
"""

"""
print("===================")
print(detect_labels("2.jpg"))
print("===================")
print(detect_labels("3.jpg"))
"""
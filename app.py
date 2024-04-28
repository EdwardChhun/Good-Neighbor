# app.py
"""
Need to streamline with MongoDB
"""
from flask import Flask, request, jsonify
from .functions.detect import detect_labels, detect_logos, detect_properties, localize_objects

app = Flask(__name__)

@app.route('/api/image-recognition', methods=['POST'])
def image_recognition():
    # Receive image data from the request
    image_file = request.files['image']

    # Process the image using the detect_labels function
    labels = detect_labels(image_file)
    logos = detect_logos(image_file)
    properties = detect_properties(image_file)
    
    """
    Might not need this yet
    objects = detect_objects(image_file)
    """

    # Return the result as JSON
    return jsonify({'labels': labels,
                    'logos': logos,
                    'properties': properties
                    })

if __name__ == '__main__':
    app.run(debug=True)

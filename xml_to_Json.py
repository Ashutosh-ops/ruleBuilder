import xml.etree.ElementTree as ET
import json

def xml_to_json(element):
    # Helper function to convert an XML element and its children to a dictionary
    json_obj = {}

    # Add element attributes to the JSON object with "@" prefix
    for key, value in element.attrib.items():
        json_obj[f"{key}"] = value

    # Process child elements
    children = list(element)
    if children:
        # If the element has children, process each child element
        for child in children:
            child_name = child.tag
            child_value = xml_to_json(child)

            # Handle multiple children with the same tag by converting to list
            if child_name in json_obj:
                if not isinstance(json_obj[child_name], list):
                    json_obj[child_name] = [json_obj[child_name]]
                json_obj[child_name].append(child_value)
            else:
                json_obj[child_name] = child_value
    else:
        # If no children, add the element's text content if available
        text = element.text.strip() if element.text else ""
        if text:
            json_obj["#text"] = text

    return json_obj

# Load XML and parse it into JSON
file = open('MasterBaseRules.xml', encoding="utf8")
data = file.read()

# print(data)

xml_string = '''<clauses clpercentage="">
  <!-- XML structure here -->
</clauses>'''  # Replace this with the actual XML string
root = ET.fromstring(data)
json_result = xml_to_json(root)

# Convert to JSON string with indentation
json_output = json.dumps(json_result, indent=2)
print(json_output)

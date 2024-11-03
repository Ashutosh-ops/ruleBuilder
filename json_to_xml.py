import xml.etree.ElementTree as ET
import json
from xml.dom import minidom

def create_xml_element(parent, data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, list):
                # If the value is a list, create an element for each item
                for item in value:
                    child = ET.SubElement(parent, key)
                    create_xml_element(child, item)
            elif isinstance(value, dict):
                # If the value is a dictionary, create an element and recurse
                child = ET.SubElement(parent, key)
                create_xml_element(child, value)
            else:
                # If the value is a string, treat it as an attribute if key starts with "@"
                if key.startswith("@"):
                    parent.set(key[1:], value)  # Remove the "@" and set as attribute
                else:
                    # Treat it as a text node or nested element
                    child = ET.SubElement(parent, key)
                    child.text = str(value)
    elif isinstance(data, list):
        for item in data:
            create_xml_element(parent, item)
    else:
        parent.text = str(data)

def json_to_xml(json_data):
    # Initialize the root element with attributes
    root = ET.Element("clauses", clpercentage=json_data.get("clpercentage", ""))

    # Convert each clause in the JSON
    for clause in json_data.get("clause", []):
        clause_element = ET.SubElement(root, "clause")
        for key, value in clause.items():
            if isinstance(value, dict) or isinstance(value, list):
                # Create nested elements for complex types
                child = ET.SubElement(clause_element, key)
                create_xml_element(child, value)
            else:
                # Add attributes for other fields
                clause_element.set(key, value)

    return root

def prettify_xml(element):
    # Convert XML element tree to a pretty XML string
    rough_string = ET.tostring(element, 'utf-8')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="  ")

# Sample JSON data (replace this with actual JSON data)
file = open('result.json')
json_data = json.loads(file.read())

# Convert JSON to XML
xml_element = json_to_xml(json_data)
pretty_xml = prettify_xml(xml_element)

# Add the required XML prolog and DOCTYPE
xml_output = '<?xml version="1.0" encoding="UTF-8"?>\n'
xml_output += '<!DOCTYPE html [\n<!ENTITY nbsp "&#160;">\n]>\n'
xml_output += '<!-- MasterBaseRules.xml -->\n'
xml_output += pretty_xml

print(xml_output)

const jsdom = require("jsdom")
const { JSDOM } = jsdom


function xmlToJson(xml) {
  // Helper function to parse an XML node
  function parseNode(node) {
    // If node has no child elements and no attributes, return its text content
    if (node.nodeType === 3) return node.nodeValue.trim(); // Text node

    const jsonObject = {};
    // Parse attributes
    if (node.attributes) {
      Array.from(node.attributes).forEach(attr => {
        jsonObject[`@${attr.name}`] = attr.value;
      });
    }

    // Parse children
    Array.from(node.childNodes).forEach(childNode => {
      const childName = childNode.nodeName;
      const childValue = parseNode(childNode);

      if (childValue) {
        if (jsonObject[childName]) {
          // If property already exists, convert to array (handles multiple children with the same tag)
          if (!Array.isArray(jsonObject[childName])) {
            jsonObject[childName] = [jsonObject[childName]];
          }
          jsonObject[childName].push(childValue);
        } else {
          jsonObject[childName] = childValue;
        }
      }
    });

    return jsonObject;
  }

  return parseNode(xml.documentElement);
}

// Example usage:

// const parser = new DOMParser();
const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<clauses clpercentage="">
  <!-- XML structure here -->
</clauses>`;
const xmlDoc = new JSDOM().window.DOMParser.parseFromString(xmlString, "application/xml");
const jsonResult = xmlToJson(xmlDoc);

console.log(JSON.stringify(jsonResult, null, 2));

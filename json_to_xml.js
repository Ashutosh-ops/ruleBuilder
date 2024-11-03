function jsonToXML(json) {
    // Create an XML document
    const doc = document.implementation.createDocument("", "", null);

    // Add XML declaration
    const xmlDecl = doc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
    doc.appendChild(xmlDecl);

    // Add DOCTYPE
    const doctype = document.implementation.createDocumentType('clauses', '', '[<!ENTITY nbsp "&#160;">]');
    doc.appendChild(doctype);

    // Add comment
    const comment = doc.createComment(" MasterBaseRules.xml ");
    doc.appendChild(comment);

    // Create root element <clauses>
    const clauses = doc.createElement("clauses");
    clauses.setAttribute("clpercentage", json.clpercentage);
    doc.appendChild(clauses);

    // Iterate through each clause in the JSON
    json.clause.forEach(clauseData => {
        const clause = doc.createElement("clause");
        clause.setAttribute("id", clauseData.id);
        clause.setAttribute("name", clauseData.name);
        clause.setAttribute("allowed", clauseData.allowed);
        clause.setAttribute("type", clauseData.type);
        clause.setAttribute("execution", clauseData.execution);
        clauses.appendChild(clause);

        // Iterate through coverage
        clauseData.coverage.forEach(coverageData => {
            const coverage = doc.createElement("coverage");
            coverage.setAttribute("id", coverageData.id);
            coverage.setAttribute("name", coverageData.name);
            coverage.setAttribute("allowed", coverageData.allowed);
            coverage.setAttribute("module", coverageData.module);
            coverage.setAttribute("clpercentage", coverageData.clpercentage);
            coverage.setAttribute("selected", coverageData.selected);
            coverage.setAttribute("autoselect", coverageData.autoselect);
            clause.appendChild(coverage);

            // Create <display> element for coverage
            const coverageDisplay = doc.createElement("display");
            coverageDisplay.setAttribute("id", coverageData.display.id);
            coverageDisplay.setAttribute("target", coverageData.display.target);
            coverageDisplay.setAttribute("prelabel", coverageData.display.prelabel);
            coverageDisplay.setAttribute("control", coverageData.display.control);
            coverageDisplay.setAttribute("type", coverageData.display.type);
            coverageDisplay.setAttribute("default", coverageData.display.default);
            coverageDisplay.setAttribute("optText", coverageData.display.optText);
            coverageDisplay.setAttribute("altText", coverageData.display.altText);
            coverageDisplay.setAttribute("optVal", coverageData.display.optVal);
            coverageDisplay.setAttribute("postlabel", coverageData.display.postlabel);
            coverageDisplay.setAttribute("jscall", coverageData.display.jscall);
            coverage.appendChild(coverageDisplay);

            // Iterate through conditions
            coverageData.condition.forEach(conditionData => {
                const condition = doc.createElement("condition");
                condition.setAttribute("id", conditionData.id);
                condition.setAttribute("field", conditionData.field);
                condition.setAttribute("value", conditionData.value);
                condition.setAttribute("dynValue", conditionData.dynValue);
                condition.setAttribute("cclfactor", conditionData.cclfactor);
                condition.setAttribute("mandatory", conditionData.mandatory);
                condition.setAttribute("method", conditionData.method);
                condition.setAttribute("source", conditionData.source);
                condition.setAttribute("module", conditionData.module);
                condition.setAttribute("fieldData", conditionData.fieldData);
                condition.setAttribute("unit", conditionData.unit);
                condition.setAttribute("result", conditionData.result);
                condition.setAttribute("configure", conditionData.configure);
                coverage.appendChild(condition);

                // Handle the display array
                conditionData.display.forEach(displayData => {
                    const display = doc.createElement("display");
                    display.setAttribute("id", displayData.id);
                    display.setAttribute("target", displayData.target);
                    display.setAttribute("prelabel", displayData.prelabel);
                    display.setAttribute("control", displayData.control);
                    display.setAttribute("type", displayData.type);
                    display.setAttribute("disabled", displayData.disabled);
                    display.setAttribute("default", displayData.default);
                    display.setAttribute("optText", displayData.optText);
                    display.setAttribute("altText", displayData.altText);
                    display.setAttribute("optVal", displayData.optVal);
                    display.setAttribute("postlabel", displayData.postlabel);
                    display.setAttribute("jscall", displayData.jscall);
                    display.setAttribute("lookup", displayData.lookup);
                    condition.appendChild(display);
                });
            });

            // Create <action> element
            const action = doc.createElement("action");
            action.setAttribute("id", coverageData.action.id);
            action.setAttribute("name", coverageData.action.name);
            coverage.appendChild(action);
        });
    });

    // Serialize the document to a string
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(doc);
    // console.log(xmlString);
    return xmlString;
}

// Example JSON
const jsonData = {
    "clpercentage": "",
    "clause": [
        {
            "id": "cls.15",
            "name": "Chronic Condition & Pre-Exising Condition",
            "allowed": "NO",
            "type": "rule",
            "execution": "PRE,CLA",
            "coverage": [
                {
                    "id": "cvg.15.3",
                    "name": "Rule Applicable for Chronic Condition",
                    "allowed": "~",
                    "module": "P",
                    "clpercentage": "",
                    "selected": "YES",
                    "autoselect": "",
                    "display": {
                        "id": "dsp.15.3.1",
                        "target": "allowed,1",
                        "prelabel": "",
                        "control": "radiogroup",
                        "type": "single",
                        "default": "2",
                        "optText": "Pay,Don't Pay,Pay Conditionally",
                        "altText": "Pay,Don't Pay,Pay Conditionally",
                        "optVal": "1,2,3",
                        "postlabel": "",
                        "jscall": "onclick=showHideCondition(this)"
                    },
                    "condition": [
                        {
                            "id": "cnd.15.3.6",
                            "field": "assistance.cover1",
                            "value": "",
                            "dynValue": "check_acute_chronic_limit('ICD001','~','~','~','~')",
                            "cclfactor": "10",
                            "mandatory": "NO",
                            "method": "get_request_country()",
                            "source": "PACKAGE",
                            "module": "P",
                            "fieldData": "",
                            "unit": "",
                            "result": "",
                            "configure": "NO",
                            "display": [
                                {
                                    "id": "dsp.15.3.6.1",
                                    "target": "dynValue,2",
                                    "prelabel": "Acute Phase Treatment for Chronic Condition",
                                    "control": "select",
                                    "type": "text",
                                    "disabled": "",
                                    "default": "Y",
                                    "optText": "Covered,Not Covered",
                                    "altText": "Covered,Not Covered",
                                    "optVal": "Y,N",
                                    "postlabel": "",
                                    "jscall": "",
                                    "lookup": ""
                                },
                                {
                                    "id": "dsp.15.3.6.2",
                                    "target": "dynValue,3",
                                    "prelabel": "Limit",
                                    "control": "select",
                                    "type": "single",
                                    "default": "GE",
                                    "optText": ">=",
                                    "altText": ">=",
                                    "optVal": "GE",
                                    "postlabel": "",
                                    "jscall": ""
                                }
                            ]
                        },
                        {
                            "id": "cnd.15.3.0",
                            "field": "",
                            "op": "",
                            "opType": "",
                            "value": "",
                            "cclfactor": "10",
                            "mandatory": "NO",
                            "method": "",
                            "dynValue": "get_chronic_mem_waiting_prd('ICD001','~','~','~')",
                            "source": "PACKAGE",
                            "module": "P",
                            "fieldData": "",
                            "unit": "",
                            "result": "",
                            "display": [
                                {
                                    "id": "dsp.15.3.0.1",
                                    "target": "dynValue,2",
                                    "prelabel": "Waiting Period",
                                    "control": "select",
                                    "type": "single",
                                    "default": "GE",
                                    "optText": ">=",
                                    "altText": ">=",
                                    "optVal": "GE",
                                    "postlabel": "",
                                    "jscall": ""
                                },
                                {
                                    "id": "dsp.15.3.0.2",
                                    "target": "dynValue,3",
                                    "prelabel": "",
                                    "control": "input",
                                    "type": "text",
                                    "default": "",
                                    "optText": "",
                                    "altText": "",
                                    "optVal": "",
                                    "disabled": "",
                                    "postlabel": "",
                                    "jscall": "onkeyup=isNumeric(this)"
                                }
                            ]
                        }
                    ],
                    "action": {
                        "id": "act.15.3.1",
                        "name": "Chronic"
                    }
                }
            ]
        }
    ]
};

// Call the function with the JSON data
jsonToXML(jsonData);


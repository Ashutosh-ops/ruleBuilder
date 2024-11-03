function jsonToXML(json) {
    // Start with XML declaration
    let xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xmlString += `<!DOCTYPE clauses [\n`;
    xmlString += `<!ENTITY nbsp "&#160;">\n`;
    xmlString += `]>\n`;
    xmlString += `<!-- MasterBaseRules.xml -->\n`;
    xmlString += `<clauses clpercentage="${json.clpercentage}">\n`;

    // Iterate through each clause in the JSON
    json.clause.forEach(clauseData => {
        xmlString += `  <clause id="${clauseData.id}" name="${clauseData.name}" allowed="${clauseData.allowed}" type="${clauseData.type}" execution="${clauseData.execution}">\n`;

        // Iterate through coverage
        clauseData.coverage.forEach(coverageData => {
            xmlString += `    <coverage id="${coverageData.id}" name="${coverageData.name}" allowed="${coverageData.allowed}" module="${coverageData.module}" clpercentage="${coverageData.clpercentage}" selected="${coverageData.selected}" autoselect="${coverageData.autoselect}">\n`;

            // Create <display> element for coverage
            xmlString += `      <display id="${coverageData.display.id}" target="${coverageData.display.target}" prelabel="${coverageData.display.prelabel}" control="${coverageData.display.control}" type="${coverageData.display.type}" default="${coverageData.display.default}" optText="${coverageData.display.optText}" altText="${coverageData.display.altText}" optVal="${coverageData.display.optVal}" postlabel="${coverageData.display.postlabel}" jscall="${coverageData.display.jscall}"/>\n`;

            // Iterate through conditions
            coverageData.condition.forEach(conditionData => {
                xmlString += `      <condition id="${conditionData.id}" field="${conditionData.field}" value="${conditionData.value}" dynValue="${conditionData.dynValue}" cclfactor="${conditionData.cclfactor}" mandatory="${conditionData.mandatory}" method="${conditionData.method}" source="${conditionData.source}" module="${conditionData.module}" fieldData="${conditionData.fieldData}" unit="${conditionData.unit}" result="${conditionData.result}" configure="${conditionData.configure}">\n`;

                // Handle the display array
                conditionData.display.forEach(displayData => {
                    xmlString += `        <display id="${displayData.id}" target="${displayData.target}" prelabel="${displayData.prelabel}" control="${displayData.control}" type="${displayData.type}" disabled="${displayData.disabled}" default="${displayData.default}" optText="${displayData.optText}" altText="${displayData.altText}" optVal="${displayData.optVal}" postlabel="${displayData.postlabel}" jscall="${displayData.jscall}" lookup="${displayData.lookup}"/>\n`;
                });

                xmlString += `      </condition>\n`;
            });

            // Create <action> element
            xmlString += `      <action id="${coverageData.action.id}" name="${coverageData.action.name}"/>\n`;
            xmlString += `    </coverage>\n`;
        });

        xmlString += `  </clause>\n`;
    });

    xmlString += `</clauses>`;

    // Log the resulting XML string
    console.log(xmlString);
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

// Call the function with example data
jsonToXML(jsonData);

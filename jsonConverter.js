function convertJson(json1) {
  return {
    clauses: {
      clause: json1.map(clause => ({
        _id: clause.u_id__c,
        _name: clause.name__c,
        _allowed: clause.coverages__r ? "YES" : "NO",
        _type: "rule",
        _execution: "PRE,CLA",
        coverage: clause.coverages__r ? clause.coverages__r.records.map(coverage => ({
          _id: coverage.u_id__c,
          _name: coverage.name__c,
          _allowed: "~",
          _module: "P",
          _clpercentage: "",
          _selected: "",
          _autoselect: "",
          action: {
            _id: `act.${coverage.u_id__c}`,
            _name: "ruleengineaction"
          },
          condition: coverage.conditions__r ? coverage.conditions__r.records.map(condition => ({
            _id: condition.u_id__c,
            _field: condition.field__c,
            _value: "",
            _dynValue: `PALL_HOSP_CARE_BENE_LIMIT('NOTGIVEN','~','~','~','~','~','~','~','~','~','~','~','~')`,
            _clfactor: "10",
            _mandatory: "NO",
            _method: "get_request_country()",
            _source: "PACKAGE",
            _module: "P",
            _fieldData: "",
            _unit: "",
            _result: "",
            _configure: "NO",
            display: condition.displays__r ? condition.displays__r.records.map(display => ({
              _id: display.u_id__c,
              _target: display.target__c,
              _prelabel: display.prelabel__c,
              _control: display.control__c,
              _type: display.type__c,
              _default: display.default__c,
              _optText: display.optText__c || "",
              _altText: display.altText__c || "",
              _optVal: display.optVal__c || "",
              _postlabel: display.postlabel__c,
              _jscall: display.jscall__c || "",
              _lookup: display.lookup__c || ""
            })) : []
          })) : []
        })) : []
      })),
      _clpercentage: ""
    }
  };
}

// Example usage
const json2 = convertJson(json1);
console.log(JSON.stringify(json2, null, 2));

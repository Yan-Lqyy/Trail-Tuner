// static/js/script.js

const ghAttributes = {
    road_class: {
        label: "Road Class", type: "enum", operators: ["==", "!="],
        values: ["MOTORWAY", "TRUNK", "PRIMARY", "SECONDARY", "TERTIARY", "UNCLASSIFIED", "RESIDENTIAL", "LIVING_STREET", "SERVICE", "TRACK", "CYCLEWAY", "FOOTWAY", "PATH", "STEPS", "OTHER"], // Removed FERRY
        quoteValue: false
    },
    road_environment: {
        label: "Road Environment", type: "enum", operators: ["==", "!="],
        values: ["ROAD", "BRIDGE", "TUNNEL", "FORD", "FERRY", "OTHER"], // Removed MISSING, STREET
        quoteValue: false
    },
    road_access: {
        label: "Road Access", type: "enum", operators: ["==", "!="],
        values: ["YES", "NO", "DESTINATION", "DELIVERY", "PRIVATE", "CUSTOMERS", "FORESTRY", "AGRICULTURAL"], // Removed PERMISSIVE, UNKNOWN, MISSING
        quoteValue: false
    },
    surface: {
        label: "Surface", type: "enum", operators: ["==", "!="],
        values: ["PAVED", "ASPHALT", "CONCRETE", "PAVING_STONES", "METAL", "WOOD", "COBBLESTONE", "UNPAVED", "COMPACTED", "GRAVEL", "FINE_GRAVEL", "DIRT", "EARTH", "GROUND", "SAND", "GRASS"], // Removed CONCRETE_LANES, METAL, EARTH, GRASS_PAVER, MUD, ICE, SNOW, SALT, UNKNOWN, MISSING (assuming others like MUD, ICE etc from previous list were also invalid if not mentioned now)
        quoteValue: false
    },
    smoothness: {
        label: "Smoothness", type: "enum", operators: ["==", "!="],
        values: ["EXCELLENT", "GOOD", "INTERMEDIATE", "BAD", "VERY_BAD", "HORRIBLE", "VERY_HORRIBLE", "IMPASSABLE", "MISSING"], // Removed UNKNOWN
        quoteValue: false
    },
    toll: {
        label: "Toll", type: "enum", operators: ["==", "!="],
        values: ["ALL", "HGV", "NO", "MISSING"],
        quoteValue: false
    },
    bike_network: {
        label: "Bike Network", type: "enum", operators: ["==", "!="],
        values: ["INTERNATIONAL", "NATIONAL", "REGIONAL", "LOCAL", "OTHER", "MISSING"], // Removed MOUNTAIN
        quoteValue: false
    },
    foot_network: {
        label: "Foot Network", type: "enum", operators: ["==", "!="],
        values: ["INTERNATIONAL", "NATIONAL", "REGIONAL", "LOCAL", "OTHER", "MISSING"],
        quoteValue: false
    },
    country: { // Confirmed quoteValue TRUE
        label: "Country (ISO3 Alpha)", type: "text", operators: ["==", "!="],
        quoteValue: true,
        placeholder: "e.g., DEU, FRA"
    },
    track_type: {
        label: "Track Type", type: "enum", operators: ["==", "!="],
        values: ["GRADE1", "GRADE2", "GRADE3", "GRADE4", "GRADE5", "MISSING"],
        quoteValue: false
    },
    // urban_density REMOVED
    // bicycle REMOVED
    hazmat: {
        label: "Hazmat", type: "enum", operators: ["==", "!="],
        values: ["YES"], // Removed NO, UNKNOWN, MISSING
        quoteValue: false
    },
    hazmat_tunnel: {
        label: "Hazmat Tunnel Category", type: "enum", operators: ["==", "!="],
        values: ["A", "B", "C", "D", "E"], // Removed MISSING, UNKNOWN
        quoteValue: false
    },
    hazmat_water: {
        label: "Hazmat Water Restriction", type: "enum", operators: ["==", "!="],
        values: ["YES", "PERMISSIVE", "NO"], // Removed MISSING, UNKNOWN
        quoteValue: false
    },
    hgv: {
        label: "HGV Restriction", type: "enum", operators: ["==", "!="],
        values: ["MISSING", "YES", "NO", "DESIGNATED", "DELIVERY", "DESTINATION"], // Removed EXCEPT_FOR_ACCESS, PRIVATE, UNKNOWN, DESIGNATED_LOCAL
        quoteValue: false
    },

    // Numeric Attributes (quoteValue: false)
    average_slope: { label: "Average Slope (%)", type: "numeric", operators: ["==", "!=", ">", "<", ">=", "<="], quoteValue: false, placeholder: "e.g., 5 or -3" },
    max_slope: { label: "Max Slope (%)", type: "numeric", operators: ["==", "!=", ">", "<", ">=", "<="], quoteValue: false, placeholder: "e.g., 10" },
    curvature: { label: "Curvature (0-1, lower is curvier)", type: "numeric", operators: ["==", "!=", ">", "<", ">=", "<="], quoteValue: false, placeholder: "e.g., 0.8", step: "0.01" },
    hike_rating: { label: "Hike Rating (SAC Scale 0-6)", type: "numeric", operators: ["==", "!=", ">", "<", ">=", "<="], quoteValue: false, placeholder: "0-6" },
    mtb_rating: { label: "MTB Rating (OSM Scale 0-6)", type: "numeric", operators: ["==", "!=", ">", "<", ">=", "<="], quoteValue: false, placeholder: "0-6" },
    lanes: { label: "Number of Lanes", type: "numeric", operators: ["==", "!=", ">", "<", ">=", "<="], quoteValue: false, placeholder: "e.g., 2" },
    max_speed: { label: "Max Speed (Road Sign km/h)", type: "numeric", operators: ["==", "!=", ">", "<", ">=", "<="], quoteValue: false, placeholder: "e.g., 50" },
    max_height: { label: "Max Height (m)", type: "numeric", operators: ["<", "<=", ">", ">=", "==", "!="], quoteValue: false, placeholder: "e.g., 3.5", step: "0.1" },
    max_width:  { label: "Max Width (m)",  type: "numeric", operators: ["<", "<=", ">", ">=", "==", "!="], quoteValue: false, placeholder: "e.g., 2.5", step: "0.1" },
    max_length: { label: "Max Length (m)", type: "numeric", operators: ["<", "<=", ">", ">=", "==", "!="], quoteValue: false, placeholder: "e.g., 10", step: "0.1"  },
    max_weight: { label: "Max Weight (ton)", type: "numeric", operators: ["<", "<=", ">", ">=", "==", "!="], quoteValue: false, placeholder: "e.g., 7.5", step: "0.1" },
    // max_axle_load REMOVED

    // True Boolean Attributes (quoteValue: false)
    road_class_link: { label: "Road Class Link", type: "boolean", operators: ["is"], quoteValue: false },
    roundabout: { label: "Roundabout", type: "boolean", operators: ["is"], quoteValue: false },

    // Special 'areas' condition (quoteValue: false for area ID)
    custom_area: { label: "In Custom Area", type: "area", operators: ["matches"], quoteValue: false, placeholder: "Area ID (e.g., my_zone)" }
};


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    initializeExistingRuleItems();

    document.body.addEventListener('change', function(event) {
        const target = event.target;
        if (target.classList.contains('condition-type-select')) {
            handleConditionTypeChange(target);
        } else if (target.classList.contains('condition-attribute-select')) {
            handleAttributeChange(target);
        } else if (
            target.classList.contains('condition-operator-select') ||
            target.classList.contains('condition-value-input') ||
            target.classList.contains('condition-block-connector')
        ) {
            const ruleItem = target.closest('.rule-item');
            if (ruleItem) updateGeneratedConditionStatement(ruleItem);
        }
    });

    document.body.addEventListener('input', function(event) {
        const target = event.target;
        if (target.classList.contains('condition-value-input') && target.closest('.sub-condition-item')) {
            const ruleItem = target.closest('.rule-item');
            if (ruleItem) updateGeneratedConditionStatement(ruleItem);
        }
    });

    document.body.addEventListener('click', function(event) {
        const target = event.target;
        const closestAddBtn = target.closest('.add-sub-condition-btn');
        const closestRemoveSubBtn = target.closest('.remove-sub-condition-btn');
        const closestRemoveRuleBtn = target.closest('.remove-rule-btn');
        const generateTestBtn = target.closest('#generateTestModelBtn');

        if (closestAddBtn) {
            addSubCondition(closestAddBtn);
        } else if (closestRemoveSubBtn) {
            removeSubCondition(closestRemoveSubBtn);
        } else if (closestRemoveRuleBtn) {
            removeRule(closestRemoveRuleBtn);
        } else if (generateTestBtn) {
            generateTestModel();
        }
    });
});

function initializeExistingRuleItems() {
    document.querySelectorAll('.rule-item').forEach(ruleItem => {
        const conditionTypeSelect = ruleItem.querySelector('.condition-type-select');
        handleConditionTypeChange(conditionTypeSelect); 

        if (conditionTypeSelect.value !== 'else') {
            const subConditionsContainer = ruleItem.querySelector('.sub-conditions-container');
            if (subConditionsContainer.children.length === 0) {
                 addSubCondition(ruleItem.querySelector('.add-sub-condition-btn'), false);
            } else {
                subConditionsContainer.querySelectorAll('.sub-condition-item').forEach(sci => {
                    const attrSelect = sci.querySelector('.condition-attribute-select');
                    populateAttributeSelect(attrSelect); 
                    
                    if (attrSelect.value) {
                         handleAttributeChange(attrSelect, false); 
                         const opSelect = sci.querySelector('.condition-operator-select');
                         if(opSelect) opSelect.dispatchEvent(new Event('change', { bubbles: true }));
                         const valInput = sci.querySelector('.condition-value-input');
                         if(valInput) {
                              const eventType = (valInput.tagName === 'SELECT' || valInput.type === 'checkbox' || valInput.type === 'radio') ? 'change' : 'input';
                              valInput.dispatchEvent(new Event(eventType, { bubbles: true }));
                         }
                    }
                });
            }
        }
        updateGeneratedConditionStatement(ruleItem);
    });
}

function addRule(type) {
    const container = document.getElementById(`${type}-rules-container`);
    const templateElement = document.getElementById(`${type}-rule-template`);
    const newRuleEl = templateElement.cloneNode(true);
    newRuleEl.removeAttribute('id');
    newRuleEl.style.display = '';
    const ruleItemDiv = newRuleEl.querySelector('.rule-item');

    const conditionTypeSelect = ruleItemDiv.querySelector('.condition-type-select');
    if (conditionTypeSelect.value !== 'else') {
        addSubCondition(ruleItemDiv.querySelector('.add-sub-condition-btn'), false);
    }
    
    container.appendChild(ruleItemDiv);
    handleConditionTypeChange(conditionTypeSelect);
    updateGeneratedConditionStatement(ruleItemDiv);
}

function addSubCondition(addButton, doUpdateStatement = true) {
    const ruleItem = addButton.closest('.rule-item');
    const subConditionsContainer = ruleItem.querySelector('.sub-conditions-container');
    const subTemplate = document.getElementById('sub-condition-template');
    
    // Assuming sub-condition-template is a <template> tag
    const newSubConditionItem = subTemplate.content.firstElementChild.cloneNode(true);

    populateAttributeSelect(newSubConditionItem.querySelector('.condition-attribute-select'));
    
    subConditionsContainer.appendChild(newSubConditionItem);
    if (doUpdateStatement) {
        updateGeneratedConditionStatement(ruleItem);
    }
}

function removeSubCondition(removeButton) {
    const subConditionItem = removeButton.closest('.sub-condition-item');
    const ruleItem = subConditionItem.closest('.rule-item');
    subConditionItem.remove();
    updateGeneratedConditionStatement(ruleItem);
}

function populateAttributeSelect(selectElement) {
    if (!selectElement) return;
    const currentValue = selectElement.value;
    let firstOption = selectElement.options[0] && selectElement.options[0].value === "" ? selectElement.options[0] : null;
    selectElement.innerHTML = '';
    if (firstOption) selectElement.appendChild(firstOption);
    else {
        const placeholder = document.createElement('option');
        placeholder.value = "";
        placeholder.textContent = "-- Attribute --";
        placeholder.disabled = true;
        placeholder.selected = true;
        selectElement.appendChild(placeholder);
    }

    for (const attrKey in ghAttributes) {
        const option = document.createElement('option');
        option.value = attrKey;
        option.textContent = ghAttributes[attrKey].label;
        selectElement.appendChild(option);
    }
    if (currentValue) {
       if (Array.from(selectElement.options).some(opt => opt.value === currentValue)) {
            selectElement.value = currentValue;
       } else {
            selectElement.selectedIndex = 0;
       }
    } else {
        selectElement.selectedIndex = 0;
    }
}

function handleConditionTypeChange(conditionTypeSelect) {
    const ruleItem = conditionTypeSelect.closest('.rule-item');
    const isElse = conditionTypeSelect.value === 'else';
    
    const subConditionsContainer = ruleItem.querySelector('.sub-conditions-container');
    const addSubConditionBtn = ruleItem.querySelector('.add-sub-condition-btn');
    const blockConnector = ruleItem.querySelector('.condition-block-connector');

    [subConditionsContainer, addSubConditionBtn, blockConnector].forEach(el => {
        if (el) el.style.display = isElse ? 'none' : '';
    });

    if (!isElse && subConditionsContainer.children.length === 0) {
        addSubCondition(addSubConditionBtn, false);
    }
    updateGeneratedConditionStatement(ruleItem);
}

function handleAttributeChange(attributeSelect, clearOperatorAndValue = true) {
    const subConditionItem = attributeSelect.closest('.sub-condition-item');
    if (!subConditionItem) return;

    const operatorContainer = subConditionItem.querySelector('.condition-operator-container');
    const valueContainer = subConditionItem.querySelector('.condition-value-container');
    const selectedAttributeKey = attributeSelect.value;

    const existingOp = clearOperatorAndValue ? '' : operatorContainer.querySelector('select')?.value;
    const existingVal = clearOperatorAndValue ? '' : valueContainer.querySelector('input, select')?.value;

    clearContainer(operatorContainer);
    clearContainer(valueContainer);

    if (selectedAttributeKey && ghAttributes[selectedAttributeKey]) {
        const attrConfig = ghAttributes[selectedAttributeKey];
        const operatorSelect = document.createElement('select');
        operatorSelect.className = 'form-select form-select-sm condition-operator-select';
        attrConfig.operators.forEach(op => {
            const option = document.createElement('option'); option.value = op; option.textContent = op; operatorSelect.appendChild(option);
        });
        if (existingOp && Array.from(operatorSelect.options).some(opt => opt.value === existingOp)) {
             operatorSelect.value = existingOp;
        }
        operatorContainer.appendChild(operatorSelect);
        populateValueInput(valueContainer, attrConfig, existingVal);
    }
    updateGeneratedConditionStatement(subConditionItem.closest('.rule-item'));
}

function populateValueInput(valueContainer, attrConfig, existingValue = null) {
    clearContainer(valueContainer);
    let valueInput;

    if (attrConfig.type === 'enum') {
        valueInput = document.createElement('select');
        valueInput.className = 'form-select form-select-sm condition-value-input';
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "-- Select Value --";
        valueInput.appendChild(defaultOption);
        attrConfig.values.forEach(val => {
            const option = document.createElement('option'); option.value = val; option.textContent = val; valueInput.appendChild(option);
        });
    } else if (attrConfig.type === 'numeric') {
        valueInput = document.createElement('input');
        valueInput.type = 'number';
        valueInput.className = 'form-control form-control-sm condition-value-input';
        valueInput.placeholder = attrConfig.placeholder || 'Value';
        valueInput.step = attrConfig.step || "any";
    } else if (attrConfig.type === 'boolean') {
        valueInput = document.createElement('select');
        valueInput.className = 'form-select form-select-sm condition-value-input';
         const defaultOption = document.createElement('option'); defaultOption.value = ""; defaultOption.textContent = "-- Select State --"; valueInput.appendChild(defaultOption);
        ['true', 'false'].forEach(val => {
            const option = document.createElement('option'); option.value = val;
            option.textContent = val.charAt(0).toUpperCase() + val.slice(1); valueInput.appendChild(option);
        });
    } else if (attrConfig.type === 'area') {
        valueInput = document.createElement('input'); valueInput.type = 'text';
        valueInput.className = 'form-control form-control-sm condition-value-input';
        valueInput.placeholder = attrConfig.placeholder || 'Area ID';
    } else { // default 'text'
        valueInput = document.createElement('input'); valueInput.type = 'text';
        valueInput.className = 'form-control form-control-sm condition-value-input';
        valueInput.placeholder = attrConfig.placeholder || 'Value';
    }
    
    if (existingValue !== null && existingValue !== "" && valueInput) {
        if (valueInput.tagName === 'SELECT') {
            if (Array.from(valueInput.options).some(opt => opt.value === existingValue)) {
                valueInput.value = existingValue;
            } else {
                 valueInput.selectedIndex = 0;
            }
        } else {
            valueInput.value = existingValue;
        }
    } else if (valueInput && valueInput.tagName === 'SELECT') {
         valueInput.selectedIndex = 0;
    }
    valueContainer.appendChild(valueInput);
}

function updateGeneratedConditionStatement(ruleItem) {
    const conditionType = ruleItem.querySelector('.condition-type-select').value;
    const hiddenStatementField = ruleItem.querySelector('.generated-condition-statement');
    const blockConnectorElement = ruleItem.querySelector('.condition-block-connector');

    if (conditionType === 'else') {
        hiddenStatementField.value = ''; return;
    }
    
    const blockConnector = blockConnectorElement ? blockConnectorElement.value : '&&';
    const subConditionItems = ruleItem.querySelectorAll('.sub-conditions-container .sub-condition-item');
    const individualConditions = [];

    subConditionItems.forEach(sci => {
        const attribute = sci.querySelector('.condition-attribute-select').value;
        const operatorSelect = sci.querySelector('.condition-operator-select');
        const valueInput = sci.querySelector('.condition-value-input');

        if (!attribute || !operatorSelect || !valueInput || valueInput.value === "" || valueInput.value.trim() === "") return;

        const operator = operatorSelect.value;
        let value = valueInput.value.trim();
        const attrConfig = ghAttributes[attribute];
        if (!attrConfig) return;

        let statementPart = '';
        if (attrConfig.type === 'boolean') {
            statementPart = (value === 'true') ? attribute : `!${attribute}`;
        } else if (attrConfig.type === 'area') {
            statementPart = `in_${value.replace(/\s+/g, '_')}`;
        } else if (attrConfig.type === 'text' && attrConfig.quoteValue) {
             statementPart = `${attribute} ${operator} "${value}"`;
        }
        else { // enum, numeric, text (no quoting unless handled above)
            const valToUse = value;
            statementPart = `${attribute} ${operator} ${valToUse}`;
        }
        if (statementPart) individualConditions.push(statementPart);
    });

    if (individualConditions.length === 0) {
        hiddenStatementField.value = '';
    } else if (individualConditions.length === 1) {
        hiddenStatementField.value = individualConditions[0];
    } else {
        hiddenStatementField.value = individualConditions.join(` ${blockConnector} `);
    }
}

function clearContainer(container) {
    if (container) while (container.firstChild) container.removeChild(container.firstChild);
}

function removeRule(button) {
    const ruleItem = button.closest('.rule-item');
    if (ruleItem) ruleItem.remove();
}


function copyJsonToClipboard(button) {
    const jsonOutput = document.getElementById('jsonOutput');
    if (jsonOutput) {
        jsonOutput.select();
        jsonOutput.setSelectionRange(0, 99999);
        try {
            document.execCommand('copy');
            if (button) {
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => { button.innerHTML = originalText; }, 2000);
            } else {
                 alert('JSON copied to clipboard!');
            }

        } catch (err) {
            alert('Failed to copy JSON. Please copy manually.');
        }
        window.getSelection().removeAllRanges();
    }
}


// Function to generate the test model JSON (Updated based on latest valid values)
function generateTestModel() {
    const testModel = {
        priority: [],
        areas: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "id": "test_area",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [0,0], [0, 0.001], [0.001, 0.001], [0.001, 0], [0,0] // A small polygon
                            ]
                        ]
                    }
                }
            ]
        },
        distance_influence: 70
    };

    for (const attrKey in ghAttributes) {
        const attrConfig = ghAttributes[attrKey];
        let conditionString = '';

        if (attrConfig.type === 'enum') {
            // Join all *valid* values from ghAttributes with OR
            // Only create condition if there are valid values left
            if (attrConfig.values.length > 0) {
                const conditions = attrConfig.values.map(val => `${attrKey} == ${val}`);
                conditionString = conditions.join(' || ');
            }
        } else if (attrConfig.type === 'numeric') {
            // Use a simple numeric check covering expected range
            if (attrKey === 'curvature') {
                 conditionString = `${attrKey} >= 0 && ${attrKey} <= 1.01`;
            } else if (attrKey === 'hike_rating' || attrKey === 'mtb_rating') {
                 conditionString = `${attrKey} >= 0 && ${attrKey} <= 6.1`;
            } else if (attrKey === 'max_slope') {
                 conditionString = `${attrKey} >= 0`; // Slopes >= 0
            } else if (['average_slope', 'lanes', 'max_speed'].includes(attrKey)) {
                 conditionString = `${attrKey} != null`; // Check if exists
            } else if (['max_height', 'max_width', 'max_length', 'max_weight'].includes(attrKey)) {
                conditionString = `${attrKey} > -1`; // Check > a low bound that should always be true if attribute exists and is positive
            }
            // Add checks for other numeric types if they are added later
        } else if (attrConfig.type === 'boolean') {
            // Check both true and false
             conditionString = `${attrKey} || !${attrKey}`;
        } else if (attrConfig.type === 'area') {
            conditionString = 'in_test_area'; // Use the dummy area ID
        } else if (attrConfig.type === 'text' && attrConfig.quoteValue) {
             // For text types like country, quote the values for testing
             // Use a few example values plus MISSING if it's a valid value for this attribute
             const valuesToTest = [];
             // Check if MISSING is in the enum values for text types if applicable, or manually add
             // For 'country', we manually know MISSING is potentially valid
             if (attrKey === 'country') valuesToTest.push("MISSING", "DEU", "USA"); // Add example countries

             if (valuesToTest.length > 0) {
                 const conditions = valuesToTest.map(val => `${attrKey} == "${val}"`); // QUOTING HERE
                 conditionString = conditions.join(' || ');
             }
        } else {
             // Skip attributes we don't have a test pattern for
             continue;
        }

        if (conditionString) {
             testModel.priority.push({
                 "if": conditionString,
                 "multiply_by": "1"
             });
        }
    }

    const jsonOutputTextarea = document.getElementById('jsonOutput');
    if (jsonOutputTextarea) {
        try {
             jsonOutputTextarea.value = JSON.stringify(testModel, null, 2);
             jsonOutputTextarea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (e) {
            console.error("Error stringifying test model JSON:", e);
            jsonOutputTextarea.value = "Error generating test JSON.";
        }
    } else {
        console.error("JSON output textarea not found.");
    }
}
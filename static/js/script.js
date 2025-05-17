// Place this at the top of static/js/script.js
// static/js/script.js (at the top)
const ghAttributes = {
    road_class: {
        label: "Road Class",
        type: "enum",
        operators: ["==", "!="],
        values: ["MOTORWAY", "TRUNK", "PRIMARY", "SECONDARY", "TERTIARY", "UNCLASSIFIED", "RESIDENTIAL", "LIVING_STREET", "SERVICE", "TRACK", "CYCLEWAY", "FOOTWAY", "PATH", "STEPS", "FERRY", "OTHER"], // Added FERRY here as it's often a class
        quoteValue: false
    },
    road_environment: { // Correctly define road_environment
        label: "Road Environment",
        type: "enum",
        operators: ["==", "!="],
        values: ["ROAD", "BRIDGE", "TUNNEL", "FORD", "FERRY", "TUNNEL", "STREET", "OTHER", "MISSING"], // FERRY can also be an environment
        quoteValue: false
    },
    road_access: {
        label: "Road Access",
        type: "enum",
        operators: ["==", "!="],
        values: ["YES", "NO", "DESTINATION", "DELIVERY", "PRIVATE", "CUSTOMERS", "FORESTRY", "AGRICULTURAL", "PERMISSIVE", "UNKNOWN", "MISSING"],
        quoteValue: false
    },
    surface: {
        label: "Surface",
        type: "enum",
        operators: ["==", "!="],
        values: ["PAVED", "ASPHALT", "CONCRETE", "CONCRETE_LANES", "CONCRETE_PLATES", "PAVING_STONES", "METAL", "WOOD", "COBBLESTONE", "UNPAVED", "COMPACTED", "GRAVEL", "FINE_GRAVEL", "DIRT", "EARTH", "GROUND", "SAND", "GRASS", "GRASS_PAVER", "MUD", "ICE", "SNOW", "SALT", "OTHER", "UNKNOWN", "MISSING"],
        quoteValue: false
    },
    smoothness: {
        label: "Smoothness",
        type: "enum",
        operators: ["==", "!="],
        values: ["EXCELLENT", "GOOD", "INTERMEDIATE", "BAD", "VERY_BAD", "HORRIBLE", "VERY_HORRIBLE", "IMPASSABLE", "UNKNOWN", "MISSING"],
        quoteValue: false
    },
    toll: {
        label: "Toll",
        type: "enum",
        operators: ["==", "!="],
        values: ["ALL", "HGV", "NO", "MISSING"],
        quoteValue: false
    },
    bike_network: {
        label: "Bike Network",
        type: "enum",
        operators: ["==", "!="],
        values: ["INTERNATIONAL", "NATIONAL", "REGIONAL", "LOCAL", "MOUNTAIN", "OTHER", "MISSING"],
        quoteValue: false
    },
    foot_network: { // Added for completeness
        label: "Foot Network",
        type: "enum",
        operators: ["==", "!="],
        values: ["INTERNATIONAL", "NATIONAL", "REGIONAL", "LOCAL", "OTHER", "MISSING"],
        quoteValue: false
    },
    country: {
        label: "Country (ISO3 Alpha)",
        type: "text", // User types the 3-letter code
        operators: ["==", "!="],
        quoteValue: false, // Country codes are strings e.g. "DEU"
        placeholder: "e.g., DEU, FRA"
    },
    track_type: {
        label: "Track Type",
        type: "enum",
        operators: ["==", "!="], // Could add <, > etc. if GH numerically compares grades, but safer as enum.
        values: ["GRADE1", "GRADE2", "GRADE3", "GRADE4", "GRADE5", "MISSING"],
        quoteValue: false
    },
    urban_density: {
        label: "Urban Density",
        type: "enum",
        operators: ["==", "!="],
        values: ["RURAL", "RESIDENTIAL", "CITY", "MISSING"],
        quoteValue: false
    },
    // --- Numeric Attributes ---
    average_slope: {
        label: "Average Slope (%)",
        type: "numeric",
        operators: ["==", "!=", ">", "<", ">=", "<="],
        quoteValue: false,
        placeholder: "e.g., 5 or -3"
    },
    max_slope: {
        label: "Max Slope (%)",
        type: "numeric",
        operators: ["==", "!=", ">", "<", ">=", "<="],
        quoteValue: false,
        placeholder: "e.g., 10"
    },
    curvature: {
        label: "Curvature (0-1, lower is curvier)",
        type: "numeric", // Range 0-1
        operators: ["==", "!=", ">", "<", ">=", "<="],
        quoteValue: false,
        placeholder: "e.g., 0.8"
    },
    hike_rating: { // SAC Scale
        label: "Hike Rating (SAC Scale 0-6)",
        type: "numeric",
        operators: ["==", "!=", ">", "<", ">=", "<="],
        quoteValue: false,
        placeholder: "0-6"
    },
    mtb_rating: { // MTB Scale
        label: "MTB Rating (OSM Scale 0-6)",
        type: "numeric",
        operators: ["==", "!=", ">", "<", ">=", "<="],
        quoteValue: false,
        placeholder: "0-6"
    },
    lanes: {
        label: "Number of Lanes",
        type: "numeric",
        operators: ["==", "!=", ">", "<", ">=", "<="],
        quoteValue: false,
        placeholder: "e.g., 2"
    },
    max_speed: {
        label: "Max Speed (Road Sign km/h)",
        type: "numeric",
        operators: ["==", "!=", ">", "<", ">=", "<="],
        quoteValue: false,
        placeholder: "e.g., 50"
    },
    max_height: { label: "Max Height (m)", type: "numeric", operators: ["<", "<=", ">", ">=", "==", "!="], quoteValue: false, placeholder: "e.g., 3.5" },
    max_width: { label: "Max Width (m)", type: "numeric", operators: ["<", "<=", ">", ">=", "==", "!="], quoteValue: false, placeholder: "e.g., 2.5" },
    max_length: { label: "Max Length (m)", type: "numeric", operators: ["<", "<=", ">", ">=", "==", "!="], quoteValue: false, placeholder: "e.g., 10" },
    max_weight: { label: "Max Weight (ton)", type: "numeric", operators: ["<", "<=", ">", ">=", "==", "!="], quoteValue: false, placeholder: "e.g., 7.5" },
    max_axle_load: { label: "Max Axle Load (ton)", type: "numeric", operators: ["<", "<=", ">", ">=", "==", "!="], quoteValue: false, placeholder: "e.g., 5" },

    // --- True Boolean Attributes ---
    road_class_link: {
        label: "Road Class Link",
        type: "boolean",
        operators: ["is"], // 'is true', 'is false'
        quoteValue: false
    },
    roundabout: {
        label: "Roundabout",
        type: "boolean",
        operators: ["is"], // 'is true', 'is false'
        quoteValue: false
    },
    // --- Special 'areas' condition ---
    custom_area: {
        label: "In Custom Area",
        type: "area", // Special type for our logic
        operators: ["matches"], // Will form "in_AREA_ID"
        quoteValue: false, // Area ID is not quoted in "in_AREA_ID"
        placeholder: "Area ID (e.g., my_zone)"
    }
    // Hazmat attributes are more complex and might need special handling or be considered advanced for direct UI builder
    // hazmat: { label: "Hazmat", type: "enum", values: ["YES", "NO"], ...},
    // hazmat_tunnel: { label: "Hazmat Tunnel Category", type: "enum", values: ["A", "B", "C", "D", "E"], ...},
    // hgv: { label: "HGV Restriction", type: "enum", values: ["MISSING", "YES", "NO", "DESIGNATED"], ...}
};


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Initialize existing rules if form was re-submitted (for Part II)
    initializeExistingRuleItems();

    // Event delegation
    document.body.addEventListener('change', function (event) {
        const target = event.target;
        if (target.classList.contains('condition-type-select')) {
            handleConditionTypeChange(target);
        } else if (target.classList.contains('condition-attribute-select')) {
            handleAttributeChange(target);
        } else if (
            target.classList.contains('condition-operator-select') ||
            target.classList.contains('condition-value-input') || // covers select and input types
            target.classList.contains('condition-block-connector')
        ) {
            const ruleItem = target.closest('.rule-item');
            if (ruleItem) updateGeneratedConditionStatement(ruleItem);
        }
    });

    document.body.addEventListener('input', function (event) { // For text/number inputs in conditions
        const target = event.target;
        if (target.classList.contains('condition-value-input') && target.closest('.sub-condition-item')) {
            const ruleItem = target.closest('.rule-item');
            if (ruleItem) updateGeneratedConditionStatement(ruleItem);
        }
    });

    document.body.addEventListener('click', function (event) {
        const target = event.target;
        if (target.closest('.add-sub-condition-btn')) {
            addSubCondition(target.closest('.add-sub-condition-btn'));
        } else if (target.closest('.remove-sub-condition-btn')) {
            removeSubCondition(target.closest('.remove-sub-condition-btn'));
        }
        // Note: removeRule (for the whole rule item) is still an inline onclick in HTML
    });
});

function initializeExistingRuleItems() {
    document.querySelectorAll('.rule-item').forEach(ruleItem => {
        const conditionTypeSelect = ruleItem.querySelector('.condition-type-select');
        handleConditionTypeChange(conditionTypeSelect); // This will show/hide based on IF/ELSE/ELSE_IF

        // If it's not ELSE, and sub-conditions might exist (from server-side render)
        if (conditionTypeSelect.value !== 'else') {
            const subConditionsContainer = ruleItem.querySelector('.sub-conditions-container');
            if (subConditionsContainer.children.length === 0) { // If no sub-conditions rendered by server, add one
                addSubCondition(ruleItem.querySelector('.add-sub-condition-btn'), false); // false = don't update statement yet
            } else { // Sub-conditions were rendered by server
                subConditionsContainer.querySelectorAll('.sub-condition-item').forEach(sci => {
                    const attrSelect = sci.querySelector('.condition-attribute-select');
                    populateAttributeSelect(attrSelect); // Ensure dropdown is populated
                    // If Flask pre-filled attribute, operator, value, we need to reconstruct the dynamic parts
                    // This is the tricky part for "don't clear". For now, we ensure selects are populated.
                    // Full reconstruction requires parsing the form data carefully.
                    if (attrSelect.value) { // If an attribute was already selected by Flask
                        handleAttributeChange(attrSelect, false); // false = don't clear subsequent, let Flask values persist
                        // Manually trigger change on operator and value if they exist to ensure UI consistency
                        const opSelect = sci.querySelector('.condition-operator-select');
                        if (opSelect && opSelect.value) opSelect.dispatchEvent(new Event('change', { bubbles: true }));
                        const valInput = sci.querySelector('.condition-value-input');
                        if (valInput && valInput.value) valInput.dispatchEvent(new Event('change', { bubbles: true }));

                    }
                });
            }
        }
        updateGeneratedConditionStatement(ruleItem); // Calculate the full statement
    });
}


function addRule(type) { // type is 'speed' or 'priority'
    const container = document.getElementById(`${type}-rules-container`);
    const templateElement = document.getElementById(`${type}-rule-template`);
    const newRuleEl = templateElement.cloneNode(true);
    newRuleEl.removeAttribute('id');
    newRuleEl.style.display = '';
    const ruleItemDiv = newRuleEl.querySelector('.rule-item');

    // Add an initial sub-condition to the new rule if it's not 'else'
    const conditionTypeSelect = ruleItemDiv.querySelector('.condition-type-select');
    if (conditionTypeSelect.value !== 'else') {
        addSubCondition(ruleItemDiv.querySelector('.add-sub-condition-btn'), false); // Add one criterion by default
    }

    container.appendChild(ruleItemDiv);
    handleConditionTypeChange(conditionTypeSelect); // Initial show/hide logic
    updateGeneratedConditionStatement(ruleItemDiv); // Update generated statement for the new rule
}

function addSubCondition(addButton, doUpdateStatement = true) {
    const ruleItem = addButton.closest('.rule-item');
    const subConditionsContainer = ruleItem.querySelector('.sub-conditions-container');
    const subTemplate = document.getElementById('sub-condition-template');
    const newSubConditionEl = subTemplate.cloneNode(true); // Clone the outer div of sub-condition-template
    newSubConditionEl.removeAttribute('id');
    newSubConditionEl.style.display = ''; // Make it visible

    const actualSubConditionItem = newSubConditionEl.querySelector('.sub-condition-item');

    // Populate attribute select for the new sub-condition
    populateAttributeSelect(actualSubConditionItem.querySelector('.condition-attribute-select'));

    subConditionsContainer.appendChild(actualSubConditionItem);
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
    const currentValue = selectElement.value; // Preserve selected value if any
    while (selectElement.options.length > 1) selectElement.remove(1); // Clear old
    for (const attrKey in ghAttributes) {
        const option = document.createElement('option');
        option.value = attrKey;
        option.textContent = ghAttributes[attrKey].label;
        selectElement.appendChild(option);
    }
    selectElement.value = currentValue; // Restore
}

function handleConditionTypeChange(conditionTypeSelect) {
    const ruleItem = conditionTypeSelect.closest('.rule-item');
    const isElse = conditionTypeSelect.value === 'else';

    // Toggle visibility of the entire criteria building area (sub-conditions, add button, logic selector)
    const subConditionsContainer = ruleItem.querySelector('.sub-conditions-container');
    const addSubConditionBtn = ruleItem.querySelector('.add-sub-condition-btn');
    const blockConnector = ruleItem.querySelector('.condition-block-connector');

    [subConditionsContainer, addSubConditionBtn, blockConnector].forEach(el => {
        if (el) el.style.display = isElse ? 'none' : '';
    });

    if (!isElse && subConditionsContainer.children.length === 0) {
        // If switching to IF/ELSE_IF and no criteria exist, add one
        addSubCondition(addSubConditionBtn, false);
    }
    updateGeneratedConditionStatement(ruleItem);
}

function toggleConditionBuilder(ruleItem, show) { /* No longer primary toggle, handled by handleConditionTypeChange */ }

function handleAttributeChange(attributeSelect, clearOperatorAndValue = true) {
    const subConditionItem = attributeSelect.closest('.sub-condition-item');
    const operatorContainer = subConditionItem.querySelector('.condition-operator-container');
    const valueContainer = subConditionItem.querySelector('.condition-value-container');
    const selectedAttributeKey = attributeSelect.value;

    // Preserve existing operator/value if not clearing (e.g. during initialization)
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
        if (existingOp) operatorSelect.value = existingOp;
        operatorContainer.appendChild(operatorSelect);
        populateValueInput(valueContainer, attrConfig, existingVal); // Pass existingVal
    }
    updateGeneratedConditionStatement(subConditionItem.closest('.rule-item'));
}

function populateValueInput(valueContainer, attrConfig, existingValue = null) {
    clearContainer(valueContainer);
    let valueInput;
    // ... (logic from previous populateValueInput: creating select for enum/boolean, input for numeric/area/text)
    // --- Start of existing populateValueInput logic ---
    if (attrConfig.type === 'enum') {
        valueInput = document.createElement('select');
        valueInput.className = 'form-select form-select-sm condition-value-input';
        attrConfig.values.forEach(val => {
            const option = document.createElement('option'); option.value = val; option.textContent = val; valueInput.appendChild(option);
        });
    } else if (attrConfig.type === 'numeric') {
        valueInput = document.createElement('input'); valueInput.type = 'number';
        valueInput.className = 'form-control form-control-sm condition-value-input';
        valueInput.placeholder = attrConfig.placeholder || 'Value';
        if (attrConfig.step) valueInput.step = attrConfig.step;
    } else if (attrConfig.type === 'boolean') {
        valueInput = document.createElement('select');
        valueInput.className = 'form-select form-select-sm condition-value-input';
        ['true', 'false'].forEach(val => {
            const option = document.createElement('option'); option.value = val;
            option.textContent = val.charAt(0).toUpperCase() + val.slice(1); valueInput.appendChild(option);
        });
    } else if (attrConfig.type === 'area') {
        valueInput = document.createElement('input'); valueInput.type = 'text';
        valueInput.className = 'form-control form-control-sm condition-value-input';
        valueInput.placeholder = attrConfig.placeholder || 'Area ID';
    } else {
        valueInput = document.createElement('input'); valueInput.type = 'text';
        valueInput.className = 'form-control form-control-sm condition-value-input';
        valueInput.placeholder = attrConfig.placeholder || 'Value';
    }
    // --- End of existing populateValueInput logic ---

    if (existingValue !== null && valueInput) valueInput.value = existingValue;
    valueContainer.appendChild(valueInput);
    // updateGeneratedConditionStatement is called by the caller of populateValueInput
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
        const operatorSelect = sci.querySelector('.condition-operator-select'); // Will be 'is' for booleans
        const valueInput = sci.querySelector('.condition-value-input'); // Will be a select with 'true'/'false' for booleans

        if (!attribute || !operatorSelect || !valueInput || valueInput.value.trim() === "") return;

        const operator = operatorSelect.value; // For booleans, this will be "is"
        let value = valueInput.value.trim();   // For booleans, this will be "true" or "false"
        const attrConfig = ghAttributes[attribute];
        if (!attrConfig) return;

        let statementPart = '';
        if (attrConfig.type === 'boolean') {
            // For 'roundabout is true', GraphHopper expects 'roundabout'
            // For 'roundabout is false', GraphHopper expects '!roundabout'
            if (value === 'true') {
                statementPart = attribute; // e.g., "roundabout"
            } else { // value === 'false'
                statementPart = `!${attribute}`; // e.g., "!roundabout"
            }
        } else if (attrConfig.type === 'area') {
            statementPart = `in_${value.replace(/\s+/g, '_')}`;
        } else { // enum, numeric, text
            const valToUse = value;
            // Standard operator for enum/numeric/text
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

// removeRule is global (called by onclick in HTML)
function removeRule(button) {
    button.closest('.rule-item').remove();
    // Potentially re-evaluate something if needed, but usually not for rule removal
}

function copyJsonToClipboard() {
    const jsonOutput = document.getElementById('jsonOutput');
    if (jsonOutput) {
        jsonOutput.select();
        jsonOutput.setSelectionRange(0, 99999); // For mobile devices
        try {
            document.execCommand('copy');
            alert('JSON copied to clipboard!');
        } catch (err) {
            alert('Failed to copy JSON. Please copy manually.');
        }
        window.getSelection().removeAllRanges(); // Deselect
    }
}
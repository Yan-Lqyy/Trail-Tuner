from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)
app.secret_key = 'your_very_secret_trail_tuner_key' # Important for sessions/flashing if you add it

def build_rules(request_form, rule_type_prefix):
    """
    Helper function to build speed or priority rules from form data.
    `rule_type_prefix` should be 'speed' or 'priority'.
    """
    rules = []
    condition_types = request_form.getlist(f'{rule_type_prefix}_condition_type')
    condition_statements = request_form.getlist(f'{rule_type_prefix}_condition_statement')
    action_types = request_form.getlist(f'{rule_type_prefix}_action_type') # Only for speed
    action_values = request_form.getlist(f'{rule_type_prefix}_action_value')

    num_rules = len(condition_types)

    for i in range(num_rules):
        rule = {}
        condition_type = condition_types[i]
        condition_statement = condition_statements[i].strip() # This now comes from the hidden field
        action_value = action_values[i].strip()

        # If it's not 'else' and the condition_statement is empty, it's an incomplete rule.
        if condition_type != "else" and not condition_statement:
            print(f"Warning: '{condition_type}' for {rule_type_prefix} rule has an empty condition. Skipping.")
            continue # Skip rule if 'if' or 'else_if' has no generated condition

        if not action_value: # Skip rule if action value is empty
            print(f"Warning: Empty action value for a {rule_type_prefix} rule. Skipping.")
            continue
        
        # Basic validation: ensure value is somewhat number-like if not empty
        try:
            # This is just a loose check. GH server will do the real validation.
            if rule_type_prefix == "speed" and action_types[i] == "limit_to":
                float(action_value) # km/h can be float
            else: # multiply_by
                float(action_value)
        except ValueError:
            # Could add flashing error messages here
            print(f"Warning: Invalid action value '{action_value}' for a {rule_type_prefix} rule. Skipping.")
            continue


        if condition_type == "if":
            if not condition_statement: # 'if' must have a condition
                print(f"Warning: 'if' statement for {rule_type_prefix} rule missing condition. Skipping.")
                continue
            rule["if"] = condition_statement
        elif condition_type == "else_if":
            if not condition_statement: # 'else_if' must have a condition
                print(f"Warning: 'else_if' statement for {rule_type_prefix} rule missing condition. Skipping.")
                continue
            rule["else_if"] = condition_statement
        elif condition_type == "else":
            rule["else"] = "" # Value for 'else' is an empty string
            # Condition statement is ignored for 'else'

        if rule_type_prefix == "speed":
            action_type = action_types[i]
            if action_type == "multiply_by":
                rule["multiply_by"] = action_value
            elif action_type == "limit_to":
                rule["limit_to"] = action_value
        elif rule_type_prefix == "priority":
            # Priority only has multiply_by
            rule["multiply_by"] = action_value
        
        if rule: # Only add if something was constructed
            rules.append(rule)
            
    return rules


@app.route('/', methods=['GET', 'POST'])
def index():
    generated_json_str = None
    error_message = None

    if request.method == 'POST':
        custom_model = {}

        # --- Speed Rules ---
        speed_rules = build_rules(request.form, 'speed')
        if speed_rules:
            custom_model["speed"] = speed_rules

        # --- Priority Rules ---
        priority_rules = build_rules(request.form, 'priority')
        if priority_rules:
            custom_model["priority"] = priority_rules
        
        # --- Distance Influence ---
        distance_influence_str = request.form.get('distance_influence', '').strip()
        if distance_influence_str:
            try:
                # GraphHopper expects a number, not a string for distance_influence
                custom_model["distance_influence"] = float(distance_influence_str) if '.' in distance_influence_str else int(distance_influence_str)
            except ValueError:
                error_message = "Invalid format for Distance Influence. Must be a number."
                # You might want to flash this message instead
                print(error_message)


        # --- Areas (GeoJSON) ---
        areas_geojson_str = request.form.get('areas_geojson', '').strip()
        if areas_geojson_str:
            try:
                areas_data = json.loads(areas_geojson_str)
                # Basic validation for areas structure
                if isinstance(areas_data, dict) and areas_data.get("type") == "FeatureCollection" and "features" in areas_data:
                    # Further validation could check each feature has an 'id' and 'geometry' of type 'Polygon'
                    custom_model["areas"] = areas_data
                else:
                    raise ValueError("GeoJSON must be a FeatureCollection with features.")
            except json.JSONDecodeError:
                error_message = "Invalid GeoJSON format for Areas."
                print(error_message)
            except ValueError as ve:
                error_message = f"Invalid Areas GeoJSON structure: {ve}"
                print(error_message)


        if custom_model and not error_message:
            try:
                generated_json_str = json.dumps(custom_model, indent=2)
            except Exception as e:
                error_message = f"Error generating JSON: {e}"
                print(error_message)
        elif not custom_model and not error_message:
            error_message = "No rules or settings provided to generate a model."

    # Pass request.form back to pre-fill the form on POST if there was an error or for user convenience
    return render_template('index.html', generated_json=generated_json_str, error=error_message, request=request)

if __name__ == '__main__':
    app.run(debug=True)
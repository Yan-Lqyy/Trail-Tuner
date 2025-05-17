# Trail Tuner: Craft Your Cycling Routes for GraphHopper

Trail Tuner is a web-based tool designed to simplify the creation of custom routing models for the **Bike** profile in the GraphHopper Maps navigation engine. Instead of manually writing complex JSON, Trail Tuner provides an intuitive, user-friendly interface to define exactly how you want GraphHopper to route your cycling adventures, whether you prefer smooth paved paths, challenging gravel tracks, or scenic detours.

## The Problem: GraphHopper Custom Models

GraphHopper offers powerful routing capabilities, including a well-defined profile for cycling. However, every cyclist has unique preferences. You might want to heavily favor dedicated cycleways, strictly avoid specific road surfaces (like cobblestones or sand), prioritize routes outside of urban areas, or influence the balance between the shortest route and the fastest route.

GraphHopper allows this fine-tuning through **Custom Models**. A custom model is a JSON object where you specify rules based on road attributes (surface type, road class, slope, etc.) to influence the `speed` and `priority` of road segments, and set a global `distance_influence`.

While incredibly flexible, manually writing and debugging this JSON can be cumbersome, especially for users who aren't developers or those who want to experiment with various rule combinations. Understanding the exact attribute names, valid values, operators, and the correct JSON structure requires diving deep into the GraphHopper documentation.

## Introducing Trail Tuner: Your Routing Co-Pilot

Trail Tuner bridges the gap between your desired cycling preferences and the technical requirements of GraphHopper's custom models. It translates your choices made through a guided web interface into the correct JSON format.

The goal is to make advanced custom routing accessible, allowing you to focus on *how* you want to ride, not on the intricacies of JSON syntax or attribute names.

## Key Features

*   **Intuitive Rule Building:** Easily add, configure, and remove rules for `speed` and `priority`.
*   **Smart Condition Builder:** Define rule conditions (e.g., `surface == GRAVEL`) using guided dropdowns for attributes, operators, and values, eliminating guesswork and typos.
*   **AND/OR Logic:** Combine multiple criteria within a single rule's condition using `ALL (AND)` or `ANY (OR)` connectors.
*   **Speed Control:** Set rules to `multiply_by` the default speed (e.g., speed up on smooth paths) or `limit_to` a maximum speed (e.g., slow down on rough terrain).
*   **Priority Control:** Set rules to `multiply_by` the default priority, influencing route preference without strictly changing travel time (e.g., prefer cycleways, discourage main roads).
*   **Distance Influence Setting:** Easily adjust the trade-off between shorter routes and faster routes.
*   **Areas Support:** Include GeoJSON polygons to apply rules specifically within defined geographical areas.
*   **Built-in Attribute Reference:** Access a quick guide to common GraphHopper attributes usable in your rules.
*   **JSON Output:** Generates the valid custom model JSON ready to be copied and used in GraphHopper Maps or API requests.
*   **Test Model Generator:** Quickly create a comprehensive JSON structure including checks for most supported attributes to help validate compatibility with your specific GraphHopper instance.

## How to Use Trail Tuner

The web interface is structured into sections corresponding to the key parts of a GraphHopper custom model:

1.  **Speed Rules:**
    *   Click "Add Speed Rule".
    *   Select the rule `Type` (IF, ELSE IF, ELSE).
    *   Use the `Condition` builder:
        *   Select an `Attribute` (e.g., `surface`).
        *   Select an `Operator` (e.g., `==`, `>`, `is`).
        *   Select or enter the `Value` (e.g., `GRAVEL`, `50`, `true`).
        *   Click "Add Criterion" to add more criteria to this rule's condition.
        *   Choose the `Logic` (ALL/AND or ANY/OR) to combine multiple criteria.
    *   Select the `Action` (`Multiply Speed By` or `Limit Speed To`).
    *   Enter the `Value` for the action (e.g., `0.7` to multiply speed by 70%, or `20` to limit speed to 20 km/h).
    *   Click the trash icon to remove a rule.

2.  **Priority Rules:** Follow the same steps as Speed Rules, but the only available action is `Multiply Priority By`. Use values less than 1 to discourage, greater than 1 to encourage (e.g., `0.1` to strongly avoid, `1.2` to slightly prefer).

3.  **Distance Influence:** Enter a single numeric value. Higher values prioritize shorter routes over faster ones.

4.  **Areas (GeoJSON):** Paste your GeoJSON `FeatureCollection` definition directly into the textarea. Ensure each `Feature` has a unique `id` property. You can then use `in_YOUR_AREA_ID` as an attribute in your rule conditions (e.g., `if: "in_my_slow_zone"`).

5.  **Generate JSON:** Click the "Generate JSON" button at the bottom of the form. The tool will collect all your defined rules, distance influence, and areas to construct the complete JSON object.

6.  **Copy JSON:** The generated JSON will appear in a textarea. Use the "Copy to Clipboard" button to easily grab it.

7.  **Use the JSON:** Paste the copied JSON into GraphHopper Maps' custom model editor (usually accessed via a "custom" button or gear icon) or include it in your GraphHopper API requests.

8.  **Generate Full Test Model:** Click this button to populate the JSON output textarea with a template designed to test the validity of various attributes and values with your GraphHopper backend.

## Behind the Scenes: Design & Implementation

Trail Tuner is built as a simple, yet effective web application using:

*   **Flask (Python):** Provides the backend web server framework. It handles receiving form data when you click "Generate JSON" and rendering the HTML template. It uses Python's `json` library to build and format the final JSON string.
*   **HTML5:** Structures the web page.
*   **Bootstrap 5:** Provides responsive styling and layout components (cards, forms, grid system, buttons) for a clean and mobile-friendly interface.
*   **Custom CSS:** Adds specific styling touches to enhance the look and feel, aiming for an elegant design with subtle outdoorsy elements.
*   **JavaScript:** Powers the dynamic and interactive parts of the UI:
    *   Adding and removing rule and sub-condition elements.
    *   Implementing the **Smart Condition Builder**: It uses a JavaScript object (`ghAttributes`) that acts as a schema, defining the available GraphHopper attributes, their types (enum, numeric, boolean, area, text), valid operators for each type, and potential values for enums. Based on user selections in the attribute dropdown, it dynamically populates the operator and value input/select fields, ensuring the user is guided towards valid combinations.
    *   Assembling the condition string: As the user interacts with the smart builder (selecting attribute, operator, value), JavaScript constructs the corresponding condition string (e.g., `surface == GRAVEL`, `max_slope > 10`, `!roundabout`, `country == "DEU"`). This string is stored in a hidden input field associated with each rule item.
    *   Handling `if`/`else_if`/`else` logic for showing/hiding the condition builder.
    *   Joining multiple criteria within a rule's condition using the selected `&&` or `||` operator.
    *   Generating the test model JSON programmatically based on the `ghAttributes` definition.
    *   Providing client-side copy-to-clipboard functionality.
    *   Basic form state persistence on page reloads (e.g., after a POST request).

The core design philosophy is to encapsulate the complexity of the GraphHopper custom model structure and attribute rules within the JavaScript logic and the `ghAttributes` data, presenting a simplified, guided experience to the user via dynamic HTML elements.

## Understanding GraphHopper Custom Models

For those new to GraphHopper custom models, here's a quick rundown of the concepts Trail Tuner helps you configure:

*   **Custom Model Object:** The root JSON object. Can contain `speed`, `priority`, `distance_influence`, and `areas`.
*   **Speed:** Rules influencing the calculated travel time. Affects routing by changing edge weights directly tied to time.
    *   `multiply_by`: Multiplies the default speed for a segment (e.g., `0.5` makes it half speed).
    *   `limit_to`: Sets a maximum speed for a segment (e.g., `20` limits to 20 km/h).
*   **Priority:** Rules influencing how desirable a road segment is relative to others. Affects routing by changing edge weights without directly changing travel time. Default is 1.
    *   `multiply_by`: Multiplies the default priority (e.g., `0.1` makes it 1/10th as desirable, `1.5` makes it 1.5 times more desirable). `0` effectively blocks a road.
*   **Distance Influence:** A numeric value balancing time vs. distance. Higher values make the router prefer shorter total distances even if they are slower per segment.
*   **Areas:** Define custom geographical regions using GeoJSON polygons. You can then use the syntax `in_YOUR_AREA_ID` in your `speed` or `priority` conditions to apply rules only within those areas.
*   **Attributes:** Properties of road segments derived from underlying map data (like OpenStreetMap). Examples include:
    *   **Enum Types:** Have a fixed set of possible values (e.g., `road_class`, `surface`, `smoothness`, `bike_network`, `road_environment`). These values are used directly in conditions *without* quotes (e.g., `surface == GRAVEL`).
    *   **Numeric Types:** Have numeric values (e.g., `average_slope`, `max_speed`, `max_width`, `lanes`, `mtb_rating`). Used with numeric operators (`>`, `<`, `>=`, `<=`, `==`, `!=`).
    *   **Boolean Types:** Are simply true or false (e.g., `roundabout`, `road_class_link`). Used directly as the attribute name (e.g., `roundabout`) for true, or with `!` for false (e.g., `!roundabout`).
    *   **Text Types:** Attributes whose values are strings (e.g., `country`). These *might* require quotes in the condition string depending on the specific attribute (based on testing, `country` needs quotes, e.g., `country == "DEU"`).
    *   **Area Type (Special):** The `in_` prefix followed by an area ID (`in_my_zone`) acts like a boolean attribute that is true if the segment is inside the named area.

Trail Tuner aims to abstract away the complexities of remembering which type is which and how to format the condition string, guiding you through the process.

## Potential Future Enhancements

*   **Visual Area Editor:** Integrate a map (like Leaflet or OpenLayers) to draw areas visually instead of pasting GeoJSON.
*   **More Complex Logic:** Implement a UI to build conditions with mixed `&&` and `||` and parentheses `()`.
*   **Pre-defined Templates:** Offer starting points for common cycling profiles (e.g., "Paved Crusader", "Gravel Grinder", "Hill Avoider").
*   **Saving/Loading:** Allow users to save their created models and load them later.
*   **Direct API Integration:** Option to test the generated JSON directly against a specified GraphHopper API endpoint.
*   **Expand Attribute List:** Fetch or include a more exhaustive list of attributes available from GraphHopper's `/info` endpoint for a specific profile.
*   **Validation Feedback:** Provide more detailed client-side validation feedback as the user builds rules.

## Feedback and Contributions

Trail Tuner is a tool built to help the GraphHopper cycling community. If you find bugs, have suggestions for improvement, or discover new valid attributes/values through your testing with GraphHopper, please feel free to open an issue or discuss! Your feedback is highly valuable.

---
*Happy Trails!*

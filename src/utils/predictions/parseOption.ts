export function parseOption(option: string) {
    // First, we check if the option is a JSON-like string using regex
    if (/^\{.*\}$/.test(option)) {
      try {
        // Attempt to parse the JSON string
        const json = JSON.parse(option);
        // Check if the 'name' key exists
        if (json && json.name) {
          return json.name;
        }
      } catch (e) {
        // If parsing fails, return the original string
        console.error("Error parsing JSON:", e);
        return option;
      }
    }
    // If not a JSON string, return the option directly
    return option;
  }

  export function parseOptionJSON(option: string) {
    // First, we check if the option is a JSON-like string using regex
    if (/^\{.*\}$/.test(option)) {
      try {
        // Attempt to parse the JSON string
        const json = JSON.parse(option);
        // Check if the 'name' key exists
        if (json) {
          return json;
        }
      } catch (e) {
        // If parsing fails, return the original string
        console.error("Error parsing JSON:", e);
        return option;
      }
    }
    // If not a JSON string, return the option directly
    return option;
  }


  export function parseOptions(option: any, index: number) {
    // First, we check if the option is a JSON-like string using regex
    const zeroBasedIndex = index - 1;
    if ((typeof option)!= "string") {
      return option[zeroBasedIndex].name
    }

    if (/^\[.*\]$/.test(option)) {
      try {
        // Attempt to parse the JSON string
        const jsonArray = JSON.parse(option);
        // Check if the index is valid (1 or 2) and within the array bounds
        if (Array.isArray(jsonArray) && jsonArray.length >= index) {
          // Convert 1-based index to 0-based

          // Check if the object at the specified index has the 'name' key
          if (jsonArray[zeroBasedIndex] && jsonArray[zeroBasedIndex].name) {
            return jsonArray[zeroBasedIndex].name;
          }
        }
      } catch (e) {
        // If parsing fails, return an error message
        console.error("Error parsing JSON:", e);
        return "Invalid option format";
      }
    }
    // If not a JSON array string, return an error message
    return "Invalid option format";
  }

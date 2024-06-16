export function copyTextToClipboard(text: string) {
  // Create a temporary text area element
  const textArea = document.createElement("textarea");

  // Set the text content to the input string
  textArea.value = text;

  // Append the text area element to the document
  document.body.appendChild(textArea);

  // Select the text inside the text area
  textArea.select();

  try {
    // Execute the copy command
    document.execCommand("copy");
    // Optionally, provide user feedback that the text has been copied
    alert("Text copied to clipboard: " + text);
  } catch (err) {
    console.error("Unable to copy text: ", err);
  } finally {
    // Remove the temporary text area from the document
    document.body.removeChild(textArea);
  }
}

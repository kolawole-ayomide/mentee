export function getPreview(messages) {
if (!messages || messages.length === 0) return "No messages yet";
const last = messages[messages.length - 1];
const prefix = last.from === "me" || last.sender === "me" ? "You: " : "";
return `${prefix}${last.text}`;
}
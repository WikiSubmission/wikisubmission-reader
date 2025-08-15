export const highlightMarkdown = (text?: string | null) => {
  if (!text) return null;

  // Split by newlines first
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => (
    <span key={lineIndex}>
      {line.split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={index} className="rounded bg-yellow-300 px-0 dark:bg-yellow-800">
            {part.slice(2, -2)}
          </span>
        ) : (
          part
        )
      )}
      {lineIndex < lines.length - 1 && <br />}
    </span>
  ));
};

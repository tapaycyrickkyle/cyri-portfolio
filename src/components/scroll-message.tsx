export default function ScrollMessage({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <p
      className={`scroll-message scroll-message-visible ${className}`}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="scroll-message-word">{word}</span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

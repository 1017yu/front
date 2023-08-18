interface ValidationMessageProps {
  message: string;
  positive?: boolean;
}

export default function ValidationMessage({
  message,
  positive,
}: ValidationMessageProps) {
  return (
    <p
      className={`h-2 text-sm ${
        positive ? 'text-green-500' : 'text-rose-500'
      } `}
    >
      {message}
    </p>
  );
}

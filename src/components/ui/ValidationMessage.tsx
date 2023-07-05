interface ValidationMessageProps {
  message: string;
}

export default function ValidationMessage({ message }: ValidationMessageProps) {
  return <p className="h-2 text-sm text-rose-500">{message}</p>;
}

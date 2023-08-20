interface LoadingSpinnerProps {
  color: 'white' | 'accent' | 'red';
}

export default function LoadingSpinner({ color }: LoadingSpinnerProps) {
  return <div className={`loading-${color}`}></div>;
}

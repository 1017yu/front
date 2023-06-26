interface LoadingSpinnerProps {
  color: 'white' | 'accent';
}

export default function LoadingSpinner({ color }: LoadingSpinnerProps) {
  return <div className={`loading-${color}`}></div>;
}

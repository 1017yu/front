export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto px-8 sm:px-20">{children}</div>;
}

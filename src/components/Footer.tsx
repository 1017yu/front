import Popple from '@/components/ui/Popple';

export default function Footer() {
  return (
    <footer className="body-font flex h-12">
      <div className="container mx-auto flex flex-col items-center px-10 sm:flex-row">
        <Popple />
        <p className="text-sm text-subTextAndBorder sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
          <span className="ml-1 text-gray-400" rel="noopener noreferrer">
            © 2023 POPPLE @FASTSIDE
          </span>
        </p>
      </div>
    </footer>
  );
}

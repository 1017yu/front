interface ButtonProps {
  contents: string | JSX.Element;
  onClick?: () => void;
  submit?: boolean;
  secondary?: boolean;
  disabled?: boolean;
}

export default function Button({
  contents,
  onClick,
  submit,
  secondary,
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
      className={`${
        secondary ? 'bg-white text-accent' : 'bg-accent text-white'
      } block h-10 w-full rounded-md border-2 border-accent px-3 py-2 text-xs font-bold ring-subTextAndBorder ring-offset-2 transition hover:opacity-80 focus:ring-2 active:scale-95 disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:text-sm`}
    >
      {contents}
    </button>
  );
}

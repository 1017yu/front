interface ButtonProps {
  contents: string | JSX.Element;
  onClick: () => void;
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
      } block w-full rounded-md border-2 border-accent px-3 py-2 font-bold transition hover:opacity-80 active:scale-95 disabled:opacity-30 disabled:active:scale-100`}
    >
      {contents}
    </button>
  );
}

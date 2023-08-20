export type TModalType = {
  isOpen: boolean;
  type: string;
  title: string;
  content: JSX.Element | string;
  okCallback?: () => void;
  cancelCallback?: () => void;
  okButton?: string;
  cancelButton?: string;
};

export type TOpenModalType = {
  type: string;
  title: string;
  content: JSX.Element | string;
  okCallback?: () => void;
  cancelCallback?: () => void;
  okButton?: string;
  cancelButton?: string;
};

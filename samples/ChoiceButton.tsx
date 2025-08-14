import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function ChoiceButton({ label, ...rest }: Props) {
  return (
    <button
      data-testid="choice"
      {...rest}
    >
      {label}
    </button>
  );
}

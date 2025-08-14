import React from 'react';

type Props = {
  title: string;
  description: string;
  onOpen?: () => void;
};

export default function ScenarioCard({ title, description, onOpen }: Props) {
  return (
    <button
      className="scenario-card"
      data-testid="scenario-card"
      aria-label={title}
      onClick={onOpen}
    >
      <h3 data-testid="scenario-title">{title}</h3>
      <p>{description}</p>
    </button>
  );
}

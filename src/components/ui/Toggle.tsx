import { Switch } from '@headlessui/react';

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <Switch
      checked={enabled}
      onChange={onToggle}
      className={`${
        enabled ? 'bg-accent' : 'bg-subTextAndBorder'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}

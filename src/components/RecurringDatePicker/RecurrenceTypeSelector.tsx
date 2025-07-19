import { RecurrenceType } from '@/types/recurrence';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, RefreshCw, Repeat } from 'lucide-react';

interface RecurrenceTypeSelectorProps {
  value: RecurrenceType;
  onChange: (type: RecurrenceType) => void;
}

const recurrenceOptions = [
  { value: 'daily' as const, label: 'Daily', icon: Clock },
  { value: 'weekly' as const, label: 'Weekly', icon: Calendar },
  { value: 'monthly' as const, label: 'Monthly', icon: RefreshCw },
  { value: 'yearly' as const, label: 'Yearly', icon: Repeat },
];

export function RecurrenceTypeSelector({ value, onChange }: RecurrenceTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Recurrence Type
      </label>
      <div className="grid grid-cols-2 gap-2">
        {recurrenceOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.value}
              variant={value === option.value ? "default" : "outline"}
              onClick={() => onChange(option.value)}
              className="h-12 flex items-center justify-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
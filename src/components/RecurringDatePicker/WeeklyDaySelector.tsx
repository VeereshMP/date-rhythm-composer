import { WeekDay } from '@/types/recurrence';
import { Button } from '@/components/ui/button';

interface WeeklyDaySelectorProps {
  selectedDays: WeekDay[];
  onChange: (days: WeekDay[]) => void;
}

const weekDays = [
  { value: 0 as WeekDay, label: 'Sun', fullLabel: 'Sunday' },
  { value: 1 as WeekDay, label: 'Mon', fullLabel: 'Monday' },
  { value: 2 as WeekDay, label: 'Tue', fullLabel: 'Tuesday' },
  { value: 3 as WeekDay, label: 'Wed', fullLabel: 'Wednesday' },
  { value: 4 as WeekDay, label: 'Thu', fullLabel: 'Thursday' },
  { value: 5 as WeekDay, label: 'Fri', fullLabel: 'Friday' },
  { value: 6 as WeekDay, label: 'Sat', fullLabel: 'Saturday' },
];

export function WeeklyDaySelector({ selectedDays, onChange }: WeeklyDaySelectorProps) {
  const toggleDay = (day: WeekDay) => {
    const isSelected = selectedDays.includes(day);
    if (isSelected) {
      onChange(selectedDays.filter(d => d !== day));
    } else {
      onChange([...selectedDays, day].sort());
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Select Days of Week
      </label>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <Button
            key={day.value}
            variant={selectedDays.includes(day.value) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleDay(day.value)}
            className="h-10 p-1 text-xs"
            title={day.fullLabel}
          >
            {day.label}
          </Button>
        ))}
      </div>
      {selectedDays.length === 0 && (
        <p className="text-xs text-muted-foreground">
          Select at least one day of the week
        </p>
      )}
    </div>
  );
}
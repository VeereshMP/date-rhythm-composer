import { RecurrenceType } from '@/types/recurrence';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface IntervalSelectorProps {
  type: RecurrenceType;
  value: number;
  onChange: (interval: number) => void;
}

const getIntervalLabel = (type: RecurrenceType, interval: number) => {
  const unit = type === 'daily' ? 'day' : 
               type === 'weekly' ? 'week' : 
               type === 'monthly' ? 'month' : 'year';
  
  return interval === 1 ? unit : `${unit}s`;
};

export function IntervalSelector({ type, value, onChange }: IntervalSelectorProps) {
  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < 999) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 999) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Repeat Every
      </label>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDecrement}
          disabled={value <= 1}
          className="h-10 w-10 p-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={1}
          max={999}
          className="w-20 text-center"
        />
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleIncrement}
          disabled={value >= 999}
          className="h-10 w-10 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
        
        <span className="text-sm text-muted-foreground ml-2">
          {getIntervalLabel(type, value)}
        </span>
      </div>
    </div>
  );
}
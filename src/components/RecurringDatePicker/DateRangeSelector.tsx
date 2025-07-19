import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateRangeSelectorProps {
  startDate: Date;
  endDate?: Date;
  occurrences?: number;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date?: Date) => void;
  onOccurrencesChange: (occurrences?: number) => void;
}

type EndType = 'never' | 'date' | 'occurrences';

export function DateRangeSelector({
  startDate,
  endDate,
  occurrences,
  onStartDateChange,
  onEndDateChange,
  onOccurrencesChange,
}: DateRangeSelectorProps) {
  const [endType, setEndType] = useState<EndType>(
    endDate ? 'date' : occurrences ? 'occurrences' : 'never'
  );

  const handleEndTypeChange = (type: EndType) => {
    setEndType(type);
    if (type === 'never') {
      onEndDateChange(undefined);
      onOccurrencesChange(undefined);
    } else if (type === 'date') {
      onOccurrencesChange(undefined);
      if (!endDate) {
        onEndDateChange(new Date());
      }
    } else if (type === 'occurrences') {
      onEndDateChange(undefined);
      if (!occurrences) {
        onOccurrencesChange(10);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Start Date */}
      <div className="space-y-2">
        <Label htmlFor="start-date">Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => date && onStartDateChange(date)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* End Options */}
      <div className="space-y-3">
        <Label>End Options</Label>
        <RadioGroup value={endType} onValueChange={handleEndTypeChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="never" id="never" />
            <Label htmlFor="never">Never</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="date" id="end-date" />
            <Label htmlFor="end-date">On date</Label>
            {endType === 'date' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "ml-2 justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={onEndDateChange}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    disabled={(date) => date < startDate}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="occurrences" id="occurrences" />
            <Label htmlFor="occurrences">After</Label>
            {endType === 'occurrences' && (
              <div className="flex items-center space-x-2 ml-2">
                <Input
                  type="number"
                  value={occurrences || 10}
                  onChange={(e) => onOccurrencesChange(parseInt(e.target.value) || 10)}
                  min={1}
                  max={999}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">occurrences</span>
              </div>
            )}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
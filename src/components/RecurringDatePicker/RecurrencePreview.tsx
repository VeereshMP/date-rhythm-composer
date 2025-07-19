import { RecurrenceConfig, RecurrencePreviewDate } from '@/types/recurrence';
import { RecurrenceEngine } from '@/utils/recurrenceEngine';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays, Clock } from 'lucide-react';

interface RecurrencePreviewProps {
  dates: RecurrencePreviewDate[];
  config: RecurrenceConfig;
}

export function RecurrencePreview({ dates, config }: RecurrencePreviewProps) {
  const getRecurrenceDescription = () => {
    const { type, interval, weeklyDays } = config;
    
    if (type === 'daily') {
      return interval === 1 ? 'Every day' : `Every ${interval} days`;
    }
    
    if (type === 'weekly') {
      if (weeklyDays && weeklyDays.length > 0) {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const selectedDayNames = weeklyDays.map(day => dayNames[day]).join(', ');
        const weekText = interval === 1 ? 'week' : `${interval} weeks`;
        return `Every ${weekText} on ${selectedDayNames}`;
      }
      return interval === 1 ? 'Every week' : `Every ${interval} weeks`;
    }
    
    if (type === 'monthly') {
      return interval === 1 ? 'Every month' : `Every ${interval} months`;
    }
    
    if (type === 'yearly') {
      return interval === 1 ? 'Every year' : `Every ${interval} years`;
    }
    
    return 'Unknown pattern';
  };

  return (
    <div className="space-y-4">
      {/* Pattern Description */}
      <div className="flex items-center space-x-2 p-3 bg-accent rounded-lg">
        <Clock className="h-4 w-4 text-accent-foreground" />
        <span className="text-sm font-medium text-accent-foreground">
          {getRecurrenceDescription()}
        </span>
      </div>

      {/* Date List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Upcoming Dates
          </h4>
          <Badge variant="secondary" className="text-xs">
            {dates.length} dates
          </Badge>
        </div>
        
        <ScrollArea className="h-64 w-full rounded-md border">
          <div className="p-2 space-y-1">
            {dates.map((dateInfo, index) => (
              <div
                key={index}
                className={`p-3 rounded-md transition-colors ${
                  dateInfo.isToday
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {RecurrenceEngine.formatPreviewDate(dateInfo.date)}
                  </span>
                  {dateInfo.isToday && (
                    <Badge variant="secondary" className="text-xs">
                      Today
                    </Badge>
                  )}
                </div>
                <div className="text-xs opacity-75 mt-1">
                  {dateInfo.date.toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
              </div>
            ))}
            
            {dates.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                <CalendarDays className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No dates to preview</p>
                <p className="text-xs">Adjust your recurrence settings</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-lg font-bold text-foreground">{dates.length}</div>
          <div className="text-xs text-muted-foreground">Total Dates</div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-lg font-bold text-foreground">
            {config.endDate ? 'Until Date' : config.occurrences ? 'Limited' : 'Infinite'}
          </div>
          <div className="text-xs text-muted-foreground">Duration</div>
        </div>
      </div>
    </div>
  );
}
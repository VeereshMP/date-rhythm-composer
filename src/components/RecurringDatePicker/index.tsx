import { useState, useEffect } from 'react';
import { RecurrenceConfig, RecurringDatePickerProps } from '@/types/recurrence';
import { RecurrenceEngine } from '@/utils/recurrenceEngine';
import { RecurrenceTypeSelector } from './RecurrenceTypeSelector';
import { IntervalSelector } from './IntervalSelector';
import { WeeklyDaySelector } from './WeeklyDaySelector';
import { DateRangeSelector } from './DateRangeSelector';
import { RecurrencePreview } from './RecurrencePreview';
import { Card } from '@/components/ui/card';

export function RecurringDatePicker({ 
  initialConfig, 
  onRecurrenceChange,
  maxPreviewDates = 10,
  className = ''
}: RecurringDatePickerProps) {
  const [config, setConfig] = useState<RecurrenceConfig>(() => ({
    ...RecurrenceEngine.getDefaultConfig(),
    ...initialConfig
  }));

  const [previewDates, setPreviewDates] = useState(() => 
    RecurrenceEngine.generatePreviewDates(config, maxPreviewDates)
  );

  useEffect(() => {
    if (RecurrenceEngine.validateConfig(config)) {
      const newPreviewDates = RecurrenceEngine.generatePreviewDates(config, maxPreviewDates);
      setPreviewDates(newPreviewDates);
      onRecurrenceChange(config);
    }
  }, [config, maxPreviewDates, onRecurrenceChange]);

  const updateConfig = (updates: Partial<RecurrenceConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Recurrence Pattern
            </h3>
            
            <div className="space-y-4">
              <RecurrenceTypeSelector 
                value={config.type}
                onChange={(type) => updateConfig({ type })}
              />
              
              <IntervalSelector
                type={config.type}
                value={config.interval}
                onChange={(interval) => updateConfig({ interval })}
              />
              
              {config.type === 'weekly' && (
                <WeeklyDaySelector
                  selectedDays={config.weeklyDays || []}
                  onChange={(weeklyDays) => updateConfig({ weeklyDays })}
                />
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Date Range
            </h3>
            
            <DateRangeSelector
              startDate={config.startDate}
              endDate={config.endDate}
              occurrences={config.occurrences}
              onStartDateChange={(startDate) => updateConfig({ startDate })}
              onEndDateChange={(endDate) => updateConfig({ endDate, occurrences: undefined })}
              onOccurrencesChange={(occurrences) => updateConfig({ occurrences, endDate: undefined })}
            />
          </Card>
        </div>

        {/* Preview Panel */}
        <div>
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Preview
            </h3>
            
            <RecurrencePreview 
              dates={previewDates}
              config={config}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type MonthlyPattern = 'date' | 'weekday';

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Sunday = 0, Monday = 1, etc.

export interface RecurrenceConfig {
  type: RecurrenceType;
  interval: number; // Every X units (days/weeks/months/years)
  weeklyDays?: WeekDay[]; // For weekly recurrence
  monthlyPattern?: MonthlyPattern; // For monthly recurrence
  startDate: Date;
  endDate?: Date;
  occurrences?: number; // Alternative to end date
}

export interface RecurrencePreviewDate {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
}

export interface RecurringDatePickerProps {
  initialConfig?: Partial<RecurrenceConfig>;
  onRecurrenceChange: (config: RecurrenceConfig) => void;
  maxPreviewDates?: number;
  className?: string;
}
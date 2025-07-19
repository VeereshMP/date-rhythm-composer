import { RecurrenceConfig, RecurrencePreviewDate, WeekDay } from '@/types/recurrence';
import { addDays, addWeeks, addMonths, addYears, format, isSameDay, startOfDay } from 'date-fns';

export class RecurrenceEngine {
  static generatePreviewDates(
    config: RecurrenceConfig, 
    maxDates: number = 10
  ): RecurrencePreviewDate[] {
    const dates: RecurrencePreviewDate[] = [];
    const today = startOfDay(new Date());
    let currentDate = startOfDay(config.startDate);
    let count = 0;

    while (count < maxDates) {
      // Check if we've reached the end date
      if (config.endDate && currentDate > config.endDate) {
        break;
      }

      // Check if we've reached the occurrence limit
      if (config.occurrences && count >= config.occurrences) {
        break;
      }

      dates.push({
        date: new Date(currentDate),
        isToday: isSameDay(currentDate, today),
        isSelected: true,
      });

      // Calculate next date based on recurrence type
      currentDate = this.getNextRecurrenceDate(currentDate, config);
      count++;
    }

    return dates;
  }

  private static getNextRecurrenceDate(currentDate: Date, config: RecurrenceConfig): Date {
    switch (config.type) {
      case 'daily':
        return addDays(currentDate, config.interval);
      
      case 'weekly':
        if (config.weeklyDays && config.weeklyDays.length > 0) {
          return this.getNextWeeklyDate(currentDate, config.weeklyDays, config.interval);
        }
        return addWeeks(currentDate, config.interval);
      
      case 'monthly':
        return addMonths(currentDate, config.interval);
      
      case 'yearly':
        return addYears(currentDate, config.interval);
      
      default:
        return addDays(currentDate, 1);
    }
  }

  private static getNextWeeklyDate(currentDate: Date, weeklyDays: WeekDay[], interval: number): Date {
    const currentDay = currentDate.getDay() as WeekDay;
    const sortedDays = [...weeklyDays].sort((a, b) => a - b);
    
    // Find next day in current week
    const nextDayInWeek = sortedDays.find(day => day > currentDay);
    
    if (nextDayInWeek !== undefined) {
      // Next occurrence is in the same week
      const daysToAdd = nextDayInWeek - currentDay;
      return addDays(currentDate, daysToAdd);
    } else {
      // Next occurrence is in a future week
      const firstDay = sortedDays[0];
      const daysToNextWeek = (7 - currentDay) + firstDay + (7 * (interval - 1));
      return addDays(currentDate, daysToNextWeek);
    }
  }

  static formatPreviewDate(date: Date): string {
    return format(date, 'MMM d, yyyy');
  }

  static getDefaultConfig(): RecurrenceConfig {
    return {
      type: 'daily',
      interval: 1,
      startDate: new Date(),
    };
  }

  static validateConfig(config: RecurrenceConfig): boolean {
    if (config.interval < 1) return false;
    if (config.endDate && config.endDate < config.startDate) return false;
    if (config.occurrences && config.occurrences < 1) return false;
    if (config.type === 'weekly' && config.weeklyDays && config.weeklyDays.length === 0) return false;
    
    return true;
  }
}
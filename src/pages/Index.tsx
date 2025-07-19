import { RecurringDatePicker } from "@/components/RecurringDatePicker";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-accent">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Recurring Date Picker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A powerful and intuitive recurring date picker component inspired by TickTick's 
            recurring task feature. Configure complex recurrence patterns with ease.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-elegant p-8">
            <RecurringDatePicker 
              onRecurrenceChange={(config) => {
                console.log('Recurrence config:', config);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

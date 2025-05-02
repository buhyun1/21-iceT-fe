interface ICalendarProps {
  date: string;
  handleDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Calendar = ({ date, handleDate }: ICalendarProps) => {
  return (
    <div className="p-4">
      <input type="date" value={date} onChange={handleDate} />
    </div>
  );
};

export default Calendar;

const Calendar = () => {
  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div className="p-4">
      <input type="date" defaultValue={todayDate} />
    </div>
  );
};

export default Calendar;

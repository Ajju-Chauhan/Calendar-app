const EventItem = ({ title, colorIndex }) => {
  const colors = ["bg-green-200", "bg-yellow-200", "bg-pink-200", "bg-red-200"];
  
  return (
    <div className={`p-2 rounded-lg ${colors[colorIndex % colors.length]} text-gray-800`}>
      <span className="text-sm font-semibold">{title}</span>
    </div>
  );
};

export default EventItem;

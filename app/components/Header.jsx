export default function Header({ title, subtitle, children, actionButton }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      
      <div className="flex gap-3 items-center">
        {children}
        {actionButton}
      </div>
    </div>
  );
}
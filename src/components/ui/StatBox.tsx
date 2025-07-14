
interface StatBoxProps {
  value: string;
  label: string;
}

export default function StatBox({ value, label }: StatBoxProps) {
  return (
    <div className="p-6 bg-green-100 rounded shadow-md text-center">
      <h3 className="text-2xl font-bold">{value}</h3>
      <p>{label}</p>
    </div>
  );
}

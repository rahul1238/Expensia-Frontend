
interface StatBoxProps {
  value: string;
  label: string;
}

export default function StatBox({ value, label }: StatBoxProps) {
  return (
    <div className="p-6 bg-green-100 dark:bg-green-900 rounded shadow-md text-center">
      <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
      <p className="dark:text-gray-300">{label}</p>
    </div>
  );
}

export default function DiseaseList({ diseases }: { diseases: { name: string }[] }) {
  return (
    <ul className="bg-white shadow rounded-lg p-4">
      {diseases.map((d, i) => (
        <li key={i} className="border-b py-2">{d.name}</li>
      ))}
    </ul>
  );
}

export default function InventoryItems({ params }: { params: { id: number } }) {
  return <span>{params.id}</span>;
}

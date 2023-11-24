export default async function Artist({ params }: { params: { id: string } }) {
  return <main className="">Artist: {params.id}</main>;
}

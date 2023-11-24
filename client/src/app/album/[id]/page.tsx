export default async function Album({ params }: { params: { id: string } }) {
  return <main className="">Album: {params.id}</main>;
}

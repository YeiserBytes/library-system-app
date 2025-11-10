export default function HeaderPage({ title, description }: { title: string, description: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </header>
  );
}

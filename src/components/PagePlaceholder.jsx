export default function PagePlaceholder({ title }) {
  return (
    <main className="container py-5">
      <h1 className="h3">{title}</h1>
      <p className="text-muted">Page en construction. Le contenu sera ajouté prochainement.</p>
    </main>
  );
}

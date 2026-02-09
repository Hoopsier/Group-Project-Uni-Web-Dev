import CategoryPill from "./CategoryPill";

export default function CategoryRow({ categories, activeId, onChange }) {
  return (
    <section className="flex flex-wrap gap-6 items-start">
      {categories.map((c) => (
        <CategoryPill
          key={c.id}
          icon={c.icon}
          label={c.label}
          isActive={c.id === activeId}
          onClick={() => onChange?.(c.id)}
        />
      ))}
    </section>
  );
}

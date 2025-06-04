interface ICategoryBox {
  name: string;
  className?: string;
}

export const CategoryBox = ({ name, className = '' }: ICategoryBox) => {
  return (
    <div
      className={`inline-block bg-category border border-border-focused rounded-2xl px-2 py-1 text-sm ${className}`}
    >
      {name}
    </div>
  );
};

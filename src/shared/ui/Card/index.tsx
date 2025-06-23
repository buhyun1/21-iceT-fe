interface ICardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Card = ({ className = '', children, onClick }: ICardProps) => (
  <div onClick={onClick} className={`bg-surface rounded-xl border-1 border-border ${className}`}>
    {children}
  </div>
);

export default Card;

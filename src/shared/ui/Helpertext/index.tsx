interface IHelpertextProps {
  text: string;
  className?: string;
}

const Helpertext = ({ text, className = '' }: IHelpertextProps) => {
  return <p className={`text-text-error text-xs h-8 ${className}`}>{text}</p>;
};

export default Helpertext;

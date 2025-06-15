interface IEditIcon {
  className?: string;
  color?: string;
  onClick: () => void;
}

const EditIcon = ({ className = 'w-5 h-5', color = 'currentColor', onClick }: IEditIcon) => (
  <svg onClick={onClick} className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 20H21M16.5 3.5C17.3284 2.67157 18.6716 2.67157 19.5 3.5C20.3284 4.32843 20.3284 5.67157 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EditIcon;

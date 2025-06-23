interface ICommentCount {
  commentCount: number;
}

const CommentCountBox = ({ commentCount }: ICommentCount) => {
  return (
    <div className="flex items-center gap-4">
      {' '}
      <svg
        className="w-5 h-5 transition-colors duration-200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span className="font-medium transition-colors duration-200">{commentCount}</span>
    </div>
  );
};

export default CommentCountBox;

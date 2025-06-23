import MDEditor from '@uiw/react-md-editor';

interface IPostContentProps {
  content: string;
}

const PostContent = ({ content }: IPostContentProps) => {
  return (
    <div className="py-6">
      <MDEditor.Markdown source={content} />
    </div>
  );
};

export default PostContent;

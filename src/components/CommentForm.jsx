import React, { useState, ChangeEvent } from 'react';

const CommentForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('comments');
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddComment = () => {
    if (title && body) {
      const newComment = { title, body };
      setComments((prev) => {
        const updated = [...prev, newComment];
        localStorage.setItem('comments', JSON.stringify(updated));
        return updated;
      });
      setTitle('');
      setBody('');
    }
  };

  const handleUpdateComment = () => {
    if (editIndex !== null && title && body) {
      const updatedComments = [...comments];
      updatedComments[editIndex] = { title, body };
      setComments(updatedComments);
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      setEditIndex(null);
      setTitle('');
      setBody('');
    }
  };

  const handleEdit = (index) => {
    setTitle(comments[index].title);
    setBody(comments[index].body);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <div>
      <h1>Comment Form</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={handleBodyChange}
      />
      {editIndex !== null ? (
        <button onClick={handleUpdateComment}>Update</button>
      ) : (
        <button onClick={handleAddComment}>Add Comment</button>
      )}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <h3>{comment.title}</h3>
            <p>{comment.body}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentForm;

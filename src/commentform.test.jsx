import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentForm from './components/CommentForm';

describe('CommentForm', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
          store[key] = value;
        },
        clear: () => {
          store = {};
        },
        removeItem: (key) => {
          delete store[key];
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByRole } = render(<CommentForm />);
    expect(getByPlaceholderText('Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Body')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Add Comment' })).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const { getByPlaceholderText } = render(<CommentForm />);
    const titleInput = getByPlaceholderText('Title');
    const bodyInput = getByPlaceholderText('Body');

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(bodyInput, { target: { value: 'New Body' } });

    expect(titleInput.value).toBe('New Title');
    expect(bodyInput.value).toBe('New Body');
  });

  it('submits the form and stores comment in localStorage', () => {
    const { getByPlaceholderText, getByRole } = render(<CommentForm />);
    const titleInput = getByPlaceholderText('Title');
    const bodyInput = getByPlaceholderText('Body');
    const addButton = getByRole('button', { name: 'Add Comment' });

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(bodyInput, { target: { value: 'New Body' } });

    // Simulate form submission
    fireEvent.click(addButton);

    // Check if the comment is stored in localStorage
    const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    expect(storedComments).toEqual([{ title: 'New Title', body: 'New Body' }]);
  });
});

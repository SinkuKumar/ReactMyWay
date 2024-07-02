import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  test('initial count is 0', () => {
    render(<App />);
    const countElement = screen.getByText('0');
    expect(countElement).toBeInTheDocument();
  });

  test('increments count by 1 when increment button is clicked', () => {
    render(<App />);
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('decrements count by 1 when decrement button is clicked', () => {
    render(<App />);
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');

    fireEvent.click(incrementButton); // Increment once to avoid going negative
    fireEvent.click(decrementButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('displays correct count after multiple button clicks', () => {
    render(<App />);
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

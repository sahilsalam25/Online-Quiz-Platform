import { render, screen } from '@testing-library/react';
import App from './App';

test('renders create your quiz heading', () => {

  render(<App />);

  const headingElement = screen.getByText(/create your quiz/i);
  expect(headingElement).toBeInTheDocument();
});


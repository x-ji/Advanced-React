import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Pagination from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';

describe('<Pagination/>', () => {
  it('displays a loading message', () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>
    );
    expect(container).toHaveTextContent('Loading...');
  });

  it('renders pagination for 18 items', async () => {
    // 4 per page, will end up with 5 pages in total.
    // Need to pass in a specific page
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    // Wait for the thing to have finished transitioning before moving on to the next step.
    await screen.findByTestId('pagination');
    // It's fine even when the text is broken in multiple lines
    expect(container).toHaveTextContent('Page 1 of 9');
    // Seems that excessive usage of test ids is not such a smart approach in the end.
    const pageCountSpan = screen.getByTestId('pageCount');

    // You can debug one single element via this command as well.
    screen.debug(pageCountSpan);

    expect(pageCountSpan).toHaveTextContent('9');
    expect(container).toMatchSnapshot();
  });

  it('disables the prev page on the first page', async () => {
    // Need to pass in a specific page
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    // We can actually just pass in a Regex in this case!
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });

  it('disables the next page on the last page', async () => {
    // Need to pass in a specific page
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={9} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    // We can actually just pass in a Regex in this case!
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('disables all the buttons on a normal page', async () => {
    // Need to pass in a specific page
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={4} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    // We can actually just pass in a Regex in this case!
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
});

import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import Router from 'next/router'; // Gonna mock this out
import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from '../components/CreateProudct';
import { fakeItem, makePaginationMocksFor } from '../lib/testUtils';
import { ALL_PRODUCTS_QUERY } from '../components/Products';

const item = fakeItem();

// Mocking the entire package.
jest.mock('next/router', () => ({
  // Creates a mock function
  push: jest.fn(),
}));

describe('<CreateProduct/>', () => {
  it('renders and matches snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('handles the updating', async () => {
    // Render the form
    const { container, debug } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );

    // Type into boxes
    await userEvent.type(screen.getByPlaceholderText(/Name/i, item.name));
    // You have to type a string, so we converted the type.
    await userEvent.type(
      screen.getByPlaceholderText(/Price/i, item.price.toString())
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Description/i, item.description)
    );

    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });

  it('creates the items when the form is submitted', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: item.name,
            description: item.description,
            image: '',
            price: item.price,
          },
        },
        result: {
          data: {
            createProduct: {
              ...item,
              id: 'abc123',
              __typename: 'Item',
            },
          },
        },
      },
      {
        request: {
          query: ALL_PRODUCTS_QUERY,
          variables: { skip: 0, first: 2 },
        },
        result: { data: { allProducts: [item] } },
      },
    ];

    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );

    // Type into boxes
    await userEvent.type(screen.getByPlaceholderText(/Name/i, item.name));
    await userEvent.type(
      screen.getByPlaceholderText(/Price/i, item.price.toString())
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Description/i, item.description)
    );

    // Submit
    await userEvent.click(screen.getByText(/Add Product/));
    await waitFor(() => wait(0));
    expect(Router.push).toHaveBeenCalled();
    expect(Router.push).toHaveBeenCalledWith({ pathname: 'products/123' });
  });
});

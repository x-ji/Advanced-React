import { render, screen } from '@testing-library/react';
import { fakeItem } from '../lib/testUtils';
import { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { MockedProvider } from '@apollo/react-testing';

import SingleProduct from '../components/SingleProduct';

const product = fakeItem();

const mocks = [
  {
    // When somebody requests this query + variable
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: { id: '123' },
    },
    // return this data
    result: {
      data: {
        Product: product,
      },
    },
  },
];

describe('<Single Product/>', () => {
  it('renders with proper data', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    // We can't render immediately, since the default page shows "Loading..." Needs to await
    // The default is to wait for 3 seconds, before the test would fail.
    await screen.findByTestId('singleProduct');
    debug();
  });
});

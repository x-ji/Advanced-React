// screen is like the browser window, but has helper methods that make selecting elements easy.
import { render, screen } from '@testing-library/react';
// Comes with Apollo already
// Just wrap this around every component.
import { MockedProvider } from '@apollo/react-testing';

import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

describe('<Product/>', () => {
  // React testing library will render the component and process API to access and test the inside of that component.
  // This is about the contents being rendered in the app, not anything else that much is obvious then.
  // This is kinda like component test then. Ha.
  it('renders out the price tag and title', () => {
    // So apparently we just simply pass in the paragraph tag into the `render` call from the testing library
    // This debug function always comes with `render`
    // It renders the actual component markup.
    // const { container, debug } = render(<p>adsf</p>);

    // In this case, since we also have an apollo provider for the whole app, we need to include that thing.
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // Note that the toBeInTheDocument thing comes from jest-dom!
    const priceTag = screen.getByText('$50');
    expect(screen.getByText('$50')).toBeInTheDocument();
    // We can also just simply querySelector on the container itself lol
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/product/abc123');
    expect(link).toHaveTextContent(product.name);
  });

  it('renders and matches the snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders the image properly', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );

    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
  });
});

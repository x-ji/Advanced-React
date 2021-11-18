import { render, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('Renders', () => {
    render(<CartCount count={10} />);
  });
  it('Matches snapshot', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });
  it('updates via props', async () => {
    // We get the rerender function, which can be called with the props we want to update, which then rerenders the component out there. Ha.
    const { container, rerender } = render(<CartCount count={11} />);

    // textContent is just a property on a node.
    // expect(container.textContent).toBe('11');
    // You may say that those do the same thing.
    // Just something that comes with the React library
    expect(container).toHaveTextContent('11');
    rerender(<CartCount count="12" />);
    // We just need to wait it out here.
    // Two ways to wait, under the "waiting for appearance" section.

    // Before the wait they actually have both, so that we can animate the content.
    expect(container).toHaveTextContent('1211');
    // This is an explicit wait with a time interval.
    await wait(400);

    // This has a default timeout of 3 seconds.
    // await screen.findByText('12');
    expect(container).toHaveTextContent('12');
    expect(container).toMatchSnapshot();
  });
});

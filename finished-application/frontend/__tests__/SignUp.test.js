import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
// Also the same for other frameworks
import userEvent from '@testing-library/user-event';
import Signup, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_UESR_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const user = fakeUser();
const password = 'wes';

// Mocking a mutation
const mocks = [
  // Mutation mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: user.name,
        email: user.email,
        password: password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: user.email,
          name: user.name,
        },
      },
    },
  },
  // Current user mock
  {
    request: { query: CURRENT_UESR_QUERY },
    result: { data: { authenticatedItem: user } },
  },
];

describe('<SignUp/>', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <Signup />
      </MockedProvider>
    );

    // Here is the userevent part!
    // The idea is to get it via the label or the placeholder, i.e. something the user actually sees
    await userEvent.type(screen.getByPlaceholderText(/name/i), user.name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), user.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);

    await userEvent.click(screen.getByText('Sign Up!'));

    // This is basically to see if the expected output shows up.
    await screen.findByText(
      `Signed up with ${user.email} - Please Go Ahead and Sign in!`
    );
  });
});

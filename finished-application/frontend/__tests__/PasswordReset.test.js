import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
// Also the same for other frameworks
import userEvent from '@testing-library/user-event';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

// const mocks =

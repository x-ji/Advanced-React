import PropTypes from 'prop-types';
import Header from './Header.jsx';

export default function Page({ children }) {
  return (
    <div>
      <Header></Header>
      <h2>Page component</h2>
      {children}
    </div>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

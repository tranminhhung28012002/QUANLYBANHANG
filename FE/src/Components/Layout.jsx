import PropTypes from "prop-types";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="relative">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;

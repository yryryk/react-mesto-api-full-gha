import {Outlet} from 'react-router-dom';

function Header() {
  return (
  <header className="header">
    <div className="header__logo"></div>
    <div className="header__user-state">
      <Outlet />
    </div>
  </header>
  );
}

export default Header;

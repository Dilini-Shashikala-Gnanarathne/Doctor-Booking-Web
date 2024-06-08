import { useEffect, useRef, useContext } from 'react';
import logo from '../../assets/images/logo.png';
import { NavLink, Link } from 'react-router-dom';
import { BiMenu, BiX } from "react-icons/bi"; // BiX for the close icon
import { authContext } from '../../context/AuthContext';

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/doctors', display: 'Find a doctor' },
  { path: '/services', display: 'Services' },
  { path: '/contact', display: 'Contact' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  useEffect(() => {
    const handleStickyHeader = () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    };
    
    window.addEventListener('scroll', handleStickyHeader);
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  return (
    <header className='header flex items-center' ref={headerRef}>
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/*============== logo ================= */}
          <div>
            <img src={logo} alt="Logo" />
          </div>

          {/*============== menu ================= */}
          <div className='navigation' ref={menuRef}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={navClass =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                    onClick={toggleMenu} // Close menu on link click
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
            {/* Close icon */}
            <BiX className='close__icon w-6 h-6' onClick={toggleMenu} />
          </div>
          {/*============== menu ================= */}

          <div className='flex items-center gap-4'>
            {token && user ? (
              <div>
                <Link to={`${role === 'doctor' ? 'doctors/profile/me' : 'users/profile/me'}`}>
                  <figure className='w-[35px] h-[35px] rounded-full'>
                    <img src={user?.photo} className='w-full rounded-full' alt='User' />
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to='/login'>
                <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                  Login
                </button>
              </Link>
            )}

            <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

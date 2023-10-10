import Link from 'next/link';
import {
  FiHome,
  FiUsers,
  FiDatabase,
  FiPlus,
  FiUser,
  FiSettings,
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState('/admin/dashboard');

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      setActiveLink(url);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const NavItem = ({ href, isActive, onClick, children }) => {
    return (
      <Link href={href}>
        <motion.a
          className={isActive ? 'nav-link active' : 'nav-link'}
          onClick={() => onClick(href)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {children}
        </motion.a>
      </Link>
    );
  };

  return (
    <aside className="text-white p-4">
      <NavItem
        href="/admin/dashboard"
        isActive={activeLink === '/admin/dashboard'}
        onClick={handleLinkClick}
      >
        <FiHome className="nav-icon" />
        Dashboard
      </NavItem>
      <NavItem
        href="/admin/details"
        isActive={activeLink === '/admin/details'}
        onClick={handleLinkClick}
      >
        <FiDatabase className="nav-icon" />
        Interns
      </NavItem>
      <NavItem
        href="/admin/user"
        isActive={activeLink === '/admin/user'}
        onClick={handleLinkClick}
      >
        <FiUsers className="nav-icon" />
        Users
      </NavItem>
      <NavItem
        href="/admin/all"
        isActive={activeLink === '/admin/all'}
        onClick={handleLinkClick}
      >
        <FiDatabase className="nav-icon" />
        All Courses,Universities,Departments
      </NavItem>
      <NavItem
        href="/admin/newintern"
        isActive={activeLink === '/admin/newintern'}
        onClick={handleLinkClick}
      >
        <FiUser className="nav-icon" />
        Add Intern
      </NavItem>
      <NavItem
        href="/admin/add"
        isActive={activeLink === '/admin/add'}
        onClick={handleLinkClick}
      >
        <FiPlus className="nav-icon" />
        Add Departments, Courses, Universities
      </NavItem>
      <NavItem
        href="/admin/createu"
        isActive={activeLink === '/admin/createu'}
        onClick={handleLinkClick}
      >
        <FiUser className="nav-icon" />
        Create User
      </NavItem>
      <NavItem
        href="/admin/profile"
        isActive={activeLink === '/admin/profile'}
        onClick={handleLinkClick}
      >
        <FiSettings className="nav-icon" />
        Profile
      </NavItem>
    </aside>
  );
}

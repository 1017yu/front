import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_NAV_ITEMS } from '@/data/constants';

const AdminNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex h-[56px] w-full items-center justify-between bg-white pr-3 sm:h-full sm:w-[200px] sm:min-w-[200px] sm:flex-col sm:px-5 sm:py-10">
      <Link to="/">
        <img src="/popple.jpg" alt="main-logo" className="h-10" />
      </Link>
      <ul className="flex gap-5 sm:mt-10 sm:flex sm:w-full sm:flex-col sm:gap-5">
        {ADMIN_NAV_ITEMS.map((item) => (
          <li
            key={item.label}
            className={`${
              path === item.href
                ? 'sm:bg-accent sm:text-white'
                : 'sm:bg-white sm:text-black'
            } sm:container sm:rounded-lg sm:py-2`}
          >
            <Link to={item.href} className="px-2 text-sm sm:px-3 sm:text-base">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNav;

import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_NAV_ITEMS } from '@/constants/constants';

const AdminNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="h-full w-[200px] min-w-[200px] bg-white px-5 py-10">
      <Link to="/">
        <img src="/popple.jpg" alt="main-logo" className="h-10" />
      </Link>
      <ul className="mt-10 flex flex-col gap-5">
        {ADMIN_NAV_ITEMS.map((item) => (
          <li
            key={item.label}
            className={`${
              path === item.href
                ? 'bg-accent text-white'
                : 'bg-white text-black'
            } container  rounded-lg py-2`}
          >
            <Link to={item.href} className="px-3">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNav;

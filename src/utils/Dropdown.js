import React from 'react';
import {FaUserAlt, FaHistory} from 'react-icons/fa';
import {MdDashboard} from 'react-icons/md';

export const dropdownList = [
    {
        id: 1,
        title: "Profile",
        icon: <FaUserAlt className="icon" />,
        link: "/profile"
    },
    {
        id: 2,
        title: "History",
        icon: <FaHistory className="icon" />,
        link: "/history"
    },
    {
        id: 3,
        title: "Go to dashboard",
        icon: <MdDashboard className="icon" />,
        link: "/dashboard"
    }
];
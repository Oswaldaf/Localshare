import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { MdGroups2 } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaBars } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";

export const SideBar = [
    
    {
        title: 'Dashboard',
        path: "/Dashbord",
        icon: <IoHomeSharp />,
        cName: 'nav-text'
    },
    {
        title: 'Groups',
        path: "/groups",
        icon: <MdGroups2 />,
        cName: 'nav-text'
    },
    {
        title: 'Files',
        path: "/files",
        icon: <GoFileDirectoryFill />,
        cName: 'nav-text'
    },
]
// function SideBar() {
//   return (
//     <div>SideBar</div>
//   )
// }

export default SideBar
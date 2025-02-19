"use client";

import { ChevronDownIcon, EditIcon, SidebarIcon, UserIcon } from "lucide-react";
import React, { useState } from "react";
import Models from "./Models";
import useAppStore from "../store/useAppStore";
import clsx from "clsx";
import Link from "next/link";

const Header = () => {
  const [openModels, setOpenModels] = useState(false);
  const { currentModel, setOpenSidebar } = useAppStore();

  return (
    <header className="p-4 sticky inset-x-0 top-0 bg-black  mx-auto  ">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-x-2">
          <button
            onClick={() => setOpenSidebar(true)}
            className="cursor-pointer md:hidden"
          >
            <SidebarIcon className="size-6" />
          </button>
          <Link href={"/"} className="cursor-pointer md:hidden">
            <EditIcon className="size-6" />
          </Link>
          <div className="ml-1 -mt-1">
            <button
              onClick={() => setOpenModels(!openModels)}
              className="cursor-pointer flex gap-1 items-center"
            >
              <span className="text-lg font-bold">{currentModel.name}</span>
              <ChevronDownIcon
                className={clsx(
                  "transition-transform",
                  openModels ? "rotate-180" : ""
                )}
              />
            </button>
            {/* <button className="text-sm cursor-pointer">Set as default</button> */}
          </div>
        </div>
        {/* <div>
          <UserIcon />
        </div> */}
      </div>
      <Models isOpen={openModels} closeModels={() => setOpenModels(false)} />
    </header>
  );
};

export default Header;

"use client";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import useAppStore from "../store/useAppStore";

const MobileSidebar = () => {
  const { openSidebar, setOpenSidebar } = useAppStore();
  const popupRef = useRef(null);

  const sidebarVariants = {
    open: { x: 0 }, // Fully visible
    closed: { x: "-100%" }, // Hidden off-screen to the left
  };

  useEffect(() => {
    // This function will handle clicks outside the popup
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenSidebar(false);
      }
    };

    // Add event listener to detect clicks outside
    if (openSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount or when popup is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSidebar]);

  return (
    <AnimatePresence>
      {openSidebar && (
        <div className="md:hidden fixed inset-0 bottom-0 bg-black/60  z-20">
          <motion.div
            ref={popupRef}
            initial="closed"
            animate={openSidebar ? "open" : "closed"}
            variants={sidebarVariants}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <Sidebar className="absolute top-0 bottom-0 bg-black/60 backdrop-blur-md w-[300px] border-r border-r-gray-500" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;

import React, { useEffect, useRef } from "react";
import useAppStore from "../store/useAppStore";
import { InfoIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const Models = ({ isOpen, closeModels }) => {
  const { models, setCurrentModel, currentModel } = useAppStore();
  const popupRef = useRef(null);

  useEffect(() => {
    // This function will handle clicks outside the popup
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closeModels();
      }
    };

    // Add event listener to detect clicks outside
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount or when popup is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, left: "8px" }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div
            ref={popupRef}
            className="absolute p-3 border rounded-md bg-black z-20"
          >
            <h1 className="font-bold">Models</h1>

            <div className="mt-2">
              <ul className="grid gap-1 w-full">
                {models.map((model) => {
                  return (
                    <li key={`mode-${model.id}`} className="w-full">
                      <button
                        onClick={() => {
                          setCurrentModel(model);
                          closeModels();
                        }}
                        className={clsx(
                          "w-full flex p-2 hover:bg-purple-500 cursor-pointer rounded-md transition-colors duration-300",
                          model.id === currentModel.id ? "bg-purple-500" : ""
                        )}
                      >
                        <div className="flex flex-col items-start justify-start">
                          <h2 className="font-bold ">{model.name}</h2>
                          <p className="text-sm text-left">
                            {model.description}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Models;

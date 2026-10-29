import "../index.css";
import { useState, useEffect } from "react";
import { IoMdAlert } from "react-icons/io";
import { MdOutlineDoneOutline } from "react-icons/md";

import { IoWarning } from "react-icons/io5";

const setAlertType = (type) => {
  switch (type) {
    case "success":
      setIcon(<MdOutlineDoneOutline />);
      setType("bg-green-500");
      break;
    case "error":
      setIcon(<IoMdAlert />);
      setType("bg-red-500");
      break;
    case "warning":
      setIcon(<IoWarning />);
      setType("bg-yellow-500");
      break;
    default:
      setType("bg-green-500");
  }
};

export function Alert({ message, type }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(!isVisible);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const setAlertType =
    type === "error"
      ? "bg-red-500"
      : type === "success"
        ? "bg-green-500"
        : type === "warning"
          ? "bg-yellow-500"
          : "bg-blue-500";
  const setAlertIcon =
    type === "error" ? (
      <IoMdAlert />
    ) : type === "success" ? (
      <MdOutlineDoneOutline />
    ) : type === "warning" ? (
      <IoWarning />
    ) : null;

  return (
    <>
      <div
        className={`absolute top-6  left-1/2 -translate-x-1/2  ${setAlertType} px-8  py-3 ${status ? "block" : "hidden"} text-white font-bold rounded-md shadow-md m-auto duration-500 ease-in-out flex justify-center items-center gap-2`}
        role="alert"
      >
        {setAlertIcon} {message}
      </div>
    </>
  );
}

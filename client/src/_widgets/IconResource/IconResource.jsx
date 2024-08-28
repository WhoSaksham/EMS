import { FaFilter } from "react-icons/fa";
import { FaRegEnvelopeOpen, FaUsers } from "react-icons/fa6";
import { IoIosLogOut, IoMdMenu } from "react-icons/io";
import { IoArrowBackOutline, IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { LuFileEdit } from "react-icons/lu";
import { MdDeleteSweep, MdOutlineAssignmentTurnedIn, MdOutlineRecentActors } from "react-icons/md";
import Loader from "react-spinners/ClipLoader";

const IconResource = ({ type, size = 20, ...props }) => {
  switch (type) {
    case "loader":
      return <Loader color='var(--primary)' size={14} />;
    case "users":
      return <FaUsers size={size} {...props} />;
    case "menu":
      return <IoMdMenu size={size} {...props} />;
    case "back":
      return <IoArrowBackOutline size={size} {...props} />;
    case "envelope":
      return <FaRegEnvelopeOpen size={size} {...props} />;
    case "lock":
      return <IoLockClosedOutline size={size} {...props} />;
    case "unlock":
      return <IoLockOpenOutline size={size} {...props} />;
    case "logout":
      return <IoIosLogOut size={size} {...props} />;
    case "envelop":
      return <FaRegEnvelopeOpen size={size} {...props} />;
    case "departments":
      return <MdOutlineRecentActors size={size} {...props} />;
    case "edit":
      return <LuFileEdit size={size} {...props} />;
    case "delete":
      return <MdDeleteSweep color='var(--fail)' size={size} {...props} />;
    case "assign":
      return <MdOutlineAssignmentTurnedIn size={size} {...props} />;
    case "filter":
      return <FaFilter size={size} {...props} />;
    default:
      return null;
  }
};

export default IconResource;

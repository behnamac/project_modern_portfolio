import Sidebar from "../Sidebar/Sidebar";
import "./navbar.scss";
import { motion } from "framer-motion";

const spanAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};
const NavBar = () => {
  return (
    <div className="navbar">
      <Sidebar />
      <div className="wrapper">
        <motion.span
          initial={spanAnimation.initial}
          animate={spanAnimation.animate}
          transition={spanAnimation.duration}
        >
          Behnam Sepehri's Official website
        </motion.span>
        <div className="social">
          <a href="#">
            <img alt="insta" src="public\facebook.png" />
          </a>
          <a href="#">
            <img alt="insta" src="public\facebook.png" />
          </a>
          <a href="#">
            <img alt="insta" src="public\facebook.png" />
          </a>
          <a href="#">
            <img alt="insta" src="public\facebook.png" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

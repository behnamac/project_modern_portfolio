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
      <div className="wrapper">
      <Sidebar />
        <motion.span
          initial={spanAnimation.initial}
          animate={spanAnimation.animate}
          transition={spanAnimation.duration}
        >
          Welcome to my Official website
        </motion.span>
        <div className="social">
          <a href="#">
            <img alt="instagram" src='/insta.svg' />
          </a>
          <a href="#">
            <img alt="facebook" src='/facebook.svg' />
          </a>
          <a href="#">
            <img alt="linkedin" src='/linkedin.svg' />
          </a>
          <a href="#">
            <img alt="twitter" src= '/x.svg' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

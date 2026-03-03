import { useState } from "react";
import "./Sidebar.css";
function Sidebar() {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      {!open && (
        <span variant="" onClick={handleToggle} className="toggle-btn ">
          <i className="fa-solid fa-angles-right"></i>
        </span>
      )}
      <aside className={`sidebar ${open ? "open" : ""} `}>
        {open && (
          <div className="sidebar-inner ">
            <span
              variant="light"
              onClick={handleToggle}
              className="mb-3 tog-close-btn "
            >
              <i className="fa-solid fa-angles-left"></i>
            </span>
            <h2>heloooooo</h2>
            <hr />
            <ul>
              <li>fffffffffffffff</li>
              <li>fffffffffffffff</li>
              <li>fffffffffffffff</li>
              <li>fffffffffffffffffffffffffffffffffffffff</li>
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}

export default Sidebar;

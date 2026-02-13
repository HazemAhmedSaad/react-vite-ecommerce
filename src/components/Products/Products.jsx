import { useState } from "react";
import { Button, ListGroup, Container } from "react-bootstrap";
import "./Products.css";

export default function Products() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="products-wrapper">
      <div className="products-content">
        {/* Sidebar */}
        <div className={`  sidebar ${open ? "open" : ""}`}>
          <div className="side-fixed">
            {open && (
              <div className="sidebar-inner">
                <Button variant="light" onClick={handleToggle} className="mb-3">
                  <i className="fa-solid fa-angles-left"></i>
                </Button>
                <hr />

                <ListGroup variant="flush">
                  {["Inbox", "Starred", "Send email", "Drafts"].map((item) => (
                    <ListGroup.Item action key={item}>
                      {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <hr />

                <ListGroup variant="flush">
                  {["All mail", "Trash", "Spam", "More", "Trash", "Spam"].map((item) => (
                    <ListGroup.Item action key={item}>
                      {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <Container fluid className="main-content container">
          {!open && (
            <span variant="" onClick={handleToggle} className="toggle-btn ">
              <i className="fa-solid fa-angles-right"></i>
            </span>
          )}
          <h1>Hazem</h1>
          <p>Welcome to Products Page</p>
          <div>Scroll Content Example</div> <h1>Hazem</h1>
          <p>Welcome to Products Page</p>
          <div>Scroll Content Example</div> <h1>Hazem</h1>

        </Container>
      </div>
    </div>
  );
}

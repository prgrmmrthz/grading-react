import React, {useState } from "react";
import { Button, Dropdown, FormControl } from "react-bootstrap";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

  <Button variant="link"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </Button>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().includes(value)
          )}
        </ul>
      </div>
    );
  }
);

const MyDropDown = ({options,handleOnSelect, btnTitle}) => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {btnTitle}
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          {options.map((o) => (
            <Dropdown.Item onClick={(event)=>handleOnSelect(o)} eventKey={o.id}>{o.name.toString().toUpperCase()}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default MyDropDown;

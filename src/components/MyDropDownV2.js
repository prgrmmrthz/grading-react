import { useState, createRef } from "react";
import { Button, Dropdown, Form, FormControl, Table } from "react-bootstrap";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";

const MyDropDownV2 = ({ options, handleSearch, loading, placeholder, handleSelect, disabled }) => {
  const ref=createRef();
  const filterBy = () => true;
  const [singleSelections, setSingleSelections] = useState([]);

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={loading}
      labelKey="name"
      minLength={1}
      onSearch={handleSearch}
      options={options}
      size='small'
      placeholder={placeholder}
      disabled={disabled}
      ref={ref}
      renderMenuItemChildren={(option, props) => (
        <div>
          {option.name}
          <div>
            <small>LRN: {option.lrn}</small>
          </div>
        </div>
      )}
      onChange={(selected) => {
        if(selected[0]){
          handleSelect(selected);
          ref.current.clear();
        }
      }}
    />
  );
};

export default MyDropDownV2;

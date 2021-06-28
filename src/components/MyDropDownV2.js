import { useState, Fragment } from "react";
import { Button, Dropdown, Form, FormControl, Table } from "react-bootstrap";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";

const MyDropDownV2 = ({ options, handleSearch, loading }) => {
  const filterBy = () => true;
  const [singleSelections, setSingleSelections] = useState([]);

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={loading}
      labelKey="name"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for Student | LRN"
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <span>{option.name}</span>
        </Fragment>
      )}
    />
  );
};

export default MyDropDownV2;

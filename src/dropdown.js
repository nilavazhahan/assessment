import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { schemaOptions } from "./constant";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddSchemaDropdown = ({
  isLinkClicked,
  selectedValue,
  setSelectedValue,
  setIsLinkClicked,
}) => {
  const handleDropdownChange = (schema) => {
    setSelectedValue(schema?.Label);
    setIsLinkClicked(false);
  };
  return (
    <div className="add-schema-dropdown">
      <Dropdown>
        <Dropdown.Toggle id="schemaDropdown">
          {selectedValue && !isLinkClicked
            ? `${selectedValue}`
            : "Add Schema to Segment"}

          <FontAwesomeIcon icon={faChevronDown} className="custom-icon"/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {schemaOptions.map((list) => (
            <Dropdown.Item>
              <option value={list?.Label} onClick={() => handleDropdownChange(list)}>
                {list?.Label}
              </option>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export const SchemaDropDown = ({ schema }) => {
  return (
    <div className="individual-schema-dropdown">
      <Dropdown>
        <Dropdown.Toggle id="individualSchemaDropdown">
          {schema}
          <FontAwesomeIcon icon={faChevronDown} className="custom-icon"/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <option value={schema}>{schema}</option>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

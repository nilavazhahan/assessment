import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { groupTraits, schemaOptions } from "./constant";
import { AddSchemaDropdown, SchemaDropDown } from "./dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faMinus } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "./api";

const SavingSegmantModal = ({ isPopupOpen, setIsPopupOpen }) => {
  // Text box State
  const [inputValue, setInputValue] = useState("");
  //Bluebox State
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  // Dropdown State
  const [selectedValue, setSelectedValue] = useState("");
  // Link state
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (
      isLinkClicked &&
      selectedValue?.length > 0 &&
      selectedValue !== schemaOptions[0]?.Value
    ) {
      setSelectedSchemas([...selectedSchemas, selectedValue]);
    }
  }, [selectedValue, isLinkClicked]);

  const removeAllSchema = () => {
    setSelectedSchemas([]);
  };
  const handleRemove = (removeSchema) => {
    const newSchemas = selectedSchemas.filter(
      (schema) => schema !== removeSchema
    );
    setSelectedSchemas(newSchemas);
  };

  const handleLink = () => {
    setIsLinkClicked(true);
  };

  // ModalFooter Button functions
  const handleSave = () => {
    const segmentName = inputValue;

    const getObjectsForSelectedSchemas = (selectedSchemas, schemaOptions) => {
      return selectedSchemas.map((schemaLabel) => {
        const correspondingObject = schemaOptions.find(
          (option) => option.Label === schemaLabel
        );
        const { Label } = correspondingObject;
        return correspondingObject
          ? { [correspondingObject.Value]: correspondingObject.Label }
          : null;
      });
    };

    const selectedSchemasObjects = getObjectsForSelectedSchemas(
      selectedSchemas,
      schemaOptions
    );
    const schemaData = selectedSchemasObjects;

    const requestData = {
      segment_name: segmentName,
      schema: schemaData,
    };
    //API Call
    if (requestData?.segment_name && requestData?.schema?.length > 0) {
      fetchData(requestData);
    }
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Modal
        show={isPopupOpen}
        animation={false}
        dialogClassName="custom-modal"
      >
        <Modal.Header>
          <Modal.Title>
            <div className="modal-header-title">
              <FontAwesomeIcon icon={faChevronLeft} />
              <p>Saving Segment</p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content">
            <div className="text-box">
              <label htmlFor="myTextBox">Enter the Name of the Segment</label>
              <input
                type="text"
                id="TextBox"
                placeholder="Name of the Segment"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            <p>
              To save your segment, you need to add the schemas to build the
              query
            </p>

            <div className="traits">
              <div className="user-traits">
                <div className="color-point user"></div>-User Traits
              </div>
              <div className="group-traits">
                <div className="color-point group"></div>-Group Traits
              </div>
            </div>
            {/* Selected Schemas Dropdown in Blue Box */}
            <div className={`${selectedSchemas?.length > 0 ? "blue-box" : ""}`}>
              {selectedSchemas &&
                selectedSchemas?.map((schema, index) => (
                  <div key={`${schema}+${index}`} className="schemas">
                    {/* <div className="schema-dropdown"> */}
                    <div
                      className={`color-point ${
                        groupTraits?.includes(schema) ? "group" : "user"
                      }`}
                    ></div>
                    <SchemaDropDown schema={schema} />
                    {/* </div> */}
                    <button onClick={() => handleRemove(schema)}>
                      <FontAwesomeIcon icon={faMinus} className="custom-icon" />
                    </button>
                  </div>
                ))}
            </div>

            {/* Main select Schema Dropdown */}
            <div className="add-schema">
              <div className="color-point"></div>
              <AddSchemaDropdown
                setSelectedValue={setSelectedValue}
                selectedValue={selectedValue}
                isLinkClicked={isLinkClicked}
                setIsLinkClicked={setIsLinkClicked}
              />
              <button onClick={removeAllSchema}>
                <FontAwesomeIcon icon={faMinus} className="custom-icon" />
              </button>
            </div>

            {/* link */}
            <div className="link">
              <a href="#" onClick={handleLink}>
                + Add new Schema
              </a>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* Footer Btns */}
          <div className="footer-btns">
            <button className="save-btn" onClick={handleSave}>
              Save the Segment
            </button>
            <button className="close-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SavingSegmantModal;

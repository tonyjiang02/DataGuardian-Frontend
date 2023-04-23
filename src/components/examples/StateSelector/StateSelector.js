import React, { useState } from "react";
import {
  FormGroup,
  Input,
  Label
} from "reactstrap";

// https://gist.github.com/tleen/6299431
const allOptions = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

const StateSelector = ({ setStateResident }) => {
  const [selectedState, setSelectedState] = useState("");

  function handleStateChange(event) {
    setSelectedState(event.target.value);
    setStateResident(event.target.value);
  }

  return (
    <div>
      <FormGroup>
        <Label for="exampleSelect">
          State of Residence:
        </Label>
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">Select a state</option>
          {allOptions.map((state) => <option key={state}>{state}</option>)}
        </Input>
      </FormGroup>
    </div>
  );
};

export default StateSelector;
import React, { useState } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

function PhoneInput({setPhoneNumber}) {
  const [phoneInput, setPhoneInput] = useState('');

  function handlePhoneInputChange(event) {
    let phoneInput = event.target.value;

    // Only allow digits in the phone number
    phoneInput = phoneInput.replace(/\D/g, '');

    // Only set the phone number state if it's exactly 10 digits
    if (phoneInput.length <= 10) {
      setPhoneInput(phoneInput.slice(0, 10));
      setPhoneNumber(phoneInput);
    }
  }

  return (
    <FormGroup>
      <Label for="phone-input">Phone Number:</Label>
      <Input
        id="phone-input"
        type="tel"
        pattern="[0-9]*"
        inputMode="numeric"
        value={phoneInput}
        onChange={handlePhoneInputChange}
        placeholder="Enter a 10-digit phone number"
        minLength="10"
        maxLength="10"
        required
      />
    </FormGroup>
  );
}

export default PhoneInput;
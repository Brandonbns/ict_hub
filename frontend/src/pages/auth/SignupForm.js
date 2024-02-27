import axios from "axios";
import React, { useState } from "react";
import "./loginForm.css";
import {
  Checkbox,
  Form,
  Input,
  Label,
  Radio,
  Segment,
  GridRow,
  GridColumn,
  Grid,
  Image,
  FormGroup,
} from "semantic-ui-react";

function SignupForm() {
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cnoError, setCnoError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [examYearError, setExamYearError] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [reqError, setReqError] = useState(false);

  function requiredCheck(e) {
    let {
      fName,
      lName,
      userName,
      password,
      rePassword,
      email,
      examYear,
      cNo,
      address,
    } = e.target;

    if (fName.value === "") {
      setFnameError(true);
      setReqError(true);
    } else setFnameError(false);

    if (lName.value === "") {
      setLnameError(true);
      setReqError(true);
    } else setLnameError(false);

    if (userName.value === "") {
      setReqError(true);
      setUsernameError(true);
    } else setUsernameError(false);

    if (email.value === "") {
      setEmailError(true);
      setReqError(true);
    } else setEmailError(false);

    if (password.value === "") {
      setPasswordError(true);
      setReqError(true);
    } else setPasswordError(false);

    if (cNo.value === "") {
      setCnoError(true);
      setReqError(true);
    } else setCnoError(false);

    if (address.value === "") {
      setAddressError(true);
      setReqError(true);
    } else setAddressError(false);

    if (examYear.value === "") {
      setExamYearError(true);
      setReqError(true);
    } else setExamYearError(false);

    if (password.value !== rePassword.value) {
      setPasswordError(true);
      setReqError(true);
      alert("Password do not match");
    } else setPasswordError(false);

    return getReqState();
  }

  function getReqState() {
    if (
      fnameError ||
      lnameError ||
      usernameError ||
      emailError ||
      passwordError ||
      cnoError ||
      addressError ||
      examYearError
    ) {
      return true;
    } else return false;
  }

  async function createUser(e) {
    e.preventDefault();
    let {
      fName,
      userName,
      password,
      email,
      al,
      examYear,
      lName,
      cNo,
      address,
      school,
    } = e.target;

    if (!requiredCheck(e)) {
      axios({
        method: "post",
        url: process.env.API_URI,
        data: {
          fName: fName.value,
          lName: lName.value,
          userName: userName.value,
          email: email.value,
          password: password.value,
          cNo: cNo.value,
          address: address.value,
          school: school.value,
          examYear: examYear.value,
          isAlevel: al.checked,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            alert(response.data.message);
            setBtnDisabled(true);
          } else {
            console.log(response, "response in bad req");
            alert(response.data.message);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err, "err");
            alert(err.response.data.message);
          }
        });
    }
  }

  return (
    <div className="signupContainer">
      <Segment className="userCreationForm">
        <h2>Student Registration</h2>

        <Form className="signupForm" onSubmit={createUser}>
          <FormGroup widths={"equal"}>
            <Input
              id="fName"
              placeholder="First Name*"
              icon="users"
              iconPosition="left"
              error={fnameError}
            />
            <br />
            <Input
              id="lName"
              placeholder="Last Name*"
              icon="users"
              iconPosition="left"
              error={lnameError}
            />

            <br />
          </FormGroup>
          <FormGroup widths={"equal"}>
            <Input
              id="userName"
              placeholder="UserName*"
              icon="user"
              iconPosition="left"
              error={usernameError}
            />
            <br />{" "}
            <Input
              id="email"
              placeholder="Email*"
              icon="mail"
              iconPosition="left"
              error={emailError}
            />
            <br />
          </FormGroup>
          <FormGroup widths={"equal"}>
            <Input
              id="password"
              type="password"
              placeholder="Password*"
              icon="key"
              iconPosition="left"
              error={passwordError}
            />
            <br />

            <Input
              id="rePassword"
              type="password"
              placeholder="Re-enter Password"
              icon="key"
              iconPosition="left"
              error={passwordError}
            />
            <br />
          </FormGroup>
          <FormGroup widths={"equal"}>
            <Input
              id="cNo"
              placeholder="Contact Number*"
              icon="phone"
              iconPosition="left"
              error={cnoError}
            />
            <br />
            <Input
              id="address"
              placeholder="Address*"
              icon="home"
              iconPosition="left"
              error={addressError}
            />
            <br />
          </FormGroup>
          <FormGroup widths={"equal"}>
            <Input
              id="school"
              placeholder="School"
              icon="graduation cap"
              iconPosition="left"
            />
            <br />
            <Input
              id="examYear"
              placeholder="Exam Year*"
              icon="calendar alternate outline"
              iconPosition="left"
              error={examYearError}
            />
            <br />
          </FormGroup>

          <FormGroup inline>
            <label>Select Your Exam Details</label>
            <Radio id="al" name="exam" label="A/Level "></Radio>
            <Radio id="ol" name="exam" label="O/Level "></Radio>
            <br />
          </FormGroup>

          <input
            className="ui button secondary signupButton"
            value="Signup"
            type="submit"
            disabled={btnDisabled}
          />
          <br />
          <label>* - Required fields</label>
        </Form>
      </Segment>
    </div>
  );
}

export default SignupForm;

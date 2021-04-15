import React, { useState } from "react";
import "../stylesheets/Form.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";

const MainForm = () => {
  let [sun, setSun] = useState(false);
  let [mon, setMon] = useState(false);
  let [tues, setTues] = useState(false);
  let [wed, setWed] = useState(false);
  let [thrus, setThrus] = useState(false);
  let [fri, setFri] = useState(false);
  let [sat, setSat] = useState(false);
  let [repeatType, setRepeatType] = useState("");
  let [date, setDate] = useState("");
  let [startTime, setStartTime] = useState("00.00");
  let [endTime, setEndTime] = useState("00.00");
  let [weekDayButton, setWeekDayButton] = useState(false);
  let [shift, setShift] = useState("none");
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [isInValidShift, setIsInvalidShift] = useState(false);

  function setButtonTrueForDaily(value) {
     setRepeatType(value);
    if (value === "daily") {
     
      setMon(true);
      setTues(true);
      setWed(true);
      setThrus(true);
      setFri(true);
      if (!weekDayButton) {
        setSat(true);
        setSun(true);
      }
    } else {
      
      setSun(false);
      setMon(false);
      setTues(false);
      setWed(false);
      setThrus(false);
      setFri(false);
      setSat(false);
      changeDate(date);
    }
  }
  function submitForm() {
    //date validations
    var today = new Date();
    if (date === "" || date < today) {
      setIsInvalidDate(true);
    } else {
      setIsInvalidDate(false);
    }
    if (shift === "none") {
      setIsInvalidShift(true);
    } else {
      setIsInvalidShift(false);
    }

    if (repeatType !== "" && shift !== "none" && date!=='') {
      const daysOfWeek = [0, 0, 0, 0, 0, 0, 0];
      if (mon) daysOfWeek[0] = 1;
      if (tues) daysOfWeek[1] = 1;
      if (wed) daysOfWeek[2] = 1;
      if (thrus) daysOfWeek[3] = 1;
      if (fri) daysOfWeek[4] = 1;
      if (sat) daysOfWeek[5] = 1;
      if (sun) daysOfWeek[6] = 1;

      alert("Success");

      const data = {
        Start_date: date,
        Repeat_Type: repeatType,
        Timings: shift,
        Shift_Start_Time: startTime,
        Shift_End_Time: endTime,
        Days: daysOfWeek,
      };
      console.log(data);
    }
  }
  function validateWhileFocus(event) {
    switch (event.target.name) {
      case "Date":
        if (event.target.value !== "") {
          setIsInvalidDate(false);
        } else {
          setIsInvalidDate(true);
        }
        break;
      case "Shift":
        if (event.target.value === "none") {
          setIsInvalidShift(true);
        } else {
          setIsInvalidShift(false);
        }
        break;
      default:
          break;
    }
  }
  function enableRadioButton(id) {
    if (repeatType !== "daily") {
      if (id === "Sunday" && !weekDayButton) {
        setSun(!sun);
      } else if (id === "Monday") {
        console.log(mon);
        setMon(!mon);
        console.log(mon);
      } else if (id === "Tuesday") {
        setTues(!tues);
      } else if (id === "Wednesday") {
        setWed(!wed);
      } else if (id === "Thrusday") {
        setThrus(!thrus);
      } else if (id === "Friday") {
        setFri(!fri);
      } else if (id === "Saturday" && !weekDayButton) {
        setSat(!sat);
      }
    }
  }
  function changeShiftTiming(shiftName) {
    if (shiftName === "Morning Shift - 5am to 9am") {
      setStartTime("5 am");
      setEndTime("9 am");
    }
  }
  function changeDate(startDate) {
    var days = ["sun", "mon", "tues", "wed", "thrus", "fri", "sat"];
    setDate(startDate);
    var newdate = new Date(startDate);
    var day = newdate.getDay();
    var d = days[day];
    if (d === "sun" && !weekDayButton) {
      setSun(true);
    } else if (d === "mon") {
      setMon(true);
    } else if (d === "tues") {
      setTues(true);
    } else if (d === "wed") {
      setWed(true);
    } else if (d === "thrus") {
      setThrus(true);
    } else if (d === "fri") {
      setFri(true);
    } else if (d === "sat" && !weekDayButton) {
      setSat(true);
    }
  }

  function ChangeWeekdayButton() {
    setWeekDayButton(!weekDayButton);
    if (!weekDayButton) {
      setSat(false);
      setSun(false);
    } else if (weekDayButton && repeatType === "daily") {
      setSat(true);
      setSun(true);
    }
  }

  return (
    <div className="body">
      <Container className="container">
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              <b>Select Start Date</b>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="Date"
                value={date}
                onChange={(e) => {
                  changeDate(e.target.value);
                  validateWhileFocus(e);
                }}
                type="date"
                isInvalid={isInvalidDate}
              />
              {isInvalidDate ? (
                <label style={{ color: "red" }}>
                  Cannot leave this field empty
                </label>
              ) : null}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
            <Form.Label column sm="2">
              <b>Select Repeat Type</b>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(event) => {
                  setButtonTrueForDaily(event.target.value);
                }}
                as="select"
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
            <Form.Label column sm="2">
              <b>Select Shift</b>
            </Form.Label>
            {/* const [isInValidShift, setIsInvalidShift] = useState(false); */}
            <Col sm="10">
              <Form.Control
                name="Shift"
                value={shift}
                onChange={(event) => {
                  setShift(event.target.value);
                  changeShiftTiming(event.target.value);
                  validateWhileFocus(event);
                }}
                isInvalid={isInValidShift}
                as="select"
              >
                <option value="none">Select Shift</option>
                <option value="Morning Shift - 5am to 9am">
                  Morning Shift - 5am to 9am
                </option>
              </Form.Control>
              {isInValidShift ? (
                <label style={{ color: "red" }}>Select a field please</label>
              ) : null}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              <b>Select Start Time</b>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
                value={startTime}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              <b>Select End Time</b>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
                value={endTime}
              />
            </Col>
          </Form.Group>
          <div className="radioBtn">
            <h3>Please select day of the week</h3>
            <Form.Group as={Row}>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="12" style={{ textAlign: "center" }}>
                    Monday
                  </Form.Label>
                  <Col sm="12" style={{ textAlign: "center" }}>
                    <Form.Check
                      type="radio"
                      checked={mon}
                      id="Monday"
                      onClick={(event) => {
                        enableRadioButton(event.target.id);
                      }}
                      onChange={(e) => {}}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="12" style={{ textAlign: "center" }}>
                    Tuesday
                  </Form.Label>
                  <Col sm="12" style={{ textAlign: "center" }}>
                    <Form.Check
                      type="radio"
                      checked={tues}
                      id="Tuesday"
                      onClick={(event) => {
                        enableRadioButton(event.target.id);
                      }}
                      onChange={(e) => {}}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="12" style={{ textAlign: "center" }}>
                    Wednesday
                  </Form.Label>
                  <Col sm="12" style={{ textAlign: "center" }}>
                    <Form.Check
                      type="radio"
                      checked={wed}
                      id="Wednesday"
                      onClick={(event) => {
                        enableRadioButton(event.target.id);
                      }}
                      onChange={(e) => {}}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="12" style={{ textAlign: "center" }}>
                    Thrusday
                  </Form.Label>
                  <Col sm="12" style={{ textAlign: "center" }}>
                    <Form.Check
                      type="radio"
                      checked={thrus}
                      id="Thrusday"
                      onClick={(event) => {
                        enableRadioButton(event.target.id);
                      }}
                      onChange={(e) => {}}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="12" style={{ textAlign: "center" }}>
                    Friday
                  </Form.Label>
                  <Col sm="12" style={{ textAlign: "center" }}>
                    <Form.Check
                      type="radio"
                      checked={fri}
                      id="Friday"
                      onClick={(event) => {
                        enableRadioButton(event.target.id);
                      }}
                      onChange={(e) => {}}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="12" style={{ textAlign: "center" }}>
                    Saturday
                  </Form.Label>
                  <Col sm="12" style={{ textAlign: "center" }}>
                    <Form.Check
                      type="radio"
                      checked={sat}
                      id="Saturday"
                      onClick={(event) => {
                        enableRadioButton(event.target.id);
                      }}
                      onChange={(e) => {}}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row}>
                  <Form.Label column sm="12" style={{ textAlign: "center" }}>
                    Sunday
                  </Form.Label>
                  <Col sm="12" style={{ textAlign: "center" }}>
                    <Form.Check
                      type="radio"
                      checked={sun}
                      id="Sunday"
                      onClick={(event) => {
                        enableRadioButton(event.target.id);
                      }}
                      onChange={(e) => {}}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Form.Group>
          </div>
          <Col>
            <Form.Group as={Row}>
              <Form.Check
                type="radio"
                checked={weekDayButton}
                onClick={(e) => {
                  ChangeWeekdayButton();
                }}
                onChange={(e) => {}}
              />

              <Form.Label>
                <b>Weekdays Only</b>
              </Form.Label>
            </Form.Group>
          </Col>
          <div className="Submitbtn">
            <Button
              size="lg"
              variant="outline-info"
              onClick={(e) => {
                submitForm(e);
              }}
            >
              Success
            </Button>{" "}
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default MainForm;

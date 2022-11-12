import React from "react";
import {memo} from "react";
import { Button, Icon } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { getCommunes, getDistricts, getProvinces, updateEmployee, postEmployee } from "./EmployeeService";
class EmployeesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      districtset: {},
      districts: [],
      provinces: [],
      provinceset: {},
      communes: [],
      communeset: {},
      employeesupdate: {
        name: "",
        age: "",
        code: "",
        phone: "",
        email: "",
        district: {},
        province: {},
        commune: {},
      },
    };
  }
  async componentDidMount() {

    let { employee } = this.props;
    let districts = await getDistricts();
    let communes = await getCommunes();
    let provinces = await getProvinces();
  
    this.setState({
      districts,
      communes,
      provinces

    })
    if (employee) {
      this.setState(
        {
          employeesupdate: { ...employee },

        }
      );
    }
  };

  handleChangedistrict = (event) => {
    this.setState({
      employeesupdate: {
        ...this.state.employeesupdate,
        district: event.target.value,
      },
    });
  };
  handleChangeCommune = (event) => {
    this.setState({
      employeesupdate: {
        ...this.state.employeesupdate,
        commune: event.target.value,
      },
    });
  };
  handleChangeProvince = (event) => {
    this.setState({
      employeesupdate: {
        ...this.state.employeesupdate,
        province: event.target.value,
      },
    });
  };
  handleClose = () => {
    let { is } = this.props;
    this.setState({
      is: false,
    });
  };
  handleChangeName = (event) => {
    let { employeesupdate } = this.state;
    this.setState({
      employeesupdate: {
        ...this.state.employeesupdate,
        name: event.target.value,
      },
    });

  };
  handleChangeAge = (event) => {
    this.setState({
      employeesupdate: {
        ...this.state.employeesupdate,
        age: event.target.value,
      },
    });
  };
  handleChangeCode = (event) => {
    let { employeesupdate } = this.state;
    this.setState({
      employeesupdate: {
        ...this.state.employeesupdate,
        code: event.target.value,
      },
    });
  };
  handleChangePhone = (event) => {
    let { employeesupdate } = this.state;
    this.setState({
      employeesupdate: {
        ...this.state.employeesupdate,
        phone: event.target.value,
      },
    });

  };
  handleChangeEmail = (event) => {
    let { employeesupdate } = this.state;
    this.setState({
      employeesupdate: {
        ...this.state.employeesupdate,
        email: event.target.value,
      },
    });

  };

  handleUpdate = async (itemid) => {
    await updateEmployee(itemid, this.state.employeesupdate)
    toast.success("Edit sucess!");
    this.props.upDatePage();
    this.props.handleClose();

  }
  handlePost = async () => {
    await postEmployee(this.state.employeesupdate)
    toast.success("Add sucess!");
    this.props.upDatePage();
    this.props.handleClose();

  }





  render() {
    let { districts, communes, provinces } = this.state;
    let { open, handleClose, employee, check } = this.props;
    return (
      <>
        <div>
          <Dialog open={open} maxWidth="md">
            <DialogTitle>
              {check ? "Sửa tài khoản" : "Thêm mới tài khoản"}
            </DialogTitle>


            <ValidatorForm ref="form"
              onSubmit={
                check
                  ? () => this.handleUpdate(employee.id)

                  : () => this.handlePost()}

              noValidate
              autoComplete="off"
            >
              <DialogContent
                className="container"
                sx={{
                  m: 0.1, width: '76ch', padding: '0px 24px'
                }}
              >

                <div>
                  <TextValidator
                    id="name"
                    label="Name"
                    value={this.state.employeesupdate.name}
                    defaultValue={check ? employee.name : null}

                    validators={check ? null : ["required"]}
                    errorMessages={["this field is required"]}
                    onChange={this.handleChangeName}
                  />
                  <TextValidator
                    id="email"
                    label="Email"
                    value={this.state.employeesupdate.email}
                    defaultValue={check === true ? employee.email : ""}
                    validators={check ? null : ["required", "isEmail"]}
                    errorMessages={["this field is required", "Email is not valid"]}

                    onChange={this.handleChangeEmail}
                  />
                  <TextValidator
                    id="phone"
                    label="Phone"

                    defaultValue={check === true ? employee.phone : ""}


                    value={this.state.employeesupdate.phone}
                    validators={check ? null : ["required"]}
                    errorMessages={["this field is required"]}
                    onChange={this.handleChangePhone}
                  />
                  <TextValidator
                    id="code"
                    label="Code"
                    value={this.state.employeesupdate.code}
                    validators={check ? null : ["required"]}
                    errorMessages={["this field is required"]}
                    defaultValue={check === true ? employee.code : ""}


                    onChange={this.handleChangeCode}
                  />
                </div>
                <div>
                  <TextValidator
                    id="age"
                    label="Age"
                    value={this.state.employeesupdate.age}
                    defaultValue={check === true ? employee.age : ""}

                    type="number"
                    validators={check ? null : ["required"]}
                    errorMessages={["this field is required"]}
                    onChange={this.handleChangeAge}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextValidator
                    id="outlined-select-currency"
                    select
                    label="Province"
                    // defaultValue={province}
                    value={this.state.employeesupdate.province}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    onChange={this.handleChangeProvince}
                  // helperText="Please select your currency"
                  >
                    {provinces.map((option) => (
                      <MenuItem key={option.id} value={option}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextValidator>
                  <TextValidator
                    id="District"
                    select
                    label="District"
                    // defaultValue={district}
                    value={this.state.employeesupdate.district}
                    validators={ ["required"]}
                    errorMessages={["this field is required"]}
                    onChange={(event) => this.handleChangedistrict(event)}
                  // helperText="Please select your currency"
                  >
                    {districts.map((option) => (
                      <MenuItem key={option.id} value={option}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextValidator>
                  <TextValidator
                    id="outlined-select-currency"
                    select
                    label="Commune"
                    // defaultValue={commune}
                    value={this.state.employeesupdate.commune}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    onChange={(event) => this.handleChangeCommune(event)}
                  // helperText="Please select your currency"
                  >
                    {communes.map((option) => (
                      <MenuItem key={option.id} value={option}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextValidator>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {check === false ? (
                      <Button type="submit" >Send</Button>
                    ) : (
                      <Button type="submit" >
                        Save
                      </Button>
                    )}
                  </DialogActions>
                </div>




              </DialogContent>
            </ValidatorForm>


          </Dialog>
        </div>
      </>
    );
  }
}
export default React.memo(EmployeesDialog);

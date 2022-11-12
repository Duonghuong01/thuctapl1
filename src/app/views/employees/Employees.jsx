import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Button, Icon } from "@material-ui/core";
import EmployeesDialog from "./EmployeesDialog";
import Employeesedit from "./Employeesedit";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { CollectionsOutlined } from "@material-ui/icons";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ConfirmationDialog } from "egret";
import "./_Employee.scss";
import { getEmployee, deleteEmployee } from "./EmployeeService"
// CallApi=()=>{
//   axios.post("http://training-api.oceantech.com.vn/cms/employees/search",{}).then(res=>console.log("data employee",res))

// }

class Employee extends React.Component {
  state = {
    data: [],
    open: false,
    id: "",
    isShowDialogDelete: false,
    check: false,
    employeespost: {
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


  async componentDidMount() {
    let data = await getEmployee();
    this.setState({
      data: data,
      isShowDialogDelete: false
    })

  }
  updateData = async () => {
    this.setState({
      data: await getEmployee()
    })
  }
  handleClickdelete = async () => {
    await deleteEmployee(this.state.id)
    this.setState({
      isShowDialogDelete: false
    })
    toast.error("Delete sucess!")
    this.updateData()


  };
  handelOnalclickAdd = (event) => {
    event.preventDefault();
    this.setState(
      {
        open: true,
        check: false,
        employeespost: {},
      },
      () => console.log("ssss", this.state.open)
    );
  };
  handleClose = () => {
    this.setState(
      {
        open: false,
      },
      () => {
        console.log("aaaa");
      }
    );
  };
  handelOnalclickEdit = (employeespost) => {
    this.setState({
      open: true,
      check: true,
      employeespost,
    });
  };
  render() {
    let { data, open, check, employeespost } = this.state;
    return (
      <div>
        {console.log(data)}
        <Button
          className="align-bottom mr-16 mb-16"
          variant="contained"
          color="primary"
          onClick={this.handelOnalclickAdd}
        >
          Thêm
        </Button>

    

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Age</TableCell>
                <TableCell align="left">Code</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>

                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="left">{item.age}</TableCell>
                  <TableCell align="left">{item.code}</TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                  <TableCell align="left">{item.phone}</TableCell>

                  <TableCell align="left">
                    {/* <Employeesedit
                      employee={item}
                      editItem={this.getEmployees}
                      open={open}
                      check={check}
                    /> */}
                    <IconButton
                      size="small"
                      onClick={() => this.handelOnalclickEdit(item)}
                    >
                      <Icon fontSize="small" color="primary">
                        edit
                      </Icon>
                    </IconButton>

                    <IconButton onClick={() => {
                      this.setState({ isShowDialogDelete: true, id: item.id });

                    }}>
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </TableCell>

                  

                </TableRow>
              ))}
              {
                this.state.isShowDialogDelete &&
                <ConfirmationDialog
                  title="Confirm"
                  open={this.state.isShowDialogDelete}
                  onConfirmDialogClose={() => this.setState({ isShowDialogDelete: false })}
                  onYesClick={() => this.handleClickdelete(this.state.id)}
                  text="Bạn có muốn xóa ?"
                  Yes={"Yes"}
                  No={"No"}
                />
              }
              {open && (
                    <Employeesedit
                      upDatePage={this.updateData}
                      open={open}
                      handleClose={this.handleClose}
                      employee={
                        this.state.employeespost
                          ? this.state.employeespost
                          : null
                      }
                      check={check}
                      editItem={this.updateData}
                    />
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default Employee;

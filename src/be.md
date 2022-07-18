import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
Grid,
Dialog,
DialogActions,
DialogContent,
DialogTitle,
Button,
makeStyles,
FormGroup,
FormControlLabel,
Checkbox,
TextField,
InputAdornment,
Box,
Card,
Tooltip,
withStyles,
Typography,
Select,
Input,
Chip,
MenuItem,
ListItemText,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";

// import theme from '../../../theme';

import ControlFactorsButton from "./ContolFactorsButton";
import { formatDate } from "./ControlFactorsBottomPanel";

const useControlFactorsDialogStyles = makeStyles((theme) => ({
dialogPaper: {
minHeight: "40vh",
maxHeight: "40vh",
minWidth: "30vw",
maxWidth: "40vw",
backgroundColor: theme.dataset.snowColor,
},
// paper: {
// width: '100%',
// height: '100%'
// }
dropDown: {
"& ul": {
maxHeight: "30vh",
},
},
}));

const StyledTextField = withStyles({
root: {
"& .MuiInputBase-root": {
fontSize: "16px",
fontWeight: "400",
borderRadius: "0px",
height: "40px",
paddingBottom: "15px",
// padding: "12px 16px",
},
},
})(TextField);

function BulkEdit(props) {
// const defaultValueRef = useRef()
const classes = useControlFactorsDialogStyles();
const [newValue, setNewValue] = useState();
const [defaultValue, setDefaultValue] = useState("");
const [selectedDates, setSelectedDates] = useState([]);

// const formatDate = (date) => {
// try {
// const splitDate = date.split("-");
// const [year, month, day] = splitDate;
// const d = new Date(year, month, day);
// let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
// let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
// let da = new Intl.DateTimeFormat("en", { day: "numeric" }).format(d);
// return `${mo} ${da} ${ye}`;
// } catch (error) {
// console.log(error);
// }
// };

useEffect(() => {
if (props.open !== true) {
setNewValue(defaultValue);
setSelectedDates([]);
setDefaultValue("");
return;
}
try {
const getFactorData =
props?.forecast_simulation_values?.control_factors.filter(
(factor) => factor.factor === props.name
);
const defaultValue =
Array.isArray(getFactorData) &&
getFactorData[0]?.current_values[0].default_value;
setDefaultValue(defaultValue !== undefined ? defaultValue : "");
setNewValue(defaultValue !== undefined ? defaultValue : "");
// defaultValueRef.current = defaultValue !== undefined ? defaultValue : "";
} catch (error) {
console.log(error);
}
}, [props.open]);

const onDeleteChip = (chipToDelete) => {
const newSelectedDates = selectedDates.filter(
(date) => date !== chipToDelete
);
setSelectedDates(newSelectedDates);
};
const handleKeyPress = (event) => {
// regex for alphabets
// const regex = /^[a-zA-Z]+$/;
// if (regex.test(event.target.value)) {
// return;
// }
if (event.target.innerText.length > 15) event.preventDefault();
const keyCode = event.keyCode || event.which;
if (isNaN(String.fromCharCode(event.which)) && keyCode !== 46) {
event.preventDefault();
}
if (keyCode === 13) {
event.preventDefault();
event.target.blur();
}
};

return (
<Dialog
open={props.open}
onClose={props.onClose}
aria-labelledby="form-dialog-title"
classes={{ paper: classes.dialogPaper }}
scroll="paper"
disableBackdropClick >
<DialogTitle id="form-dialog-title">
<Grid container direction="row" justify="space-between">
<Grid item style={{ textTransform: "capitalize" }}>
Edit Factor
</Grid>
<Grid item style={{ cursor: "pointer" }}>
<CloseIcon onClick={props.onClose} />
</Grid>
</Grid>
</DialogTitle>
<DialogContent
style={{
          backgroundColor: "#fff",
          width: "85%",
          margin: "auto",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%),0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        }} >
<Grid
container
direction="column"
justify="center"
alignItems="flex-start"
style={{ margin: "auto", marginTop: "15px" }} >
<Grid item>
<Typography
variant="subtitle2"
style={{ fontSize: "14px", fontWeight: "500", color: "#464655" }} >
{props.name}
</Typography>
</Grid>
<Grid item style={{ width: "100%" }}>
<form className={classes.root} noValidate autoComplete="off">
<StyledTextField
InputProps={{
                  disableUnderline: true,
                }}
onKeyPress={handleKeyPress}
defaultValue={defaultValue}
placeholder={defaultValue}
style={{ width: "100%" }}
// margin='dense'
size="small"
id=""
label=""
variant="filled"
value={newValue}
onChange={(e) => {
// if (e.target.value === "") {
// setNewValue("0");
// }
setNewValue(e.target.value);
}}
/>
</form>
</Grid>
<Grid style={{ marginTop: 10, width: "100%" }}>
<Typography
variant="subtitle2"
style={{ fontSize: "14px", fontWeight: "500", color: "#464655" }} >
Select Date(s)
</Typography>
<Select
multiple
style={{ width: "100%" }}
MenuProps={{
                classes: {
                  paper: classes.dropDown,
                },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
value={selectedDates}
onChange={(e) => {
setSelectedDates(e.target.value);
}}
input={<Input id="select-multiple-chip" />}
renderValue={(selectedDates) => (
<div className={classes.chips}>
{selectedDates.map((value, i) => {
if (i > 1) return;
if (i === 1) {
return (
<Chip
key={value}
size="small"
clickable
style={{ marginLeft: 5 }}
label={`+${selectedDates.length - 1}`}
// className={classes.chip}
variant="outlined"
color="primary"
/>
);
} else {
return (
<Chip
variant="outlined"
size="small"
key={value}
label={formatDate(value, props)}
deleteIcon={
<CancelIcon
onMouseDown={(e) => e.stopPropagation()}
/>
}
onDelete={(e) => onDeleteChip(value)}
/>
);
}
})}
</div>
)} >
{props.dates.map((date) => (
<MenuItem key={date} value={date}>
<Checkbox checked={selectedDates.indexOf(date) > -1} />
<ListItemText>{formatDate(date, props)}</ListItemText>
</MenuItem>
))}
</Select>
</Grid>
</Grid>
</DialogContent>
<DialogActions>
<Button onClick={props.onClose} color="primary">
Cancel
</Button>
<Button
disabled={newValue === "" || selectedDates.length === 0}
onClick={() => {
props.onBulkEdit(newValue, props.name, selectedDates, defaultValue);
props.onClose();
}}
color="primary"
variant="contained" >
Add
</Button>
</DialogActions>
</Dialog>
);
}

export default BulkEdit;

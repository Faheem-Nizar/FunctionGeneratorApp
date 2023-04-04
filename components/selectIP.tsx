import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { SimpleDialogProps } from '@/pages';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


export default function SimpleDialog(props: SimpleDialogProps) {
    const { open , setOpen , ip , setIp } = props;
  
    const handleClose = () => {
      if(ip === '') {
        alert("Please enter an IP address for the ESP32");
      }
      else {
        setOpen(false);
      }
    };

    const enterIPAddress = (e:any) => {
        setIp(e.target.value)
    }
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Enter the ESP32 IP Address</DialogTitle>
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField id="outlined-basic" label="IP Address" variant="outlined" onChange={(e) => {enterIPAddress(e)}}/>
            <Button sx={{height: "55px"}} variant="contained" onClick={handleClose}>Save</Button>
        </Box>
      </Dialog>
    );
  }
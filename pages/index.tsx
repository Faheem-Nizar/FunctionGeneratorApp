import * as React from 'react';
import Button from '@mui/material/Button';
import SimpleDialog from '@/components/selectIP';
import Typography from '@mui/material/Typography';
import { Box, Popover } from '@mui/material';
import styles from '../styles/Home.module.css'
import FrequencyDutyCycleSelector from '@/components/popover';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  typeWave: number;
  setTypeWave: any;
  open: boolean;
  setOpen: any;
  ip: string;
  setIp: any;
}


export default function Home() {

  const [open, setOpen] = React.useState(true);
  const [ip, setIp] = React.useState("");
  const [typeWave, setTypeWave] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  const openPopover = (waveType:number) => {
    setTypeWave(waveType);
    setAnchorEl(document.getElementById("beginning"));
  };
  const closePopover = () => {
    setAnchorEl(null);
  };


  return (
    <div id="beginning" style={{display: 'flex', alignItems: "center", justifyContent: 'center', height: "100vh"}}>
      <Typography variant="subtitle1" component="div" 
      style={{position: 'absolute', bottom: "20px", right: "160px"}}>
        IP Address: {ip}
      </Typography>
      <br />
      <SimpleDialog
        typeWave={typeWave}
        setTypeWave={setTypeWave}
        open={open}
        setOpen={setOpen}
        ip={ip}
        setIp={setIp}
      />

      <Popover
        id={id}
        open={openPop}
        anchorPosition={{ top: 20, left: 1300 }}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <FrequencyDutyCycleSelector 
        ip={ip}
        typeWave={typeWave}/>
      </Popover>

      <div>
        <div className={styles.divider}>
          <div style={{margin: "30px"}}>
          <Button variant="contained" className={styles.mainBox} onClick={() => openPopover(1)}>
            <div style={{fontSize: "40px", fontFamily: "sans-serif"}}>Sine</div> 
          </Button>
          </div>
          <div style={{margin: "30px"}}>
          <Button variant="contained" className={styles.mainBox} onClick={() => openPopover(2)}>
            <div style={{fontSize: "40px", fontFamily: "sans-serif"}}>Square</div> 
          </Button>
          </div>
        </div>
        <div className={styles.divider}>
        {/* <div style={{margin: "30px"}}>
          <Button variant="contained" className={styles.mainBox} onClick={() => openPopover(3)}>
            <div style={{fontSize: "40px", fontFamily: "sans-serif"}}>Triangular</div> 
          </Button>
          </div> */}
          {/* <div style={{margin: "30px"}}> */}
          <Button variant="contained" style={{margin: "30px"}} className={styles.mainBox} onClick={() => openPopover(4)}>
            <div style={{fontSize: "40px", fontFamily: "sans-serif"}}>Ramp</div> 
          </Button>
          {/* </div> */}
        </div>
      </div>
      <div id="bottommost" 
      style={{position: 'absolute', bottom: "25px", right: "50%", left: "50%"}}/>
    </div>
  )
}

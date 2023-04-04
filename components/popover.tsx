import { useState } from 'react';
import { makeStyles, createStyles, Button } from '@mui/material';
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material';
import styles from '../styles/Home.module.css'
import axios from 'axios';



const FrequencyDutyCycleSelector = (data:any) => {


  const [frequencyValue, setFrequencyValue] = useState<number>(0);
  const [frequencyUnit, setFrequencyUnit] = useState<number>(1);
  const [dutyCycleValue, setDutyCycleValue] = useState<number>(50);
  const [amplitude, setAmplitude] = useState<number>(1)


 
  const setValue = (e:any) => {
    setDutyCycleValue(e.target.value)
  }
  const setAmp = (e:any) => {
    setAmplitude(e.target.value)
  }
  const setFrequency = (freq:number, unit:number) => {
    setFrequencyUnit(unit)
    if(unit !== 1000000) {
        if(freq.toString().length <= 3) {
            setFrequencyValue(freq)
        }
    }
    else {
        if(freq.toString().length <= 1) {
            setFrequencyValue(freq)
        }
    }
  }

  function formatNumber(num: number, len:number): string {
    const numString = num.toString();
    const numZeros = len - numString.length;
    const leadingZeros = '0'.repeat(numZeros);
    return leadingZeros + numString;
  }

  const outputWaveform = () => {
    let siginfo = '';
    let freqNum = frequencyUnit*frequencyValue;
    if(freqNum.toString().length > 7) {
        alert("The frequency must be lower than 9 MHz!");
        return;
    }
    let freq = formatNumber(freqNum, 7)
    let amp = formatNumber(Math.floor(amplitude*1000), 4)
    let dty = formatNumber(dutyCycleValue, 3);
    siginfo = data.typeWave + amp + dty + freq;
    console.log(freq)
    axios.post(`http://${data.ip}:5000/users/${siginfo}`)
      .then(response => {
        console.log(response.data)
        alert("Success!!!")
      })
      .catch(error => {
        console.error(error)
        alert("Network issue! make sure connections are stable.")
      });
  }

  return (
    <Container className={styles.container}>
      <div>
        <Typography variant="h4" gutterBottom>
          Waveform Feature Selector
        </Typography>
        <br/>
        <br/>
        <Typography id="duty-cycle-slider" gutterBottom>
            Amplitude (V)
          </Typography>
          <div style={{display: 'flex'}}>
            <Typography style={{marginRight: "10px"}} id="duty-cycle-slider" gutterBottom>
                0.0V
            </Typography>
            <Slider
            getAriaLabel={() => 'Minimum distance shift'}
            value={amplitude}
            onChange={setAmp}
            valueLabelDisplay="auto"
            // getAriaValueText={valuetext}
            disableSwap
            min={0}
            max={5}
            step={0.001}
            />
            <Typography style={{marginLeft: "10px"}} id="duty-cycle-slider" gutterBottom>
                5.0V
            </Typography>
          </div>
          <br />
          <br />

          <Typography id="duty-cycle-slider" gutterBottom>
            Frequency (Hz)
          </Typography>
        <TextField
         type='number'
         inputProps={{maxLength: 4}}
         value={frequencyValue}
         onChange={(e:any) => setFrequency(e.target.value, frequencyUnit)}
         id="demo-helper-text-misaligned-no-helper" label="Frequency" />

        <FormControl sx={{ m: 1, height: '60px', width: "60px", marginTop: "0px", marginBottom: "0px" }} variant="standard">
        <InputLabel id="demo-customized-select-label">Unit</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={frequencyUnit}
          onChange={(e:any) => setFrequency(frequencyValue, e.target.value)}
        >
          <MenuItem value={1}>Hz</MenuItem>
          <MenuItem value={1000}>kHz</MenuItem>
          <MenuItem value={1000000}>MHz</MenuItem>
        </Select>
      </FormControl>


          <br />
          <br />
          <Typography id="duty-cycle-slider" gutterBottom>
            Duty Cycle (%)
          </Typography>
          <div style={{display: 'flex'}}>
            <Typography style={{marginRight: "10px"}} id="duty-cycle-slider" gutterBottom>
                0%
            </Typography>
            <Slider defaultValue={50} onChange={setValue} aria-label="Default" valueLabelDisplay="auto" />
            <Typography style={{marginLeft: "10px"}} id="duty-cycle-slider" gutterBottom>
                100%
            </Typography>
          </div>
          
          <br />
          <br />
          <div style={{display: 'flex', justifyContent:'center'}}>
            <Button variant='contained'
            onClick={outputWaveform}>
                Output Waveform
            </Button>
          </div>
          
      </div>
    </Container>
  );
};

export default FrequencyDutyCycleSelector;
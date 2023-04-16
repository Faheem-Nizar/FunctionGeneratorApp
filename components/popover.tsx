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
        alert("The frequency must be lower than 200 kHz!");
        return;
    }
    let freq = formatNumber(freqNum, 7)
    let amp = formatNumber(Math.floor(amplitude*1000), 4)
    if(data.typeWave === 2) {
      setDutyCycleValue(100-dutyCycleValue);
    }
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
        {
          (data.typeWave === 1) &&
          <Typography variant="h4" gutterBottom>
            Sine Wave
          </Typography>
        }
        {
          (data.typeWave === 2) &&
          <Typography variant="h4" gutterBottom>
            Square Wave
          </Typography>
        }
        {
          (data.typeWave === 3) &&
          <Typography variant="h4" gutterBottom>
            Triangular Wave
          </Typography>
        }
        {
          (data.typeWave === 4) &&
          <Typography variant="h4" gutterBottom>
            Ramp Wave
          </Typography>
        }
        
        <br/>
        <br/>
        {
          (data.typeWave === 1 || data.typeWave === 2) &&
          <div>
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
          </div>
        }
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
          {/* <MenuItem value={1000000}>MHz</MenuItem> */}
        </Select>
      </FormControl>


          <br />
          <br />
          
          {
            (data.typeWave === 2) &&
          <div>
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
          </div>
          }
          {
            (data.typeWave === 4) &&
          <div>
            <div style={{display: 'flex'}}>
              <Typography style={{marginRight: "10px"}} id="duty-cycle-slider" gutterBottom>
                  Ramp Down
              </Typography>
              <Slider defaultValue={100} step={100} onChange={setValue} aria-label="Default" valueLabelDisplay="auto" />
              <Typography style={{marginLeft: "10px"}} id="duty-cycle-slider" gutterBottom>
                  Ramp Up
              </Typography>
            </div>
            
            <br />
            <br />
          </div>
          }
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
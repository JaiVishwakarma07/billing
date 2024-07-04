import { useEffect, useRef, useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import { useReactToPrint } from 'react-to-print';
import Print from './Print';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function App() {
  const [formFields, setFormFields] = useState([
    { name: '', quantity: 0,label: '',rate: 0,amount: 0 },
  ])

  const [info,setInfo] = useState({
    billno : 0,
    to : "",
    cgst : 0,
    sgst : 0
  })

  const [date,setDate] = useState("2024-04-23")

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const addFields = () => {
    let object = {
      name: '',
      quantity: 0,
      label: '',
      rate: 0,
      amount: 0
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  const componentRef = useRef();
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef(null);

  useEffect(() => {
  if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
  }
  }, [isPrinting]);

  const handlePrint = useReactToPrint({
  content: () => componentRef.current,
  onBeforeGetContent: () => {
      return new Promise((resolve) => {
      promiseResolveRef.current = resolve;
      setIsPrinting(true);
      });
  },
  onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrinting(false);
  }
  });

  const handleInfo = (e)=>{
    setInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
  })
  }

  // console.log(info,date);


  return (
    <>
    <div className='app'>
      <div className="formSection">
        <div className="formHeading">
          <h1 style={{textAlign:"center"}} >JAI INFOTECH BILLING SYSTEM</h1>
        </div>
        <div className="formContainer">
          <h2 className='headingsMains' style={{textAlign:"center"}} >Invoice Details</h2 >
        <div className="top">
          <div className="field1div">
          <TextField className='field1' id="outlined-basic" name='billno' label="Bill No." variant="outlined" inputProps={{ type: 'number'}} onChange={handleInfo} />
          <DatePicker className='field1'  name='date' label="Date" onChange={(val)=>setDate(val.format('YYYY-MM-DD').toString()``)} />
          </div>
          <TextField id="outlined-basic" name='to' fullWidth label="To" variant="outlined" onChange={handleInfo} />
        </div>
        <h2 className='headingsMains' style={{textAlign:"center"}}>Description of Goods</h2>
        {
          formFields.map((form,index)=>(
            <div className="formWrapper" key={index}>
              <TextField id="outlined-basic" name='name' label="Name" variant="outlined" onChange={e=>handleFormChange(e,index)} />
              <TextField id="outlined-basic" name='quantity' label="quantity" variant="outlined" inputProps={{ type: 'number'}} onChange={e=>handleFormChange(e,index)} />
              <TextField id="outlined-basic" name='label' label="label" variant="outlined"onChange={e=>handleFormChange(e,index)} />
              <TextField id="outlined-basic" name='rate' label="rate" variant="outlined" inputProps={{ type: 'number'}} onChange={e=>handleFormChange(e,index)} />
              <TextField id="outlined-basic" name='amount' label="amount" variant="outlined" inputProps={{ type: 'number'}} onChange={e=>handleFormChange(e,index)} />
              <button className='remove' onClick={() => removeFields(index)}>Remove</button>
            </div>
          ))
        }
        <button className='add' onClick={addFields}>Add More..</button>
        <h2 className='headingsMains' style={{textAlign:"center"}}>GST Details</h2>
        <div className="bottomMain">
          <TextField id="outlined-basic" name='cgst' label="CGST %" variant="outlined" inputProps={{ type: 'number'}} onChange={handleInfo} />
          <TextField id="outlined-basic" name='sgst' label="SGST %" variant="outlined" inputProps={{ type: 'number'}} onChange={handleInfo} />
        </div>
        </div>
      </div>
      <button className='printButton' onClick={handlePrint}>Print</button>
      <Print ref={componentRef} formFields={formFields} info={info} date={date} />
      </div>
    </>
  )
}

export default App

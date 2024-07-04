import React, { forwardRef, useContext } from 'react'
import './print.css'

const Print = forwardRef(({formFields,info,date},ref) => {

    const dummy = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]

    // console.log(dummy.splice(formFields.length));
    let total = 0;
    for(let i =0;i<formFields.length;i++){
        total = total+ parseFloat(formFields[i].amount)
    }

    let sgst = (total*info.sgst)/100, cgst=(total*info.cgst)/100;


    console.log(total);

  return (
    <div className="print" >
        <div className="bill" ref={ref}>
        <span className="start">INVOICE</span>
            <div className="header">
                <div className="headerLeft">
                        <span className="gstno">GST No.- 23ALHPV4168J1ZO</span>
                        <span className="regno">Req. No. C/848858</span>
                    
                    {/* <span className="contact">Mob.: 8370085891 <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9424603651</span> */}
                </div>
                <div className="headerRight">
                    <h1 className="mainHeading">
                        JAI INFOTECH
                    </h1>
                    {/* <h3 className="subHeading">CCTV Camera, UPS, Inverter, Battery, Complete Electronic and Security Systems</h3>
                    <h3 className="address">90/B, Saraswati Colony, Damoh Naka, Jabalpur (M.P)</h3>
                    <h4 className="email">jainfotech25@gmail.com</h4> */}
                </div>
            </div>
            <div className="headerMiddle">
                <span className="subHeading">CCTV Camera, UPS, Inverter, Battery, Complete Electronic and Security Systems</span>
            </div>
            <div className="information">
                <div className="infoLeft">
                    <h4 className="billno"> <span style={{color:"#DC3545"}} >Invoice No.-</span> {info.billno}</h4>
                    <h4 className="date"> <span style={{color : "#314E85"}} >Date</span>  : {date}</h4>
                </div>
                <p className="name"><span style={{color : "#585858",fontWeight : "normal"}} >Invoice To :</span> <br/> {info.to}</p>
            </div>
            <div className="description">
                <table className='goodsTable'>
                    <tbody>
                        <tr>
                            <th className='sno' >Sno.</th>
                            <th className='goods' >Description of Goods</th>
                            <th className='sm' >Qty</th>
                            <th className='sm ' >Rate</th>
                            <th className='sm' >Amount</th>
                        </tr>  
                        {formFields.map((data,i)=>(<tr key={i}>
                            <td className='tableItems' >{i+1}</td>
                            <td>{data.name}</td>
                            <td className='tableItems'>{data.quantity}{data.label}</td>
                            <td className='tableItems price'>{data.rate}</td>
                            <td className='tableItems price'>{data.amount}</td>
                        </tr>))}
                        {
                            dummy.splice(formFields.length).map((i)=>(
                                <tr key={i}>
                                    <td className='tableItems' >&nbsp;</td>
                                    <td></td>
                                    <td className='tableItems'></td>
                                    <td className='tableItems price'></td>
                                    <td className='tableItems price'></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <table className='total'  style={{borderTop : "none"}} >
                    <tbody>
                        <tr>
                            <td style={{borderBottom : "1px solid"}} >Total</td>
                            <td style={{borderBottom : "1px solid"}} className='sm price' >{total}</td>
                        </tr>
                        <tr>
                            <td >SGST {info.sgst}%</td>
                            <td className='sm price' >{sgst}</td>
                        </tr>
                        <tr>
                            <td style={{borderBottom : "1px solid"}} >CGST {info.cgst}%</td>
                            <td style={{borderBottom : "1px solid"}} className='sm price' >{cgst}</td>
                        </tr>
                        <tr>
                            <td >Grand Total</td>
                            <td className='sm price'>{total+sgst+cgst}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bottom">
                <div className="bottomLeft">
                    {/* <span className="contact">Contact</span> */}
                    <span className="email">Email : jainfotech25@gmail.com</span>
                    <span className="mob">Mob No.: 8370085891 <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9424603651</span>
                </div>
                <div className="bottomRight">
                    <img src="/images/seal.jpg" alt=""  />
                    <span className="seal">JAI INFOTECH</span>
                </div>
            </div>
            <div className="footer">
                <span className="addHeading">Address</span>
                <span className="address">90/B, Saraswati Colony, Damoh Naka, Jabalpur (M.P)</span>
            </div>
        </div>
    </div>
  )
})

export default Print
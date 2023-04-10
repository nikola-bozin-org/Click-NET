import React from 'react';
import './table.css';


const tableInfo = {
  number: 'T001',
  opener: 'Admin',
  openedAt: '2023-03-15',
};

const capitalizeFirstLetter = (str)=> {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}


const TableRow = ({data, headersLength}) => {
  // console.info(data);
  const keys = Object.keys(data);
  const isValidElement = (value) => {
    return !Array.isArray(value) && (typeof value !== 'object' || value === null);
  };
  return (
    <tr style={{width: '100%',display: 'grid',gridTemplateColumns: `repeat(${headersLength}, 1fr)`}} className='table-row'>
 {keys.map((key) => {
        if (isValidElement(data[key])) {
          return (
            <td className="borderBottom borderRight borderLeft" key={key}>
              {data[key] === data.paymentAmount && data[key] >= 0 ? `+${data[key]}` : data[key]}
            </td>
          );
        }
        return null;
      })}
    </tr>
  );
};


const Table = ({headers,tableData}) => {
  const headersLength = headers.length;
  // const totalAmount = tableData.reduce((sum, data) => sum + data.paymentAmount, 0);
  return (
    <div className="table-container">
      {/* <div className="table-info">
        <p>Number: {tableInfo.number}</p>
        <p>Opener: {tableInfo.opener}</p>
        <p>Opened At: {tableInfo.openedAt}</p>
      </div> */}
      <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr style={{display: "grid",gridTemplateColumns:`repeat(${headersLength}, 1fr)`}}>
            {headers.map((header,index)=>{
              const finalHeader = capitalizeFirstLetter(header);
              if(index===0){
                return <th key={index} className='roundTopLeftEdge'>{finalHeader}</th>
              }else if(index===headersLength-1){
                return <th key={index} className='roundTopRightEdge'>{finalHeader}</th>
              }
                return <th key={index}>{finalHeader}</th>
             })}
          </tr>
        </thead>
        <tbody className='table-body'>
          {tableData.map((data, index) => (
            <TableRow key={index} data={data} headersLength={headersLength}/>
          ))}
        </tbody>
      </table>
      </div>
      {/* <div className="total-amount">
        <p>Total Amount: {totalAmount}</p>
      </div> */}
    </div>
  );
};

export default Table;

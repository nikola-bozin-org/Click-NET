import React from 'react';
import './table.css';

const capitalizeFirstLetter = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const TableRow = ({ data, headersLength }) => {
  const keys = Object.keys(data);
  const isValidElement = (value) => {
    return !Array.isArray(value) && (typeof value !== 'object' || value === null);
  };
  return (
    <tr style={{gridTemplateColumns: `repeat(${headersLength}, 1fr)` }} className='table-row'>
      {keys.map((key) => {
        if (isValidElement(data[key])) {
          return (
            <td className="borderBottom borderRight borderLeft table-row-data" key={key}>
              {data[key] === data.paymentAmount && data[key] >= 0 ? `+${data[key]}` : data[key]}
            </td>
          );
        }
        return null;
      })}
    </tr>
  );
};


const Table = ({ headers, tableData }) => {
  const headersLength = headers.length;
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr style={{ display: "grid", gridTemplateColumns: `repeat(${headersLength}, 1fr)` }}>
              {headers.map((header, index) => {
                const finalHeader = capitalizeFirstLetter(header);
                if (index === 0) {
                  return <th key={index} className='table-head-row roundTopLeftEdge'>{finalHeader}</th>
                } else if (index === headersLength - 1) {
                  return <th key={index} className='table-head-row roundTopRightEdge'>{finalHeader}</th>
                }
                return <th className='table-head-row' style={{fontWeight:'normal'}} key={index}>{finalHeader}</th>
              })}
            </tr>
          </thead>
          <tbody className='table-body'>
            {tableData.map((data, index) => (
              <TableRow key={index} data={data} headersLength={headersLength} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

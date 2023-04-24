import React from 'react';
import './table.css';
import { capitalizeFirstLetter, isValidElement } from '../../utils';
import { useContext } from 'react';
import { UsersContext } from '../../contexts/UsersContext';
import { AppContext } from '../../contexts/AppContext';
import { tableRowClickedBehaviour } from '../../config'

const TableRow = ({ data, headersLength, clickedBehaviour }) => {
  const usersContext = useContext(UsersContext);
  const appContext = useContext(AppContext);

  const onClick = () => {
    if(clickedBehaviour===tableRowClickedBehaviour.NotClickable) return;
    if (clickedBehaviour === tableRowClickedBehaviour.User) {
      usersContext.setShowUserData(true);
      usersContext.setUserData(appContext.users.find(user => user.username === data.username));
    }
  }

  const keys = Object.keys(data);
  return (
    <tr onClick={onClick} style={{ gridTemplateColumns: `repeat(${headersLength}, 1fr)` }} className='table-row'>
      {keys.map((key) => {
        if (isValidElement(data[key])) {
          return (
            <td className={`${clickedBehaviour===tableRowClickedBehaviour.NotClickable?'':'cursor-is-pointer'} borderBottom borderRight borderLeft table-row-data`} key={key}>
              {data[key] === data.paymentAmount && data[key] >= 0 ? `+${data[key]}` : data[key]}
            </td>
          );
        } else {
          console.info("INVALIDDDDDDDD")
        }
        return null;
      })}
    </tr>
  );
};


const Table = ({ headers, tableData, shouldRoundEdges, heightReduction = 300, rowClickedBehaviour = tableRowClickedBehaviour.NotClickable}) => {
  const headersLength = headers.length;
  return (
    <div className="table-container">
      <div style={{ maxHeight: `calc(100vh - ${heightReduction}px)` }} className="table-wrapper">
        <table className="table">
          <thead>
            <tr style={{ display: "grid", gridTemplateColumns: `repeat(${headersLength}, 1fr)` }}>
              {headers.map((header, index) => {
                const finalHeader = capitalizeFirstLetter(header);
                if (index === 0) {
                  return <th key={index} className={`table-head-row ${shouldRoundEdges ? 'roundTopLeftEdge' : ''}`}>{finalHeader}</th>
                } else if (index === headersLength - 1) {
                  return <th key={index} className={`table-head-row ${shouldRoundEdges ? 'roundTopRightEdge' : ''}`}>{finalHeader}</th>
                }
                return <th className='table-head-row' style={{ fontWeight: 'normal' }} key={index}>{finalHeader}</th>
              })}
            </tr>
          </thead>
          <tbody className='table-body'>
            {tableData.map((data, index) => (
              <TableRow key={index} data={data} headersLength={headersLength} clickedBehaviour={rowClickedBehaviour} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

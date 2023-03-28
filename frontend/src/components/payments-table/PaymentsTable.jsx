import React from 'react';
import './paymentsTable.css';

const mockupData = [
  {
    paymentDate: '2023-03-24',
    receipt: 'R12345',
    username: 'JohnDoe',
    paymentAmount: 100,
  },
  {
    paymentDate: '2023-03-23',
    receipt: 'R12346',
    username: 'JaneDoe',
    paymentAmount: 150,
  },
  {
    paymentDate: '2023-03-22',
    receipt: 'R12347',
    username: 'Alice',
    paymentAmount: 200,
  },
  {
    paymentDate: '2023-03-21',
    receipt: 'R12348',
    username: 'Bob',
    paymentAmount: 250,
  },
  {
    paymentDate: '2023-03-20',
    receipt: 'R12349',
    username: 'Charlie',
    paymentAmount: 300,
  },
  {
    paymentDate: '2023-03-19',
    receipt: 'R12350',
    username: 'Dave',
    paymentAmount: 350,
  },
  {
    paymentDate: '2023-03-18',
    receipt: 'R12351',
    username: 'Eve',
    paymentAmount: 400,
  },
  {
    paymentDate: '2023-03-17',
    receipt: 'R12352',
    username: 'Frank',
    paymentAmount: 450,
  },
  {
    paymentDate: '2023-03-16',
    receipt: 'R12353',
    username: 'Grace',
    paymentAmount: 500,
  },
  {
    paymentDate: '2023-03-15',
    receipt: 'R12354',
    username: 'Heidi',
    paymentAmount: 550,
  },
  {
    paymentDate: '2023-03-15',
    receipt: 'R12354',
    username: 'Heidi',
    paymentAmount: 550,
  },
  {
    paymentDate: '2023-03-15',
    receipt: 'R12354',
    username: 'Heidi',
    paymentAmount: 550,
  },
  {
    paymentDate: '2023-03-15',
    receipt: 'R12354',
    username: 'Heidi',
    paymentAmount: 550,
  },
  {
    paymentDate: '2023-03-15',
    receipt: 'R12354',
    username: 'Heidi',
    paymentAmount: 550,
  },
  {
    paymentDate: '2023-03-15',
    receipt: 'R12354',
    username: 'Heidi',
    paymentAmount: 550,
  },
  {
    paymentDate: '2023-03-15',
    receipt: 'R12354',
    username: 'Heidi',
    paymentAmount: 550,
  },
  {
    paymentDate: '2023-03-15',
    receipt: 'R12354',
    username: 'Heidi',
    paymentAmount: 550,
  },
  {
    paymentDate: '2023-03-15',
    receipt: 'R12354',
    username: 'Heidi',
    paymentAmount: 550,
  },
];

const tableInfo = {
  number: 'T001',
  opener: 'Admin',
  openedAt: '2023-03-15',
};

const TableRow = ({ paymentDate, receipt, username, paymentAmount }) => {
  return (
    <tr>
      <td className='borderBottom borderRight borderLeft'>{paymentDate}</td>
      <td className='borderBottom borderRight borderLeft'>{receipt}</td>
      <td className='borderBottom borderRight borderLeft'>{username}</td>
      <td className='borderBottom borderRight borderLeft'>{paymentAmount>=0?`+${paymentAmount}`:paymentAmount}</td>
    </tr>
  );
};

const PaymentsTable = () => {
  const totalAmount = mockupData.reduce((sum, data) => sum + data.paymentAmount, 0);
  return (
    <div className="payment-table-container">
            <div className="table-info">
        <p>Number: {tableInfo.number}</p>
        <p>Opener: {tableInfo.opener}</p>
        <p>Opened At: {tableInfo.openedAt}</p>
      </div>
      <table className="payment-table">

        <thead>
          <tr>
            <th className='roundTopLeftEdge'>Payment Date</th>
            <th>Receipt</th>
            <th>Username</th>
            <th className='roundTopRightEdge'>Payment Amount</th>
          </tr>
        </thead>
        <tbody style={{maxHeight:'500px',overflow:'scroll'}}>
          {mockupData.map((data, index) => (
            <TableRow key={index} {...data} />
          ))}
        </tbody>
      </table>
      <div className="total-amount">
        <p>Total Amount: {totalAmount}</p>
      </div>
    </div>
  );
};

export default PaymentsTable;

import React from 'react'
import './logedInUsersTable.css'

const loggedInUsersData = [
    {
      username: 'JohnDoe',
      balance: 1000,
    },
    {
      username: 'JaneDoe',
      balance: 1500,
    },
  ];

  const TableRow = ({ username, balance }) => {
    return (
      <tr>
        <td className='borderBottom borderRight borderLeft'>{username}</td>
        <td className='borderBottom borderRight borderLeft'>{balance}</td>
      </tr>
    );
  };

const LogedInUsersTable = () => {
  return (
        <div className="loggedIn-users-table-container">
          <table className="loggedIn-users-table">
            <thead>
              <tr>
              <th className='roundTopLeftEdge'>Username</th>
        <th className='roundTopRightEdge'>Balance</th>
      </tr>
    </thead>
    <tbody>
      {loggedInUsersData.map((data, index) => (
        <TableRow key={index} {...data} />
      ))}
    </tbody>
  </table>
</div>
  )
}

export default LogedInUsersTable
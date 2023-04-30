import React from 'react';
import './Games.css';
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalSearch from '../internal-search/InternalSearch'
import HandleButton from '../handle-button/HandleButton';
import Table from '../table/Table';
import { tableRowClickedBehaviour } from '../../config';
import x from '../../images/clickLogo.png'

const Games = () => {

  const onClickAddGame = () => {

  }

  return (
    <div className='games'>
      <InternalTopbar text={'Games'} useBorderBottom={true} />
      <div className="games-search-and-add">
        <InternalSearch placeholderText={'Game...'} useBorderBottom={false} />
        <HandleButton onClick={onClickAddGame} text={'Add game'} className={'add-game-button'} circleColor={'#cc2234'} />
      </div>
      <div className="all-games">
        <div className="all-games-headers">
          </div>
      </div>
    </div>
  )
}

const Game = () => {
  return (
    <div className="game">
      Game
    </div>
  )
}

export default Games
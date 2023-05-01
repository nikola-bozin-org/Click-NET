import React from 'react';
import './Games.css';
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalSearch from '../internal-search/InternalSearch'
import HandleButton from '../handle-button/HandleButton';
import Table from '../table/Table';
import { tableRowClickedBehaviour } from '../../config';
import x from '../../images/clickLogo.png'
import statistics from '../../images/statistics.png'

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
        <GameRow className='custom-game-row' name={'Name'} category={'Category'} lastModified={'Last Modified'} isJustIconText={true} isJustStatsText={true} isJustEnabledText={true} />
        <GameRow name={'Steam'} icon={x} category={'App'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
        <GameRow name={'Steam'} icon={x} category={'Game'} lastModified={'16.6.2021 - 16:24'} />
      </div>
    </div>
  )
}

const GameRow = ({ name, icon, category, lastModified, isJustIconText = false, isJustStatsText = false, isJustEnabledText = false, useBorderRight = true, className = '' }) => {
  return (
    <div className={`game-row ${className}`}>
      <div className={`gr-select ${useBorderRight ? 'use-border-right' : ''}`}>
        <div className="gr-select-clickable">
        </div>
      </div>
      <div className={`gr-icon ${useBorderRight ? 'use-border-right' : ''}`}>
        {isJustIconText ? 'Icon' : <img src={icon} className='gr-icon-img' />}
      </div>
      <div className={`gr-name ${useBorderRight ? 'use-border-right' : ''}`}>
        <p>{name}</p>
      </div>
      <div className={`gr-category ${useBorderRight ? 'use-border-right' : ''}`}>
        {category}
      </div>
      <div className={`gr-last-modified ${useBorderRight ? 'use-border-right' : ''}`}>
        {lastModified}
      </div>
      <div className={`gr-open-stats ${useBorderRight ? 'use-border-right' : ''}`}>
        {isJustStatsText?'Stats': <img src={statistics} className="stats-img invertColor"/>}
      </div>
      <div className={`gr-is-enabled `}>
        {/* ovo crveno za disabled i zeleno za enabled */}
        {isJustEnabledText ? 'Enabled' : <button className="xbutton">Handle</button>}
      </div>
    </div>
  )
}

export default Games
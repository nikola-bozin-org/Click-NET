import React, { useEffect, useState } from 'react';
import './Games.css';
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalSearch from '../internal-search/InternalSearch'
import HandleButton from '../handle-button/HandleButton';
import x from '../../images/clickLogo.png'
import statistics from '../../images/statistics.png'
import { useSelector } from 'react-redux'
import {extractDate, extractHours} from '../../utils'
import AddGame from '../add-game/AddGame';


const Games = () => {
  const allGames = useSelector((state)=>state.games.allGames);
  const [shouldShowAddGame,setShouldShowAddGame] = useState(false);
  const [tableData,setTableData] = useState(allGames); 

  const onClickAddGame = () => {
    setShouldShowAddGame(true);
  }
  const addGameOnCancelClick = () =>{
    setShouldShowAddGame(false);
  }

  const onSearchInputChange = (e)=>{
    const value = e.target.value;
    if(value===''){setTableData(allGames);return;}
    const filteredGames = allGames.filter((data)=>data.name.toLowerCase().includes(value))
    setTableData(filteredGames);
  }

  return (
    <>
    {shouldShowAddGame&& <AddGame onCancelClick={addGameOnCancelClick}/>}
    <div className='games'>
      <InternalTopbar text={'Games'} useBorderBottom={true} />
      <div className="games-search-and-add">
        <InternalSearch onChange={onSearchInputChange} placeholderText={'Game...'} useBorderBottom={false} />
        <HandleButton onClick={onClickAddGame} text={'Add game'} className={'add-game-button'}/>
      </div>
      <div className="all-games">
        <GameRow className='custom-game-row' name={'Name'} zone={'Zone'} category={'Category'} lastModified={'Last Modified'} isJustIconText={true} isJustStatsText={true} isJustEnabledText={true}/>
        {tableData.map((game,index)=>(
          <GameRow key={index} name={game.name} icon={x} zone={game.zone} category={game.category} lastModified={`${extractDate(game.lastModified)} - ${extractHours(game.lastModified)}`}/>
        ))}
      </div>
    </div>
    </>
  )
}

const GameRow = ({ name, icon, zone, category, lastModified, isEnabled, isJustIconText = false, isJustStatsText = false, isJustEnabledText = false, useBorderRight = true, className = '', useCustomHeight }) => {
  return (
    <div className={`game-row ${className}`}>
      <div style={{height:`${!isJustIconText?'100px':'100%'}`}} className={`gr-icon  ${useBorderRight ? 'use-border-right' : ''}`}>
        {isJustIconText ? 'Icon' : <img alt=''   src={icon} className='gr-icon-img' />}
      </div>
      <div className={`gr-name ${useBorderRight ? 'use-border-right' : ''}`}>
        <p>{name}</p>
      </div>
      <div className={`gr-category ${useBorderRight ? 'use-border-right' : ''}`}>
        {zone}
      </div>
      <div className={`gr-last-modified ${useBorderRight ? 'use-border-right' : ''}`}>
        {lastModified}
      </div>
      <div className={`gr-open-stats ${useBorderRight ? 'use-border-right' : ''}`}>
        {isJustStatsText?'Stats': <img alt='' src={statistics} className="stats-img invertColor"/>}
      </div>
      <div className={`gr-is-enabled `}>
        {isJustEnabledText ? 'Enabled' : <button className="xbutton">Handle</button>}
      </div>
    </div>
  )
}

export default Games
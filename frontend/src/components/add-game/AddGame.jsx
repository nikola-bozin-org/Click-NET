import React, { useState } from 'react';
import './AddGame.css';
import { addGame, appCategories, zones } from '../../config'
import check from '../../images/check.png'
import HandleButton from '../handle-button/HandleButton';
import FetchError from '../fetch-error/FetchError'
import FetchSuccess from '../fetch-success/FetchSuccess'
import { addNewGame } from '../../redux/gamesSlice';
import { useDispatch } from 'react-redux';


const AddGame = ({ onCancelClick }) => {
    const [inputName, setInputName] = useState('');
    const [inputInstallationPath, setInputInstallationPath] = useState('');
    const [enableNow, setEnableNow] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(appCategories.Game)
    const [selectedZone, setSelectedZone] = useState(zones.Pro);
    const [showFetchError, setShowFetchError] = useState(false);
    const [showFetchSuccess, setShowFetchSuccess] = useState(false);
    const [fetchMessage, setFetchMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');


    const dispatch = useDispatch();

    const onNameInputChanged = (e) => {
        setInputName(e.target.value)
    }
    const onInstallationPathChanged = (e) => {
        setInputInstallationPath(e.target.value);
    }
    const onEnableNowCheckboxClicked = () => {
        setEnableNow(!enableNow);
    }
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleZoneChange = (event) => {
        setSelectedZone(event.target.value);
    };
    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);

        let reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(event.target.files[0]);
    };


    const createNewGame = async () => {
        setShowFetchError(false);
        setShowFetchSuccess(false);
        const formData = new FormData();
        formData.append('name', inputName);
        formData.append('category', selectedCategory);
        formData.append('zone', selectedZone);
        formData.append('installationPath', inputInstallationPath);
        formData.append('isEnabled', enableNow);
        formData.append('game-image', selectedFile); 
        const response = await fetch(addGame, {
            headers: {
                'token': localStorage.getItem('accessToken')
            },
            method: "POST",
            body:formData
        });
        const result = await response.json();
        let errorMessage = 'Server Error: Wrong data.';
        if (result.error) {
            if (result.error.includes('E11000')) errorMessage = 'Game already exist.';
            setFetchMessage(errorMessage);
            setShowFetchError(true);
            return;
        }
        setFetchMessage(result.message);
        setShowFetchSuccess(true);
        console.info(result.game)
        dispatch(addNewGame({ game: result.game }))
        setTimeout(() => {
            onCancelClick();
        }, 2000)
    }

    return (
        <div className='AddGame'>
            <div className="add-game-content">
                <p className='ag-add-game-text'>Add Game</p>
                <div className="ag-element ag-category">
                    <p>Category</p>
                    <select onChange={handleCategoryChange}>
                        {Object.entries(appCategories).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="ag-element ag-name">
                    <p>Name</p>
                    <input className='ag-input-name' autoComplete='off' type="text" id="name" name="name" onChange={onNameInputChanged} />
                </div>
                <div className="ag-element ag-icon">
                    <p>Image</p>
                    <input type="file" id="file" className="ag-icon-input" onChange={onFileChange}/>
                    <label htmlFor="file" className={`ag-icon-label ${imagePreviewUrl?'use-border-none':''}`}>
                        {imagePreviewUrl
                            ? <img className='uploaded-image' src={imagePreviewUrl} alt="preview" />
                            : null
                        }
                    </label>
                </div>

                <div className="ag-element ag-zone">
                    <p>Zone</p>
                    <select onChange={handleZoneChange}>
                        {Object.entries(zones).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                        <option>Both</option>
                    </select>
                </div>
                <div className="ag-element ag-installation-path">
                    <p>Installation Path</p>
                    <input className='ag-input-name' autoComplete='off' type="text" id="installationPath" name="installationPath" onChange={onInstallationPathChanged} />
                </div>
                <div className="ag-element ag-enable-now">
                    <p>Enable Now</p>
                    <div className="ag-enable-now-checkbox-wrap">
                        <div onClick={onEnableNowCheckboxClicked} className="ag-enable-now-checkbox">
                            {enableNow && <img src={check} alt="" className="ag-enable-now-check invertColor" />}
                        </div>
                    </div>
                </div>
                <div className="ag-buttons">
                    <div className="ag-buttons-wrap">
                        <HandleButton onClick={onCancelClick} text={'Cancel'} className={'cancelCreation'} />
                        <HandleButton onClick={createNewGame} text={'Add'} className={'saveCreation'} />
                    </div>
                    <FetchError marginTopValue={20} showMessage={showFetchError} message={fetchMessage} onDelayCompleted={() => { setShowFetchError(false) }} />
                    <FetchSuccess marginTopValue={20} showMessage={showFetchSuccess} message={fetchMessage} onDelayCompleted={() => { setShowFetchSuccess(false) }} />
                </div>
            </div>
        </div>
    )
}

export default AddGame
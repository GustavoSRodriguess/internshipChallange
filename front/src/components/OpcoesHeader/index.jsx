import { Link } from 'react-router-dom';
import './index.css';
import { useState } from 'react';

const pathOptions = ['PRODUCTS', 'CATEGORIES', 'HISTORY'];

function OpcoesHeader() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className='opcoesContainer'>
            <ul className='opcoesUl'>
                {pathOptions.map((text, index) => (
                    <Link key={index} to={`${text.toLocaleLowerCase()}`} className='linkOpt'>
                        <li
                            className='opcao'
                            style={{ color: selectedOption === text ? '#d4a916' : '#d1d0c5' }}
                            onClick={() => handleOptionClick(text)}
                        >
                            <p>{text}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default OpcoesHeader;
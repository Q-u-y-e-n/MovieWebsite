
import React, { useState } from 'react'

import PropTypes from "prop-types";

function Header({ onSearch }) {

    const [textSearch, setTextSearch] = useState('')

    return <div className="p-4 bg-black flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <h1 className="text-[40px] uppercase font-bold text-red-700">Movie</h1>
            <nav className="flex items-center space-x-3">
                <a href="#" className="text-white">Home</a>
                <a href="#" className="text-white">About</a>
                <a href="#" className="text-white">Contact</a>
            </nav>
        </div>
        <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search" className="p-3 text-black" onChange={(e) => setTextSearch(e.target.value)} value={textSearch} />
            <button onClick={() => onSearch(textSearch)} className="p-2 text-white bg-red-600">Search</button>
        </div>
    </div>;
}
Header.PropTypes = {
    onSearch: PropTypes.func
}

export default Header
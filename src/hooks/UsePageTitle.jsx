import React, { useEffect } from 'react';

const UsePageTitle = (title) => {
    useEffect(()=>{
        document.title = title ? `Library | ${title}` : "Library";
    },[title]);
};

export default UsePageTitle;
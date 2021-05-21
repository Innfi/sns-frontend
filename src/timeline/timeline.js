import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


export default function TimelineCards() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

    }, [dispatch]);

    return (
        <div>
            <a>start from here</a>
        </div>
    );
}
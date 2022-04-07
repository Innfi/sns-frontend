import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loadTimelineThunk } from '../redux/reducks';
import { TimelineUnit } from './timelineUnit';

export function TimelineCards() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authData = useSelector((state) => state.snsReducer.authData);

  const [isLoading, setIsLoading] = useState(false);
  const userTimeline = useSelector((state) => state.snsReducer.timeline);

  const userId = authData.userId;

  useEffect(() => {
    const loadTimeline = async () => {
      setIsLoading(true);
      await dispatch(loadTimelineThunk({ userId: userId }, history));
      setIsLoading(false);
    };

    loadTimeline();
  }, [dispatch]);

  if (isLoading)
    return (
      <div>
        <p>loading...</p>
      </div>
    );

  return userTimeline.map((unit, index) => (
    <TimelineUnit props={unit} key={index} />
  ));
}

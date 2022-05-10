import React, {useLayoutEffect, useState} from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

export const history = createBrowserHistory();


export const HistoryRouter = ({ basename, children, history }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}
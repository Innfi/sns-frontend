import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

export default function TestPage() {
  const userState = useSelector((state) => state.snsReducer);

  if (!userState.authData?.token) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h2">not authenticated</Typography>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <h2>test page</h2>
      <p>{userState.userData.msg}</p>
      <p>{userState.userData.date}</p>
    </div>
  );
}

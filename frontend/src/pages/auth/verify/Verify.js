import React from 'react';
import { verifyEmail } from '../../../store/actions/authActions';
import { useDispatch } from 'react-redux';

const Verify = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const token = params.get('token');
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, []);

  return (
    <></>
  );
}

export default Verify;


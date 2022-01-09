import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Alert, Button } from 'reactstrap';
import Widget from '../../../components/Widget';
import { registerUser, authError, loginUser } from '../../../store/actions/authActions';
import microsoft from '../../../images/microsoft.png';

    const Register = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const isFetching = useSelector((store) => store.auth.isFetching);
    const errorMessage = useSelector((store) => store.auth.errorMessage);

    const dispatch = useDispatch();

    const changeEmail = (event) => {
    setEmail(event.target.value);
    };

    const changePassword = (event) => {
    setPassword(event.target.value);
    };

    const changeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    };

    const checkPassword = () => {
    if (!isPasswordValid()) {
    if (!password) {
    dispatch(authError('Password field is empty'));
    } else {
    dispatch(authError('Passwords are not equal'));
    }
    setTimeout(() => {
    dispatch(authError());
    }, 3 * 1000);
    }
    };

    const isPasswordValid = () => {
    return password && password === confirmPassword;
    };

    const doRegister = (e) => {
    e.preventDefault();
    if (!isPasswordValid()) {
    checkPassword();
    } else {
    dispatch(
    registerUser({
    email,
    password,
    }),
    );
    }
    };

    const googleLogin = React.useCallback(() => {
    dispatch(loginUser({ social: 'google' }));
    }, []);

    const microsoftLogin = React.useCallback(() => {
    dispatch(loginUser({ social: 'microsoft' }));
    }, []);

    return (
    <div className="auth-page">
        <Container>
            <h5 className="auth-logo">
                <i className="la la-circle text-gray"/>
                react
                <i className="la la-circle text-warning"/>
            </h5>
            <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Create an account</h3>}>
            <p className="widget-auth-info">Please fill all fields below</p>
            <form className="mt" onSubmit={doRegister}>
            {errorMessage && (
            <Alert className="alert-sm" color="danger">
                {errorMessage}
            </Alert>
            )}
            <div className="form-group">
                <input
                        className="form-control no-border"
                        defaultValue={email}
                type={'email'}
                onChange={changeEmail}
                required
                name="email"
                placeholder="Email"
                />
            </div>
            <div className="form-group">
                <input
                        className="form-control no-border"
                        defaultValue={password}
                onChange={changePassword}
                type="password"
                required
                name="password"
                placeholder="Password"
                />
            </div>
            <div className="form-group">
                <input
                        className="form-control no-border"
                        defaultValue={confirmPassword}
                onChange={changeConfirmPassword}
                onBlur={checkPassword}
                type="password"
                required
                name="confirmPassword"
                placeholder="Confirm"
                />
            </div>
            <Button type="submit" color="inverse" className="auth-btn mb-3" size="sm">
                {isFetching ? 'Loading...' : 'Register'}
            </Button>
            <p className="widget-auth-info">or sign up with</p>
     {/*       <div className="social-buttons">
                <Button onClick={googleLogin} color="primary" className="social-button mb-2">
                <i className="social-icon social-google"/>
                <p className="social-text">GOOGLE</p>
            </Button>
            <Button onClick={microsoftLogin} color="success" className="social-button">
            <i
                    className="social-icon social-microsoft"
                    style={{ backgroundImage: `url(${microsoft})` }}
            />
            <p className="social-text">MICROSOFT</p>
        </Button>
            </div> */}
</form>
    <p className="widget-auth-info">Already have the account? Login now!</p>
    <Link className="d-block text-center" to="login">
        Enter the account
    </Link>
</Widget>
        </Container>
<footer className="auth-footer">
{new Date().getFullYear()} &copy; Facial Recognition Recommendation System.
</footer>
        </div>
        );
        };

export default Register;

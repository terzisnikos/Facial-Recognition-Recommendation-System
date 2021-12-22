import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container,
    Alert,
    Button,
    FormGroup,
    Label,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input
    } from 'reactstrap';
import Widget from '../../../components/Widget';
import { loginUser, receiveToken, doInit } from '../../../store/actions/authActions';
import jwt from 'jsonwebtoken';
import microsoft from '../../../images/microsoft.png';
import { push } from 'connected-react-router';
import { useLocation } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('admin@flatlogic.com');
    const [password, setPassword] = useState('password');

    const location = useLocation();

    const dispatch = useDispatch();
    const authStore = useSelector((store) => store.auth);

    const changeEmail = (event) => {
    setEmail(event.target.value);
    };

    const changePassword = (event) => {
    setPassword(event.target.value);
    };

    const doLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    };

    const googleLogin = () => {
    dispatch(loginUser({ social: 'google' }));
    };

    const microsoftLogin = () => {
    dispatch(loginUser({ social: 'microsoft' }));
    };

    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
    dispatch(receiveToken(token));
    dispatch(doInit());
    }
    }, []);

    const signUp = () => {
    dispatch(push('/register'));
    };

    return (
            <div className="auth-page">
                <Container>
                    <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Login to your Web App</h3>}>
                        <p className="widget-auth-info">
                            Use your email to sign in.
                        </p>
                        <Alert className="alert-sm text-center mt-2 widget-middle-overflow rounded-0" color="secondary">
                            This is a real app with Node.js backend - use
                            <br/>
                            <span className="font-weight-bold">"admin@flatlogic.com / password"</span>
                            <br/>
                            to login!
                        </Alert>
                        <form onSubmit={doLogin}>
                            {authStore.errorMessage && (
                                    <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                                        {authStore.errorMessage}
                                    </Alert>
                                )
                            }
                            <FormGroup className="mt">
                                <Label for="email">Email</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-user text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="email" className="input-transparent pl-3" value={email} onChange={changeEmail} type="email"
                                           required name="email" placeholder="Email"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-lock text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="password" className="input-transparent pl-3" value={password}
                                           onChange={changePassword} type="password"
                                           required name="password" placeholder="Password"/>
                                </InputGroup>
                            </FormGroup>
                            <div className="bg-widget auth-widget-footer">
                                <Button type="submit" color="danger" className="auth-btn"
                                        size="sm">
                                    <span className="auth-btn-circle">
                                        <i className="la la-caret-right"/>
                                    </span>
                                    {authStore.isFetching ? 'Loading...' : 'Login'}
                                </Button>
                                <p className="widget-auth-info mt-4">
                                    Don't have an account? Sign up now!
                                </p>
                                <Link className="d-block text-center mb-4" to="register">Create an Account</Link>
                                <div className="social-buttons">
                                    <Button onClick={googleLogin} color="primary" className="social-button">
                                        <i className="social-icon social-google"/>
                                        <p className="social-text">GOOGLE</p>
                                    </Button>
                                    <Button onClick={microsoftLogin} color="success" className="social-button">
                                        <i className="social-icon social-microsoft"
                                           style={{backgroundImage: `url(${microsoft})`}}/>
                                        <p className="social-text">MICROSOFT</p>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Widget>
                </Container>
                <footer className="auth-footer">
                    Facial Recognition Recommendation System
                            =======
                    Facial Recognition Recommendation System. Made by <a href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic LLC</a>
                </footer>
            </div>
        );
}

Login.isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    if (!data) return;
    return date < data.exp;
};

export default Login;

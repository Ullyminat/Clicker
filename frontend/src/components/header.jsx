import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { publicRoutes } from '../config/routes';
import { Link, useNavigate } from 'react-router-dom';
import userStore from '../stores/userStore';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import exit from "./../assets/exit.svg"

const Header = observer(() => {
    const navigate = useNavigate();

    const logout = () => {
        userStore.logoutUser();
        toast.info('Вы вышли с аккаунта!');
        navigate('/auth');
    };

    useEffect(() => {
        if (userStore.isAuth) {
            navigate('/');
        }
    }, [userStore.isAuth, navigate]);

    return (
        <Container>
            <Navbar
                id="navbar"
                expand="lg"
                bg="dark"
                variant="dark"
                style={{ borderRadius: '0 0 25px 25px', padding: '15px 10px' }}
            >
                <Navbar.Toggle className="mx-auto" aria-controls="burger" />
                <Navbar.Collapse id="burger">
                    {userStore.isAuth ? (
                        <Button
                            className="ms-auto mx-5 text-dark"
                            type="button"
                            variant="none"
                            onClick={() => {
                                logout();
                            }}
                        >
                            <img style={{height: "25.09px"}} src={exit}/>
                        </Button>
                    ) : (
                        <Nav style={{ alignItems: 'center' }} className="mx-auto">
                            {publicRoutes.map((el, i) => (
                                <Nav.Link key={i} to={el.path} as={Link}>
                                    {el.name}
                                </Nav.Link>
                            ))}
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
});

export default Header;

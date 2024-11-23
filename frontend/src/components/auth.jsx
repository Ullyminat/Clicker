import { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react';
import userStore from '../stores/userStore';

const Auth = observer(() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authorizate = () => {
        setUsername('');
        setPassword('');
        userStore.authUser({ username, password });
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center pt-5">
            <Row className="w-100">
                <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
                    <Form className="p-4 border rounded shadow">
                        <h3 className="text-center mb-4">Авторизация</h3>
                        <Form.Group>
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Введите логин"
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Введите пароль"
                            />
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Button
                                type="button"
                                variant="dark"
                                className="w-100"
                                onClick={authorizate}
                            >
                                Авторизоваться
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
});

export default Auth;

import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { observer } from "mobx-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"; 

const Upgrade = observer(() => {
  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:3008/clicker/buy", {
        username: localStorage.getItem("token"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      toast.success("Успешно куплено!");  
      console.log(res.data);
    } catch (error) {
      console.error("Ошибка при покупке", error);
      toast.error("Ошибка при покупке. Попробуйте снова.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center pt-5 flex-column">
      <Row className="w-100" style={{ userSelect: "none" }}>
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto border rounded shadow">
          <h3 className="text-center my-4">Улучшения</h3>
          <div className="d-flex justify-content-center align-items-center pb-3 gap-3">
            <p className="text-wrap text-center mb-0">
              1.0K кликов = 1 автоклик
            </p>
            <Button variant="dark" onClick={handleClick}>
              Купить
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default Upgrade;

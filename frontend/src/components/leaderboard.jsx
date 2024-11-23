import { Container, Table, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react";
import axios from "axios";
import { useEffect, useState } from "react";

const Leaderboard = observer(() => {
  const [data, setData] = useState([]);

  const formatNum = (n) => {
    const suffixes = ["", "K", "M", "B", "T"];
    let index = 0;
    while (n >= 1000 && index < suffixes.length - 1) {
      n /= 1000;
      index++;
    }
    return Number.isInteger(n)
      ? `${n}${suffixes[index]}`
      : `${n.toFixed(1)}${suffixes[index]}`;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3008/user/load")
      .then((res) => {
        const { user, click } = res.data;
        const fordata = user.map((u) => {
          const userClick = click.find((c) => c.user === u._id)?.click;
          return { username: u.username, clicks: userClick };
        });
        setData(fordata);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  return (
    <Container className="d-flex justify-content-center align-items-center pt-5 flex-column">
      <Row className="w-100" style={{userSelect: "none"}}>
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto border rounded shadow">
          <h3 className="text-center my-4">Таблица лидеров</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>№</th>
                <th>Username</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {data.sort((a, b) => b.clicks - a.clicks).slice(0, 5).map((el, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{el.username}</td>
                    <td>{formatNum(el.clicks)}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
});

export default Leaderboard;

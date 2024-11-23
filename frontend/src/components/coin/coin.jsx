import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';
import './coin.css';
import Leaderboard from '../leaderboard';
import axios from 'axios';
import Upgrade from '../upgrade';

const Coin = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [click, setClick] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://localhost:3008/clicker/click', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => setClick(res.data.click))
      .catch(error => console.error('Ошибка при загрузке кликов:', error));
    }
  }, []);

  const handleClick = async () => {
    setIsClicked(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.post('http://localhost:3008/clicker/click', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setClick(res.data.click);
      } else {
        console.error('Токен отсутствует');
      }
    } catch (error) {
      console.error('Ошибка при клике', error);
    } finally {
      setTimeout(() => {
        setIsClicked(false);
      }, 300);
    }
  };

  function prettify(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center pt-5" style={{ flexDirection: "column" }}>
        <motion.div
          style={{ userSelect: "none" }}
          className="coin"
          onClick={handleClick}
          animate={{
            rotateY: isClicked ? 180 : 0,
            scale: isClicked ? 1.2 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 20,
          }}
        >
          <div className="coin-face coin-front"></div>
          <div className="coin-face coin-back">
            <span className="gif"></span>
          </div>
        </motion.div>
        <h2 className='pt-4' style={{ userSelect: "none" }}>{prettify(click)}</h2>
      </Container>
      <Upgrade />
      <Leaderboard />
    </>
  );
};

export default Coin;

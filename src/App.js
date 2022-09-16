import { createContext, useState } from 'react';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import Detail from './pages/Detail.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'

// 스테이트 보관함
export let Context1 = createContext()

function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  let [재고] = useState([10, 11, 12])

  return (

    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route path='/' element={
           <>
           <div className='main-bg' style={{ backgroundImage : 'url(' + bg + ')' }}></div>
           <div>
             <Container>
               <Row>
                 {/* <Card shoes={shoes[0]} i={1}></Card>
                 <Card shoes={shoes[1]} i={2}></Card>
                 <Card shoes={shoes[2]} i={3}></Card> */}
                 {/* 위에 코드  map  반복문으로 써보기 */}
                 {
                   shoes.map((a, i)=>{
                     return(
                       <Card shoes={shoes[i]} i={i}></Card>
                     )
                   })
                 }
               </Row>
             </Container>
           </div>
           <button onClick={()=>{ axios.get('https://codingapple1.github.io/shop/data2.json')
           .then((결과)=>{
            console.log(결과.data) 
            let copy = [...shoes, ...결과.data];
            setShoes(copy);
          })
           .catch(()=>{console.log('실패하였습니다')}) }}>더보기</button>
           </>
        } />
        <Route path='/detail/:id' element={
        <Context1.Provider value={{재고}}><Detail shoes={shoes}/></Context1.Provider>}></Route>
        
        <Route path='/about/member' element={<About/>} />
        <Route path='*' element={<div>없는페이지요</div>} />

        <Route path='/about' element={<About/>}>
          {/* nested routes */}
          <Route path='member' element={<div>멤버임</div>} />
          <Route path='location' element={<div>위치정보임</div>} />
        </Route>

        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>} />
          <Route path='two' element={<p>생일기념 쿠폰받기</p>} />
        </Route>

      </Routes>

    </div>
  );
}

function About() {
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <Col sm>
      <img src={'https://codingapple1.github.io/shop/shoes'+(props.i+1)+'.jpg'} width="80%"></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  )
}

export default App;

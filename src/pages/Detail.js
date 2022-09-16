import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
// import styled from 'styled-components';
import { Context1 } from './../App.js'

// styled-components 라는 것!!!
// let YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color : ${ props => props.bg == 'blue' ? 'white' : 'black' }; 
//     // 백그라운드가 블루일때 화이트 글씨나 블랙글씨 써주세요
//   padding : 10px
// `
// // 기존스타일도 복사 가능
// let NewBtn = styled.button(YellowBtn)`
//   //커스텀도 가능
// `

class Detail2 extends React.Component {
  // 컴포넌트 장착(monunt)될때 실행될 코드
  componentDidMount(){

  }
  // 컴포넌트 업데이트될때 실행될 코드
  componentDidUpdate() {

  }
  // 컴포넌트 삭제될때 실행될 코드
  componentWillUnmount(){

  }
}

function Detail5(props){

  let [num, setNum] = useState('')

  useEffect(()=> {
    if (isNaN(num) == true){
      alert('그러지마세요')
    }
  }, (num))
  
  return (
    <input onChange={(e)=>{setNum(e.target.value)} } />
    )
  
}


function Detail(props) {

  // 보관함 해체해주는 함수
  let {재고} = useContext(Context1)

  let [count, setCount] = useState(0)
  let [alert, setalert] = useState(true)
  let [tab, setTab] = useState(0)
  let [fade2, setFade2] = useState('')
 

  // mount, update(재렌더링)시 여기코드가 실행됨(html렌더링 후에 동작함)
  // -어려운연산, 서버에서 데이터가져오는 작업, 타이머 장착 등에 씀
  // useEffect 실행조건 넣을 수 있는 곳은 []\
  // []만 있으면 mount시에만 딱 1회만 실행함
  useEffect(()=> {
    let a = setTimeout(()=> { setalert(false) }, 2000)
    
    // 이건 useEffect 동작 전에 실행되는 return문
    return ()=> {  
      // 기존 타이머는 제거해주세요! (이런 기존코드 치우는거 여기에 많이 작성함)
      clearTimeout(a);  // 타이머 제거해주는 함수
    }
  }, [count])


  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  })

  useEffect(()=>{

    setFade2('end')
    
    return ()=> {
      setFade2('')
    }
  }, [])

  return (
    <div className="container">
      {/* "alert alert-warning"  */}
      {
        alert == true
        ? <div className={'container start ' + fade2}>
            2초 이내 구매시 할인
          </div>
        : null
      }
      {/* {count} */}
      {/* <button onClick={()=>{ setCount(count+1) }}>버튼</button> */}
        {/* <YellowBtn bg="blue">버튼</YellowBtn> */}
      <div className="row">
        {재고}
        <div className="col-md-6">
          <img src='https://codingapple1.github.io/shop/shoes1.jpg' width="100%"></img>
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ setTab(2) }} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 이 구문을 밑에 if문으로 만들어서 사용하자 {
        tab ==0 ? <div>내용0</div> : null
      }
      {
        tab ==1 ? <div>내용1</div> : null
      }
      {
        tab ==2 ? <div>내용2</div> : null
      } */}
      <TabContent tab={tab} />

    </div> 
  )
}

function TabContent({tab}){

  let {재고} = useContext(Context1)
  let [fade, setFade] = useState('')

  useEffect(()=>{

    let a = setTimeout(()=> {setFade('end')},100)
    
    return ()=> {
      clearTimeout(a)
      setFade('')
    }
  }, [tab])


  // if (props.tab == 0){
  //   return <div>내용0</div>
  // }
  // else if (props.tab == 1){
  //   return <div>내용1</div>
  // }
  // else if (props.tab == 2){
  //   return <div>내용2</div>
  // }

  return <div className={'start ' + fade}>
    { [<div>내용0 </div>, <div>내용1</div>, <div>내용2</div>][tab] }
  </div>
}

  export default Detail;
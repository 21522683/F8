import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const orders = [100, 100, 300]

function App() {

  // BÀI 1

  // const [count, setCount] = useState(1);

  // const handleCounter = () => {
  //   setCount(count + 1);
  // }

  // return (
  //   <div className="App">
  //     <h1>{count}</h1>
  //     <button onClick={handleCounter}>increase</button>
  //   </div>
  // );

  //==========================================================================

  // const [count, setCount] = useState(1);

  // const handleCounter = () => {
  //   setCount(prev => prev + 1);
  //   setCount(prev => prev + 1);
  //   setCount(prev => prev + 1);
  // }

  // return (
  //   <div className="App">
  //     <h1>{count}</h1>
  //     <button onClick={handleCounter}>increase</button>
  //   </div>
  // );

  // =================================================================

  // BÀI 2: Truyền một hàm vào làm tham số cho useState 
  // thì giá trị mà hàm đó return sẽ đc lấy làm initValue

  // const [count, setCount] = useState(() => {
  //   const total = orders.reduce((acc, cur) => acc + cur)
  //   return total;
  // });

  // const handleCounter = () => {
  //   setCount(prev => prev + 1);
  // }

  // return (
  //   <div className="App">
  //     <h1>{count}</h1>
  //     <button onClick={handleCounter}>increase</button>
  //   </div>
  // );

  // ================================================================

  //Bài 3: truyền object vào làm tham số cho useState

  const [info, setInfo] = useState({
    name: 'Phan Trọng Tính',
    age: 20,
    province: 'Cà Mau'
  });

  const handleUpdate = () => {
    // Như này thì sẽ cập nhật nguyên object mới 
    // chứ không thêm key CMND vào object ban đầu

    // setInfo({
    //   CMND: '096203012683'
    // })


    // Để đạt được thêm key CMND vào object thì 

    // cách 1
    // setInfo({
    //   ...info, 
    //   CMND: '096203012683'
    // })

    // cách 2
    setInfo(prev => {
      // Logic


      return {
        ...prev,
        CMND: '096203012683',
        SDT: '0379361211'
      }
    })
  }

  return (
    <div className="App">
      <h1>{JSON.stringify(info)}</h1>
      <button onClick={handleUpdate}>update</button>
    </div>
  );












}

export default App;

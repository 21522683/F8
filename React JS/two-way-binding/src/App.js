import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; 

const gifts = [
  'Phần thưởng số 1',
  'Phần thưởng số 2',
  'Phần thưởng số 3',
]

const courses = [
  {
    id: 1,
    name: 'NMLT'
  },
  {
    id: 2,
    name: 'OOP'
  },
  {
    id: 3,
    name: 'CTDL-GT'
  },
]

function App() {

  // Bài tập 1

  // const [gift, setGift] = useState()


  // const handleGetGift = () => {
  //   const index = Math.floor(Math.random() * gifts.length)

  //   setGift(gifts[index])
  // }

  // return (
  //   <div style={{padding: 32}}>
  //     <h1>{gift || 'Chưa có phần thưởng'}</h1>
  //     <button onClick={handleGetGift}>Lấy thưởng</button>
  //   </div>
  // );





  // Bài 2: two way binding với form input 

  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // console.log(name)
  // console.log(email)

  // const handleSubmit = () => {
  //   console.log({
  //     name,
  //     email
  //   })
  // }

  // return (
  //   <div style={{padding: 32}}>
  //     <input 
  //       type="text"
  //       onChange={e => setName(e.target.value)}
  //       value={name}/>

  //     <input 
  //       type="text"
  //       onChange={e => setEmail(e.target.value)}
  //       value={email}/>

  //     <button onClick={handleSubmit}>Submit</button>

  //   </div>
  // );

  // Bài 3: two way binding cho radio
  // const [checked, setChecked] = useState()

  // const handleSubmit = () => {
  //   console.log({id: checked})
  // }

  // return (
  //   <div style={{padding: 32}}>
  //     {courses.map(course => (
  //       <div key={course.id}>
  //         <input 
  //           type="radio"
  //           checked={checked === course.id}
  //           onChange={() => setChecked(course.id)}/>
  //         {course.name}
  //       </div>
  //     ))}

  //     <button onClick={handleSubmit}>Submit</button>

  //   </div>
  // );

  // Bài 4: two way binding cho checkbox
  // const [checked, setChecked] = useState([])
  // console.log(checked)

  // const handleCheck = (id) => {
  //   setChecked(prev => {
  //     const isChecked = checked.includes(id);
  //     if (isChecked) {
  //       return checked.filter(item => item !== id);
  //     }
  //     else {
  //       return [...prev, id];
  //     }
  //   })
  // }


  // return (
  //   <div style={{padding: 32}}>

  //     {courses.map(course => (
  //       <div key={course.id}>
  //         <input 
  //           type="checkbox"
  //           checked={checked.includes(course.id)}
  //           onChange={() => handleCheck(course.id)}/>
  //         {course.name}
  //       </div>
  //     ))}

  //   </div>
  // );


  // BÀI 5: Todolist 
  const [job, setJob] = useState('')
  const [jobList, setJobList] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs'))
    return storageJobs ?? []
  })
  
  const handleAddJob = () => {
    if (job.length > 0) {
      setJobList(prev => {
        const newJob = [...prev, job]
  
        const jsonJobs = JSON.stringify(newJob)
        localStorage.setItem('jobs', jsonJobs)
  
        return newJob
      })
      setJob('')
    }
  }

  return (
    <div style={{padding: 32}}>
      <input 
        value={job}
        onChange={e => setJob(e.target.value)}/>

      <button onClick={handleAddJob}>Add job</button>

      <ul>
        {
          jobList.map((job, index) => (
            <li key={index}>{job}</li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;

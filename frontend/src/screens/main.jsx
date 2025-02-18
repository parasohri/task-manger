import React, { useState, useEffect } from 'react';
import { apiClient } from '../../axios/axios.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Navigate, useNavigate } from 'react-router';
import { useSelector,useDispatch } from 'react-redux';
import {PieChart} from 'react-minimal-pie-chart'
import { motion } from 'framer-motion';
 import { login } from '../../store/UserSlice.jsx';
export const TaskManager = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
   
    const [date, setDate] = useState(new Date().toISOString());
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const y = useSelector(state => state.auth.status);
    const jj=useSelector(state=>state.auth.data)
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login');
          
        }
        apiClient.get('/getuser', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then((response) => {
            if (response.data) {
              if(!y){
              dispatch(login(response.data));}
              navigate('/main');
            } else {
              navigate('/register');
            }
          })
          .catch((error) => {
            console.error('Failed to fetch user:', error);
            navigate('/register');
          });
        setTimeout(() => {
            console.log('Redux state:', jj);  
          }, 1000);
          
        
        console.log("fetching data");
        
        apiClient.get('/gettask', {
            params: {
                date: date
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log("l", response.data);
            setTasks(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [date]);

    const handleAddTask = (e) => {
        
        e.preventDefault();
        apiClient.post('/addtask',  { 
        title: newTask.title, 
        description: newTask.description, 
        date: date 
    }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log("taskid",response);
            
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '' });
        })
        .catch(error => {
            console.log(error);
        });
    };
    
    const count=()=>{
        let f=0;
        let t=tasks.length;
        // if(!t){
        //     return ;
        // }
        tasks.map((t)=>{if(t.done){
f+=1;
        }
     
    })
    return ((f/t)*100);
    }

    return (
        <div className="min-h-screen  p-4 bg-white text-gray-900">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Task Manager </h1>
                {jj && <h1>{jj.email}</h1>}
            </header>
            <div className="flex flex-wrap">
            <Calendar 
                onChange={(value) => setDate(value.toISOString())} 
                className="mb-8"
            />
            <div className="min-w-ms lg:ml-39 mb-10 place-content-around">  
                { <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="p-6 bg-white rounded-2xl shadow-2xl"
    >
      <PieChart
       data={[
            { title: 'Completed', value: count(), color: '#4CAF50' },
            { title: 'Pending', value: 100 - count(), color: '#F44336' },
          ]}
        animate
        animationDuration={2000}
        animationEasing="ease-in-out"
        radius={42}
        lineWidth={25}
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
        labelStyle={{ fontSize: '6px', fill: '#333', fontWeight: '600' }}
        segmentsStyle={{ transition: 'all 0.8s ease-in-out', cursor: 'pointer' }}
      />
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center mt-4 text-xl font-bold text-blue-600"
      >
        {`Task Completion: ${count().toFixed(2)}%`}
      </motion.p>
    </motion.div> }
 
  {/* <PieChart
  data={[
    { title: 'completed ', value: count(), color: 'green' },
    { title: 'not completed', value: 100-count(), color: 'red' },
     
  ]}
/>  */}
{/* task completed {count().toFixed()} percent */}
</div>
           
            </div>
           
            {/* <p className="text-lg mb-4">{`Selected date: ${date}`}</p> */}
            
            <form onSubmit={handleAddTask} className="mb-8">
                <input 
                    type="text" 
                    placeholder="Task Title" 
                    value={newTask.title} 
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
                    className="block w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <textarea 
                    placeholder="Task Description" 
                    value={newTask.description} 
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
                    className="block w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
            </form>
            
            <main className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 gap-4">
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <div key={task._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold text-blue-600">{task.title}</h2>
                                <p className="mt-2">{task.description}</p>
                                <button 
                                    onClick={() => {
                                        apiClient.delete(`deletetask?id=${task._id}`)
                                        console.log("idd", task);
                                        setTasks(tasks.filter((t) => t._id !== task._id));
                                    }} 
                                    className="bg-red-500 text-white p-2 rounded mt-4"
                                >
                                    Delete
                                </button>
                                <button 
                                    onClick={() => {
                                      apiClient.patch(`/done?id=${task._id}`).then((respone)=>{
                                        const updatedtask=respone.data;
                                        console.log("sfd",updatedtask);
                                        
                                        setTasks(tasks.map((t)=>
                                            t._id==task._id?updatedtask:t))
                        })   
                                    }} 
                                    className="bg-green-500 text-white p-2 rounded mt-4 ml-5"
                                >
                                    Done
                                </button>
                                {task.done&&<h1>done</h1>}
                            </div>
                            
                        ))
                    ) : (
                        <div className='center text-blue-600 text-2xl  lg:ml-60'>No tasks added for this date</div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TaskManager;

import React, { useEffect, useState } from 'react';
import { Deletepost, Getposts } from '../Services/Getpost';
import Form from './Form';

function Posts() {
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState({});

    const Getpostdata = async () => {
        try {
            const response = await Getposts();
            setData(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        Getpostdata();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await Deletepost(id);
            if (res.status === 200) {
                const newData = data.filter((item) => item.id !== id);
                setData(newData);
            } else {
                console.log('Failed to delete', res.status);
            }
        } catch (error) {
            console.error('Error deleting post:', error.response ? error.response.data : error.message);
        }
    };


    const handleUpdateData = (item) => {
        setUpdateData(item);
    };


    return (
        <div>
            <div className='form-data'>

                <Form
                 data={data}
                setdata={setData}
                updateData={updateData}
                setUpdateData={setUpdateData}
                />

            </div>
            <ol className='container'>
                {data.map((item) => {
                    const { id, title, body } = item;
                    return (
                        <li key={id} className='list'>
                            <h3>{id}</h3>
                            <p><span className='headings'>Title : </span>{title}</p>
                            <p><span className='headings'>News : </span>{body}</p>
                            <div className='btn-container'>
                                <button className='btn'onClick={() => handleUpdateData(item)}>Edit</button>
                                <button className='btn' onClick={() => handleDelete(id)}>Delete</button>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export default Posts;
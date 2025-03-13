import {useState,useEffect} from 'react'
import { Postdata, Updatepost } from '../Services/Getpost'

function Form({data,setdata,updateData,setUpdateData}) {

    const [add,setadd] = useState({
        title: "",
        body: "",
    })

    // edit method

    useEffect(() => {
      updateData && setadd({
        title: updateData.title || "",
        body: updateData.body || "",
      });
    }, [updateData]);

    let isEmpty = Object.keys(updateData).length === 0;

    
    const handleinput = (e) => {
        const {name,value} = e.target;
        setadd((prev) => {
            return{
                ...prev,
                [name]: value,
            }
        })
    }

    const addpostData = async () => {
        try {
            const res = await Postdata(add);
            console.log(res);
            if(res.status === 201){
                setdata([...data, res.data]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updatePostData = async () => {
        try {
            const res = await Updatepost(updateData.id, add);
            if(res.status === 200){
                setdata((prev) =>{
                    return prev.map((item) => {
                        return item.id === res.data.id ? res.data : item;
                })
            })
                 setUpdateData({});
            }
        } catch (error) {
            
        }
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        const action  = e.nativeEvent.submitter.value;
        
        if(action === "add"){
            addpostData();
        } else if(action === "Edit"){
           updatePostData();
        };
        
        setadd({
            title: "",
            body: "",
        })
    }

    return (

        <div >
            <form action="/" onSubmit={handlesubmit} className='form-content'>
                <div>
                    <input type="text" name='title' value={add.title} onChange={handleinput}/>
                </div>
                <div>
                    <input type="text" name='body' value={add.body} onChange={handleinput}/>
                </div>
                <button className='btn' type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
            </form>
        </div>
    );
};

export default Form;
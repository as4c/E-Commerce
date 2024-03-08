import React, { useEffect, useState } from 'react'
import Layout from '../homepage/Layout'
import { useDispatch } from 'react-redux';
import { createCategory } from '../features/actions/categoryActions';
import { unwrapResult } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';


const AddCategory = () => {

    const location = useLocation();
    // console.log("location...", location);

    const [values, setValues] = useState({
        name: "",
        description: "",
    });
    const { name, description } = values;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Add categories';
    }, []);
    const handleChange = (data) =>
        (event) => {
            setValues({ ...values, [data]: event.target.value });

        };

    const onSubmit = async (e) => {
        e.preventDefault();  // Corrected typo
    
        const res1 = await dispatch(createCategory({ name, description }));
        const res = await unwrapResult(res1);
        console.log("category res...", res);
        if (!res.errors) {
            Swal.fire({
                icon: 'success',
                title: 'Category Added Successfully.',
                text: res.msg,
              });
            setValues({
                ...values,
                name:'',
                description:''
            });
            navigate('/user/seller/dashboard');
        }
        else{
            const errorFields = Object.keys(res.errors);
            const errorMessage = errorFields.map(field => `${field}: ${res.errors[field][0]}`).join('\n');
            Swal.fire({
                icon: 'error',
                title: 'Failed.',
                text: errorMessage,
              });
            setValues({
                ...values,
            });
        }
    };
        

    return (
        <Layout>

            <div className='bg-white rounded shadow-md max-w-md p-5 flex flex-col items-center justify-center bg-blur mx-auto'>

                <h1 className="text-gray-400 font-bold text-2xl mb-1">Add Category</h1>
                <hr />
                <form className="m-5 p-5 rounded-lg w-full mx-auto">
                    <div className="border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">

                        <input className="pl-2 outline-none border-none"
                            type="text" name="name" id=""
                            placeholder="Category Name"
                            value={name}
                            onChange={handleChange("name")}
                            required
                        />
                    </div>
                    <div className="border-2 py-2 px-3 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">

                        <textarea className="pl-2 outline-none border-none"
                            placeholder="Write short description about this category..."
                            name='description'
                            value={description}
                            onChange={handleChange("description")}
                            cols="30" rows="10"
                            required
                        >
                        </textarea>
                    </div>

                    <button type="submit" onClick={onSubmit}
                        className="block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-orange-700">
                        Add
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default AddCategory
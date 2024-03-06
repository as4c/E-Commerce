import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../features/actions/productActions';
import { unwrapResult } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import Layout from '../homepage/Layout';
import DatePicker from 'react-datepicker'
import { loadCategory } from '../features/actions/categoryActions';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddProduct = () => {
    const [editorData, setEditorData] = useState('');
    const [values, setValues] = useState({
        product_name: "",
        actual_price: "",
        discount: "",
        stock: "",
        category: "",
        volume: "",
        brand_name: "",
    });
    const { product_name,  actual_price, discount, stock, category, volume, brand_name } = values;
    const [date, setDate] = useState();
    const { data } = useSelector((state) => state.category);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (data) =>
        (event) => {
            setValues({ ...values, [data]: event.target.value });

        };
    const [productImage, setProductImage] = useState(null);

    const ImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setProductImage(file);
        } else {
            console.log("submitted data is not a file")
        }
    }


    const handleEditorReady = (editor) => {
        console.log('Editor is ready to use!', editor);
        editor.editing.view.change((writer) => {
            writer.setStyle(
                "height",
                "400px",
                editor.editing.view.document.getRoot()
            );

        });
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const res1 = await dispatch(addProduct({
            product_name,
            editorData,
            actual_price,
            discount, stock,
            category,
            volume,
            brand_name,
            productImage,
            date
        }));
        const res = await unwrapResult(res1);
        console.log("add product res...", res);
        if (!res.errors) {
            Swal.fire({
                icon: 'success',
                title: 'Product Added.',
                text: res.msg,
            });
            setValues({
                ...values,
                product_name: "",
                product_description: "",
                actual_price: "",
                discount: "",
                stock: "",
                category: "",
                volume: "",
                brand_name: "",
                productImage: null
            });
            navigate('/user/seller/dashboard');
        }
        else {
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

    useEffect(() => {
       
        dispatch(loadCategory());
    
    }, [dispatch]);


    return (
        <Layout>
            <div className='bg-white rounded shadow-md max-w-lg p-5 flex flex-col items-center justify-center bg-blur mx-auto my-auto mb-2 mt-2' >

                <h1 className="text-center text-2xl font-bold text-gray-800 mb-2">Add New Product</h1>
                <hr />
                <form className="m-5 p-5 rounded-lg w-full mx-auto">
                    <div className="border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">

                        <input className="pl-2 outline-none border-none"
                            type="text" name="product_name" id=""
                            placeholder="Product Name"
                            value={product_name}
                            onChange={handleChange("product_name")}
                            required
                        />
                    </div>
                    <div className="border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <input className="pl-2 outline-none border-none"
                            type="text" name="brand_name" id=""
                            placeholder="Brand"
                            value={brand_name}
                            onChange={handleChange("brand_name")}
                            required
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none text-gray-400 hover:ring-2 hover:ring-orange-500 text-overflow-ellipsis">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" className='h-5 w-5 text-gray-400 ' viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
                        <input className="pl-2 outline-none border-none text-gray-400 text-overflow-ellipsis"
                            type="file" name="productImage" id=""
                            accept='image/*'
                            onChange={ImageUpload}
                            required
                        />
                    </div>
                    <div className="border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">

                        <input className="pl-2 outline-none border-none"
                            type="text" name="actual_price" id=""
                            placeholder="Price "
                            value={actual_price}
                            onChange={handleChange("actual_price")}
                            required
                        />
                    </div>

                    <div className="border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">

                        <input className="pl-2 outline-none border-none"
                            type="text" name="discount" id=""
                            placeholder="Discount "
                            value={discount}
                            onChange={handleChange("discount")}
                            required
                        />
                    </div>

                    <div className="border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">

                        <input className="pl-2 outline-none border-none"
                            type="text" name="volume" id=""
                            placeholder="Volume(in L) "
                            value={volume}
                            onChange={handleChange("volume")}
                            required
                        />
                    </div>

                    <div className="mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={handleChange("category")}
                            className="w-full text-gray-500 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="" className='text-gray-500'>Category..</option>
                            {data && data.map((categ, uid) => (
                                <option key={uid} value={categ.uid}>{categ.name}</option>
                            ))}


                        </select>
                    </div>
                    <div className="border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <div>
                            <DatePicker 
                            placeholderText="Select a expiry date"
                            selected={date} onChange={(date) => setDate(date)} />
                        </div>
                    </div>
                    <div className="border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <input className="pl-2 outline-none border-none"
                            type="text" name="stock" id=""
                            placeholder="Available stocks"
                            value={stock}
                            onChange={handleChange("stock")}
                            required
                        />
                    </div>
                    <div className="border-2 py-2 px-3 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <div className="ck-editor__editable">
                            <CKEditor
                                editor={ClassicEditor}
                                data={editorData}
                                onReady={handleEditorReady}
                                onChange={handleEditorChange}
                                config={{
                                    
                                }}
                            />
                        </div>
                    
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

export default AddProduct
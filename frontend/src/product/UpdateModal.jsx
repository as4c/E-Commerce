import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { loadAllProduct, loadProductData, updateProductData } from '../features/actions/productActions';
import { unwrapResult } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker'
import { loadCategory } from '../features/actions/categoryActions';
import { resetProductData } from '../features/slices/productSlice';
import Loading from '../helper/Loading';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const UpdateModal = ({
    hideModalHandler,
    showModal,
    name,
    brand,
    price,
    description,
    image,
    cat,
    dct,
    vol,
    ex_date,
    stocks

}) => {

    const { uid } = useParams();
    console.log(
        "uid", uid
    )
    const [wrong, setWrong] = useState('');
    const { list , error} = useSelector(
        (state) => state.seller
    );
   const {loading : product_loading} = useSelector((state)=> state.product);
    const product = list.filter(product => product.uid === uid);
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { data } = useSelector((state) => state.category);
    const [values, setValues] = useState({
        product_name: product[0].product_name,
        actual_price: product[0].actual_price,
        discount: product[0].discount,
        stock: product[0].stock,
        category: "",
        volume: product[0].volume,
        brand_name: product[0].brand_name,
    });
    const { product_name, actual_price, discount, stock, category, volume, brand_name } = values;

    const [date, setDate] = useState(new Date(product.expiry_date));
    const [product_description, setDescription] = useState(product[0].product_description)
    const [productImage, setProductImage] = useState(product.image);
    const [selectedCategory, setSelectedCategory] = useState(product[0].category);

    const handleChange = (data) => (event) => {
        if (data === 'category') {
            const selectedCategoryUUID = event.target.value;
            setSelectedCategory(selectedCategoryUUID);
        }
        setValues({ ...values, [data]: event.target.value });
    };

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
        setDescription(data);
    };
    

    const ImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setProductImage(file);
           
        } else {
            console.log("the submitted data is not a file")
        }
    }

    useEffect(()=> {
        if(wrong !== ''){
            Swal.fire({
                icon: 'error',
                title: 'Failed.',
                text: wrong,
            });
        }
    }, [])
    const onUpdate = (e) => {
        e.preventDefault();

        const payload = {
            product_name,
            product_description,
            actual_price,
            discount,
            stock,
            volume,
            brand_name,
            productImage,
            uid
        };

        if (date) {
            payload.date = date.getTime();  
        }
        if (selectedCategory){
            payload.category = selectedCategory.uid
        }

        dispatch(updateProductData(payload))
            .then((res1) => {
                const res = unwrapResult(res1);
                // console.log("update product res...", res);
                if (!res.errors) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Product updated.',
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
                    dispatch(loadAllProduct())
                    hideModalHandler();
                    navigate('/user/seller/your-product');
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
            })
            .catch((error) => {
                console.log(error)
            });
    };


    if (data.length === 0 || product_loading) {
        return (
           <Loading />
        )
    }
    
    if(product.length === 0 || product[0] === undefined){
        setWrong("Something went wrong! Try again.");
    }
    if(error){
        setWrong(error);
    }
    
    return (
        <div className="flex items-center justify-center z-50">
            <div className=''>

                {/* Background overlay */}
                {showModal && (
                    <div
                        className="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                        onClick={hideModalHandler}
                    >
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div
                        className="fixed z-10 inset-0 overflow-y-auto"
                        style={{ display: 'block' }}
                    >
                        <div className="z-50 flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center mt-20 sm:block sm:p-0">
                            {/* Modal panel */}
                            <div className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    {/* Modal content */}
                                    <div className="sm:flex sm:items-start">

                                        <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3
                                                className="text-lg leading-6 font-medium text-gray-900"
                                                id="modal-headline"
                                            >
                                                Update Product data
                                            </h3>
                                            {name && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Enter Product Name.
                                                    </p>
                                                    <input
                                                        className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                                                        type="text"
                                                        name="product_name"
                                                        id=""
                                                        placeholder="Product Name"
                                                        value={product_name}
                                                        onChange={handleChange("product_name")}
                                                        required
                                                    />
                                                </div>

                                            )}
                                            {brand && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Enter Brand Name.
                                                    </p>
                                                    <input className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                                                        type="text" name="brand_name" id=""
                                                        placeholder="Brand"
                                                        value={brand_name}
                                                        onChange={handleChange("brand_name")}
                                                        required
                                                    />
                                                </div>
                                            )}

                                            {image && (
                                                <div className="flex items-center border-2 py-2 px-3 rounded-2xl my-4 hover:outline-none text-gray-400 hover:ring-2 hover:ring-orange-500 text-overflow-ellipsis z-50">
                                                    <p className="text-sm text-gray-500">
                                                        Add Product Image.
                                                    </p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" className='h-5 w-5 text-gray-400 ' viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
                                                    <input className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500 text-gray-400 text-overflow-ellipsis"
                                                        type="file" name="productImage" id=""
                                                        accept='image/*'
                                                        onChange={ImageUpload}
                                                        required
                                                    />
                                                </div>
                                            )}

                                            {price && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Enter Actual Price.
                                                    </p>
                                                    <input className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                                                        type="text" name="actual_price" id=""
                                                        placeholder="Price "
                                                        value={actual_price}
                                                        onChange={handleChange("actual_price")}
                                                        required
                                                    />
                                                </div>
                                            )}

                                            {dct && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Enter Discount (in %).
                                                    </p>
                                                    <input className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                                                        type="text" name="discount" id=""
                                                        placeholder="Discount "
                                                        value={discount}
                                                        onChange={handleChange("discount")}
                                                        required
                                                    />
                                                </div>
                                            )}

                                            {vol && (

                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Enter Volume (in ML).
                                                    </p>
                                                    <input className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                                                        type="text" name="volume" id=""
                                                        placeholder="Volume(in ML) "
                                                        value={volume}
                                                        onChange={handleChange("volume")}
                                                        required
                                                    />
                                                </div>
                                            )

                                            }

                                            {cat && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Select Category.
                                                    </p>
                                                    <select
                                                        id="category"
                                                        name="category"
                                                        value={selectedCategory}
                                                        onChange={handleChange("category")}
                                                        className="w-full text-gray-500 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                    >
                                                        <option value="" className='text-gray-500'>...</option>
                                                        {data && data.map((categ) => (
                                                            <option key={categ.uid} value = {categ.uid}>{categ.name}</option>
                                                        ))}
                                                    </select>

                                                </div>
                                            )}

                                            {ex_date && (

                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Select Expiry Date.
                                                    </p>
                                                    <div>
                                                        <DatePicker
                                                            placeholderText="Select a expiry date"
                                                            selected={date} onChange={(date) => setDate(date)} />
                                                    </div>
                                                </div>
                                            )}

                                            {stocks && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Enter Stocks available.
                                                    </p>
                                                    <input className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                                                        type="text" name="stock" id=""
                                                        placeholder="Available stocks"
                                                        value={stock}
                                                        onChange={handleChange("stock")}
                                                        required
                                                    />
                                                </div>
                                            )}

                                            {description && (

                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Enter Product Description.
                                                    </p>
                                                    <div className="ck-editor__editable">
                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            data={product_description}
                                                            onReady={handleEditorReady}
                                                            onChange={handleEditorChange}
                                                            config={{
                                                                
                                                            }}
                                                        />
                                                    </div>
                                                    
                                                </div>
                                            )}



                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    {/* Subscribe button */}
                                    <button
                                        onClick={onUpdate}
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Update
                                    </button>
                                    {/* Cancel button */}
                                    <button
                                        onClick={hideModalHandler}
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateModal;

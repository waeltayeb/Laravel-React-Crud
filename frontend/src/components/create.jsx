import React, { useState } from 'react';
import Navbar from './layouts/navBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        await axios.post('http://localhost:8000/api/products/', formData)
        .then((data) => {
            navigate('/');
        })
        .catch((error) => {
            console.error('Error creating product:', error);
        });
    }
    
    return (
        <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full lg:w-1/3 m-1">
                <form className="w-full bg-white shadow-md p-6 rounded-lg" onSubmit={submitHandler}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="category_name">Product Name</label>
                            <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text" name="name" placeholder="Product Name" required 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="category_name">Product Price</label>
                            <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="number" name="price" placeholder="Product Price" required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="w-full px-3 mb-6">
                            <textarea rows="4" className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text" name="description" required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            > </textarea>
                        </div>                                          
                        <div className="w-full px-3 mb-8">
                            <label className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center" htmlFor="dropzone-file">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>

                            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Category image</h2>

                            <p className="mt-2 text-gray-500 tracking-wide">Upload or drag & drop your file SVG, PNG or JPG.  </p>

                            <input id="dropzone-file" type="file" className="hidden" name="image" accept="image/png, image/jpeg, image/webp"
                            onChange={changeHandler}
                            />
                            </label>
                        </div>
                        <div className="w-full md:w-full px-3 mb-6">
                            <button className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
                            >Add Product</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
            </>
    )
}

export default Create;

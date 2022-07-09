import axios from 'axios';
import { Link,Navigate} from 'react-router-dom';
import { useAuth } from './auth';
import React, { useState } from 'react';
const URI = 'http://104.248.145.103:4000/';




const Login = () => {
    const [user,setUser]=useState({id:String,name:String});
    const [login,setLogin]=useState(false);
    const auth= useAuth();

    const handleLogin=()=>{
        var email = String(document.getElementById('username').value.trim());
        if (email === "") {
            document.getElementById('notification').innerHTML = "Vui lòng nhập Email";
        }
        else {
            axios.get(String(URI + "students/getpassword/" + email)).then((response) => {
                var data = response.data;
                var password = String(renderPassword(data));
                console.log(password);
                checkPasswordStudent(password, email);
            });
            auth.login(user);
        }
    }

    const renderPassword=(data)=>{
        for (var password of data) {
            return password.Password;
        }
    }

    const checkPasswordStudent=(pwd, email)=>{
        var password = String(document.getElementById('password').value);
        if (password === "") {
            document.getElementById('notification').innerHTML = "Vui lòng nhập Password";
        }
        else if (pwd === "undefined") {
            var URL = String(URI + "authors/getpassword/" + email);
            axios.get(URL).then((response) => {
                var data = response.data;
                var password = String(renderPassword(data));
                console.log(password)
                checkPasswordAuthor(password);
            });
        }
        else if (password !== "" && password !== pwd) {
            document.getElementById('notification').innerHTML = "Mật khẩu không hợp lệ.";
            document.getElementById('password').value = "";
        }
        else {
            // True Student
            var role = "Student";
            sessionStorage.setItem("Role", role);
            axios.get(String(URI + "students/getinformation/" + email)).then((response) => {
                var data = response.data;
                console.log(data);
                var Student_id = String(renderStudentID(data));
                sessionStorage.setItem("Access_token",true);
                sessionStorage.setItem("Student_Id", Student_id);
                var Student_FullName = String(renderFullName(data));
                sessionStorage.setItem("Student_FullName", Student_FullName);
                let user={id:Student_id,name:Student_FullName};
                console.log(user);
                setUser(user);
                clearForm();
                // Link to home page
                alert("Success!");
                setLogin(true);
            });
        }
    }

    const checkPasswordAuthor=(pwd)=>{
        var password = String(document.getElementById('password').value);
        if (pwd === "undefined") {
            document.getElementById('notification').innerHTML = "Tài khoản không tồn tại";
            document.getElementById('password').value = "";
        }
        else if (password !== "" && password !== pwd) {
            document.getElementById('notification').innerHTML = "Mật khẩu không hợp lệ.";
            document.getElementById('password').value = "";
        }
        else {
            // True Author
            var role = "Author";
            sessionStorage.setItem("Role", role);
            var email = String(document.getElementById('username').value.trim());
            var URL = String(URI + "authors/getinformation/" + email);
            axios.get(URL).then((response) => {
                var data = response.data;
                console.log(data);
                var Author_id = String(renderAuthorID(data));
                sessionStorage.setItem("Author_Id", Author_id);
                sessionStorage.setItem("Access_token",true);
                var Author_FullName = String(renderFullName(data));
                sessionStorage.setItem("Author_FullName", Author_FullName);
                let user={id:Author_id,name:Author_FullName};
                setUser(user);
                clearForm();
                // link to home page
                alert("Success!");
                setLogin(true);
            });
        }
    }

    const clearForm=()=>{
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
    }

    const renderStudentID=(data)=>{
        for (var information of data) {
            return information.Student_id;
        }
    }
    const renderAuthorID=(data)=>{
        for (var information of data) {
            return information.Author_id;
        }
    }
    const renderFullName=(data)=>{
        for (var information of data) {
            return information.FullName;
        }
    }
    return (
        <section className="h-screen">
            <div className="px-6 h-full text-gray-800">
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" classname="w-full" alt="imgLogin" />
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form>
                            <div className="mb-6">
                                <h1 style={{ display: 'flex',fontSize:35, justifyContent: 'center'}}>ĐĂNG NHẬP</h1>
                            </div>
                            <div className="mb-6">
                                <input type="text" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="username" placeholder="Email" />
                            </div>
                            <div className="mb-6">
                                <input type="password" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="password" placeholder="Password" />
                            </div>
                            <div className="text-center lg:text-left">
                                <button type="button" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => handleLogin()}>
                                    Đăng nhập
                                </button>
                                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                    Bạn chưa có tài khoản?
                                    <Link to="/register" className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Đăng ký</Link>
                                </p>
                            </div>
                            <p className="text-center mt-3" id="notification" style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }} />
                        </form>
                    </div>
                </div>
            </div>
            {login?<Navigate to="/" replace={true} />:null}
        </section>
    )
}

export default Login;

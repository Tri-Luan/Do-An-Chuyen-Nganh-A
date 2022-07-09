/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import axios from 'axios';
import { Link,Navigate } from 'react-router-dom';
const URI = 'http://104.248.145.103:4000/';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            flag_fullName: 1,
            flag_phoneNumber: 1,
            flag_email: 1,
            flag_password: 1,
            flag_re_password: 1,
            login:false,
        }
    }
    render() {
        return (
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" classname="w-full" alt="imageLogin" />

                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form>
                                <div className="mb-6">
                                    <h1 style={{ display: 'flex', fontSize: 35, justifyContent: 'center' }}>ĐĂNG KÝ</h1>
                                </div>
                                <div className="mb-6">
                                    <input type="text" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="fullname" placeholder="Họ và tên" required />
                                </div>
                                <div className="mb-6">
                                    <input type='number' className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="phone-number" placeholder="Số điện thoại" />
                                </div>
                                <div className="mb-6">
                                    <select required className="block w-full px-4 py-2 text-xl font-normal text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" style={{ height: 46 }} id='role'>
                                        <option>Học viên</option>
                                        <option>Tác giả</option>
                                    </select>
                                </div>
                                <div className="mb-6">
                                    <input type="email" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="username" placeholder="Email" />
                                </div>
                                <div className="mb-6">
                                    <input type="password" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="password" placeholder="Password" />
                                </div>
                                <div className="mb-6">
                                    <input type="password" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="password-confirm" placeholder="Re-password" />
                                </div>
                                <div className="text-center lg:text-left">
                                    <button type="button" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => this.Register()}>
                                        Đăng ký
                                    </button>
                                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                        Bạn đã có tài khoản?
                                        <Link to="/login" className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Đăng nhập</Link>
                                    </p>
                                </div>
                                <p className="text-center mt-3 mb-5" id="notification" style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }} />
                            </form>
                        </div>
                    </div>
                    {this.state.login?<Navigate to="/login" replace={true} />:null}
                </div>
            </section>
        );
    }

    Register() {
        document.getElementById('notification').innerHTML = "";
        this.setState({
            flag_fullName: 1,
            flag_phoneNumber: 1,
            flag_email: 1,
            flag_password: 1,
            flag_re_password: 1
        });
        this.Checking();
        if (this.state.flag_fullName === 0 && this.state.flag_phoneNumber === 0 && this.state.flag_email === 0 && this.state.flag_password === 0 && this.state.flag_re_password === 0) {
            this.runSignUp();
        }
    }

    Checking() {
        this.checkFullName();
        this.checkPhoneNumber();
        this.checkEmail();
        this.checkPassword();
        this.checkRe_Password();
    }

    checkFullName() {
        var fullName = String(document.getElementById('fullname').value.trim());
        if (fullName === "") {
            this.setState({ flag_fullName: 1 });
            document.getElementById('fullname').style.backgroundColor = 'yellow';
            document.getElementById('notification').innerHTML += "Họ và tên không được rỗng <br/>";
        }
        else {
            this.setState({ flag_fullName: 0 });
            document.getElementById('fullname').style.backgroundColor = "white";
        }
    }

    checkPhoneNumber() {
        var phoneNumber = String(document.getElementById('phone-number').value.trim());
        if (phoneNumber !== "") {
            if (phoneNumber.length <= 9 || phoneNumber.length >= 11) {
                this.setState({ flag_phoneNumber: 1 });
                document.getElementById('phone-number').style.backgroundColor = 'yellow';
                document.getElementById('notification').innerHTML += "Số điện thoại phải có 10 số <br/>";
            }
            else {
                this.setState({ flag_phoneNumber: 0 });
                document.getElementById('phone-number').style.backgroundColor = 'white';
            }
        }
        else {
            this.setState({ flag_phoneNumber: 0 });
            document.getElementById('phone-number').style.backgroundColor = 'white';
        }
    }

    checkEmail() {
        var email = String(document.getElementById('username').value.trim());
        var letter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (email === "") {
            this.setState({ flag_email: 1 });
            document.getElementById('username').style.backgroundColor = 'yellow';
            document.getElementById('notification').innerHTML += "Email không được rỗng <br/>";
        }
        else if (!letter.test(email)) {
            this.setState({ flag_email: 1 });
            document.getElementById('username').style.backgroundColor = 'yellow';
            document.getElementById('notification').innerHTML += "Email không hợp lệ (Example@email.com) <br/>";
        }
        else {
            this.setState({ flag_email: 0 });
            document.getElementById('username').style.backgroundColor = 'white';
        }
    }

    renderEmail(data, array) {
        var i = 0;
        for (var email of data) {
            array[i] = email.Email;
            i++;
        }
    }

    checkPassword() {
        var password = String(document.getElementById('password').value);
        if (password === "") {
            this.setState({ flag_password: 1 });
            document.getElementById('password').style.backgroundColor = 'yellow';
            document.getElementById('password').value = '';
            document.getElementById('notification').innerHTML += "Password không được rỗng <br/>";
        }
        else if (password.length <= 10) {
            this.setState({ flag_password: 1 });
            document.getElementById('password').style.backgroundColor = 'yellow';
            document.getElementById('password').value = '';
            document.getElementById('notification').innerHTML += "Password phải có trên 10 ký tự <br/>";
        }
        else {
            this.setState({ flag_password: 0 });
            document.getElementById('password').style.backgroundColor = 'white';
        }
    }

    checkRe_Password() {
        var re_password = String(document.getElementById('password-confirm').value);
        var password = String(document.getElementById('password').value)
        if (re_password === "") {
            this.setState({ flag_re_password: 1 });
            document.getElementById('password-confirm').style.backgroundColor = 'yellow';
            document.getElementById('password-confirm').value = '';
            document.getElementById('notification').innerHTML += "Vui lòng nhập lại password<br/>";
        }
        else if (re_password === password) {
            this.setState({ flag_re_password: 0 });
            document.getElementById('password-confirm').style.backgroundColor = 'white';
        }
        else {
            this.setState({ flag_re_password: 1 });
            document.getElementById('password-confirm').style.backgroundColor = 'yellow';
            document.getElementById('password-confirm').value = '';
            document.getElementById('notification').innerHTML += "Password nhập lại không trùng khớp <br/>";
        }
    }

    submitData(dataName, param) {
        axios.post(URI + dataName + '/add', param).then((response) => {
            var result = response.data;
            console.log(result);
            alert("Success!");
            this.clearForm();
            //Link to home page
            this.setState({login: true});
        });
    }

    postData(dataName) {
        var param = {
            "FullName": String(document.getElementById('fullname').value.trim()),
            "Email": String(document.getElementById('username').value.trim()),
            "PhoneNumber": Number(document.getElementById('phone-number').value.trim()),
            "Password": String(document.getElementById('password').value)
        };
        this.submitData(dataName, param);
    }

    runSignUp() {
        axios.get(URI + "students/getlist").then((response) => {
            var data = response.data;
            const array = [];
            var email = String(document.getElementById('username').value.trim());
            this.renderEmail(data, array);
            for (var i = 0; i < array.length; i++) {
                if (email === array[i]) {
                    document.getElementById('username').style.backgroundColor = 'yellow';
                    document.getElementById('notification').innerHTML = "Email này đã tồn tại";
                    break;
                }
                else if (i === array.length - 1) {
                    axios.get(URI + "authors/getlist").then((response) => {
                        var data = response.data;
                        const array = [];
                        var email = String(document.getElementById('username').value.trim());
                        var status = 1;
                        this.renderEmail(data, array);
                        for (var i = 0; i < array.length; i++) {
                            if (email === array[i]) {
                                document.getElementById('username').style.backgroundColor = 'yellow';
                                document.getElementById('notification').innerHTML = "Email này đã tồn tại";
                                break;
                            }
                            else if (i === array.length - 1) {
                                status = 0;
                            }
                        }
                        if (status === 0) {
                            document.getElementById('username').style.backgroundColor = 'white';
                            var role = String(document.getElementById("role").value);
                            if (role === "Học viên") {
                                this.postData("students");
                            }
                            else {
                                this.postData("authors");
                            }

                        }
                    });
                }
            }
        });
    }

    clearForm() {
        document.getElementById('fullname').value = '';
        document.getElementById('phone-number').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
    }
}

export default Register;

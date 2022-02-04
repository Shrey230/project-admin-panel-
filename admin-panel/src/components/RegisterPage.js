import React from 'react'
import { Link } from 'react-router-dom'

import { Component } from 'react'
import axios from 'axios'

import '../App.css'

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName:"",
            email: "",
            password: "",
            confirm_password:"",
            errors: {},

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
         
    handleChange(event) {
        
        event.target.firstName = event.target.value;
        event.target.lastName = event.target.value;
        event.target.email = event.target.value;
        event.target.password = event.target.value;
        
      
        this.setState({
            firstName: "",
            lastName:"",
            email: "",
            password: "",

            
        });
    }
 
    handleSubmit = async (e) => {
        e.preventDefault();
        
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const email = this.state.email
        const password = this.state.password

        if (this.validate()) {
            try{
                const config={
                  headers: {
                    "Content-type" : "application/json"
                  }
                }
                const {data} = await axios.post(`http://localhost:4000/users/`,
                  {
                    
                    firstName,
                    lastName,
                    email,
                    password,
                    role:"Admin",
    
                  },
                  config); 
                alert(data) 

                } catch (e) {
                    alert(e.response.data.error)  
            }            
            }
        else {
            alert(this.state.errors)
        }  
    }   
    validate() {
        let firstname = this.state.firstName;
        let lastname = this.state.lastName;
        let email = this.state.email;
        let password = this.state.password;
        let confirm_password = this.state.confirm_password;

        let errors = {};
        let isValid = true
        
            if (!firstname) {
                isValid = false
                errors["firstname"]="Please enter your firstName.";
            }

            if (typeof firstname !== "undefined") {
                const re = /^\S*$/;
                if (firstname.length < 4 || !re.test(firstname)) {
                    this.setState({ isValid: false })
                    errors["firstname"]= "Please enter valid firstName.";
                }
            }
            if (!lastname) {
                const re = /^\S*$/;
                if (lastname.length < 4 || !re.test(lastname)) {
                    this.setState({ isValid: false })
                    errors["lastname"]= "Please enter valid lastName.";
                }
            }


            if (!email) {
                this.setState({ isValid: false })
                errors["email"] = "Please enter your email Address.";
            } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                    
                this.setState({ isValid: false })
                errors["email"] = "Please enter valid email address.";
            }

            if (!password) {
                isValid = false
                errors["password"]= "Please enter your password.";
            }

            if (!confirm_password) {
                isValid = false
                errors["confirm_password"]="Please enter your confirm password.";
            }

            if (typeof pass !== "undefined") {
                if (password.length < 6) {
                    isValid = false
                    errors["password"] = "Please add at least 6 charachter.";
                }
            }

            if (typeof password !== "undefined" && typeof confirm_password !== "undefined") {

                if (password !== confirm_password) {
                    isValid = false
                    errors["confirm_password"]= "Passwords don't match.";
                }
            }

            this.setState({
                errors: errors
            });
            return isValid;
        
        
    } 
    render() {
        return (
            <div className= "text-center m-5-auto"  >
                <h1>Register for Admin Panel</h1>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label >Firstname:</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter first name"
                            id="firstName" required/>
      
                        <div className="text-danger">{this.state.errors.firstName}</div>
                    </div>
                    <div className="form-group">
                        <label >lastName:</label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter lastName"
                            id="lastName" required/>
      
                        <div className="text-danger">{this.state.errors.lastName}</div>
                    </div>
      
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input
                            type="text"
                            name="email"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter email"
                            id="email" required/>
      
                        <div className="text-danger">{this.state.errors.email}</div>
                    </div>
      
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter password"
                            id="password" required/>
      
                        <div className="text-danger">{this.state.errors.password}</div>
                    </div>
      
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirm_password"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter confirm password"
                            id="confirm_password" required />
      
                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                    </div>
                    <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                    </p>
                 
                    <button id='sub_btn'  >Submit</button>
                    {/* <input type="submit" value="Submit"  /> */}
                </form>
                <footer>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>
        );
    }
}
export default RegisterPage




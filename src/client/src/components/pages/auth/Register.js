import React from 'react';

import NavBar from '../../templates/NavBar';
import Footer from '../../templates/Footer';


import TextField from '@mui/material/TextField';
import Form from '@mui/material/FormGroup';

import SubmitButton from '../../basic components/SubmitButton'; 


 
function Register (props) {

        return (
                
            <>
            <NavBar/>

            <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="row">
                        

                    <div id= "register-img" className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block"/>
                <h2 id = "create-acc" >Create an Account</h2>

                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                            <div className="border-bottom w-100 ml-5"></div>
                            <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                            <div className="border-bottom w-100 mr-5"></div>
                        </div>

                        <div className="text-center w-100">
                            <p className="text-muted font-weight-bold">Already Registered? <a href="/signIn" className="text-primary ml-2">Sign In</a></p>
                        </div>

                </div>

                <div  id="reg-wrapper" className="col-md-4 col-lg-4 ml-auto">
                    <Form>
                        <TextField id="outlined-basic" label="First Name" margin="dense" variant="outlined" />
                        <TextField id="outlined-basic" label="Last Name" margin="dense" variant="outlined" />
                        <TextField id="outlined-basic" label="Passport Number" margin="dense" variant="outlined" />
                        <TextField id="outlined-basic" label="Email" margin="dense" variant="outlined" />
                        <TextField id="outlined-basic" label="Password" margin="dense" variant="outlined" />
                        <TextField id="outlined-basic" label="Confirm Password" margin="dense" variant="outlined" />
                        <SubmitButton buttonText = {"Register"} />
                    </Form>

                </div>

                    </div>
                    </div>
                </div>
                </div>
            </div>

            <Footer/>

        </>  

            );
      }
      
  export default Register ;  
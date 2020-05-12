import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./confirmationBox.css";

const register = "A Confirmation link has been sent to your email address <br /> Please Log into your mailbox and click on the link to continue";
const reset = "Your password has been reset successfully, Kindly return to the Sign in screen on the web/app to continue";

function ConfirmationBox(props) {
  const [message, setMessage] = useState("");


  useEffect(() => {
    const id = props.match.params.id;
    if(id === "register"){
        setMessage(register);
    }else  if(id === "reset"){
        setMessage(reset);
    }
   
  });

  return (
    
        <article className="br3 mv4 w-100 w-50 w-25-1 mw6 center">
            <p className="f5">{message}</p>
        </article>
  );
}
//style={{ backgroundColor: 'rgba(150, 150, 150, 1)' }}
export default withRouter(ConfirmationBox);

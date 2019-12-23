import React from 'react';

const Confirmation = () => {
    return(
        <div style={{minHeight: '70vh'}}>
            <article className="br3 ba p-4 b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center text-black" style={{ backgroundColor: 'rgba(150, 150, 150, 1)' }}>
                <p className="f5">A confirmation link has been sent to your email address <br /> Please Log into your mailbox and click on the link to continue</p>
            </article>
        </div>
        
    )

}

export default Confirmation;
import React from 'react';

const Home = () => {
  
  
  return (
    <div className="center-align" style={{ marginTop: '200px' }}>
      <div className="w-50 mx-auto centerText">
                        <h1 className="display-1 fw-bold" >ListMaker</h1>
                        <p className="descTxt">
                            This website was created for the purpose of hosting user created ordered lists. You can browse user created lists by visiting the explore page.
                        </p>
                           <br/>
                           <h3 className="display-5 ">Get started </h3> 
                           <p> 
                To create your first list <a href="/signup">sign up</a> and click on your username that appears in the navbar and select the "My Lists" option to be directed to your profile page.
                        </p>                        
                    </div>
    </div>
  );
};

export default {
  component: Home
};

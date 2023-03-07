import React from "react";


function Header(){
    return(
        <div className="header">
        
		             <div className="headertext"></div>
					 <br/>
						 <div className="input-group">
							<input type="search" className="form-control rounded" placeholder="Enter a City" aria-label="Search" aria-describedby="search-addon" style={{width : "20%" , height : "40px"}} />
							<button type="button" className="btn btn-outline-primary" id="addcity">Add City</button>
						</div>
        </div>
    );
}  


export default Header;
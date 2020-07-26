import React from "react"
//import "./ImageLinkForm.css"

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className = "f3 white">  {`${name} Your rank is` }</div>
			<div className = "f1 white"> {entries} </div>
		</div>
    ) 
}
export default Rank;
//style = {{width: 500}}
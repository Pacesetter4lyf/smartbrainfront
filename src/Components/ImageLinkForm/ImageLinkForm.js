import React from "react"
import "./ImageLinkForm.css"

const ImageLinkForm = ({onInputChange, onButtonClick}) => {
	return (
		<div>
			<p className = "f3">
				{"This magic brain will detect faces in your pictures"}
			</p>
			<div className = "bgbg pa4 br3 shadow-5 center" style = {{width: 700}}>
				<input onChange = {onInputChange} className = "f4 pa2 w-70 center" type = "text"/>
				<button onClick = {onButtonClick} className = "w-30 grow f4 link ph3 pv2 dib white bg-light-purple">DETECT</button>
			</div>
		</div>
    ) 
}
export default ImageLinkForm;
//style = {{width: 500}}
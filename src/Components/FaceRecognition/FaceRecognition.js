import React from "react"
//import pic from "C:\\Users\\pacesetter\\Pictures\\Emmanuel.jpg"
import "./FaceRecognition.css"

const FaceRecognition = ({imgLink, box}) => {
	//console.log("infacerecognition  " ,box)
	return (
		<div className = "center ma">
			<div className = "absolute mt2">
				<img id = "inputImage" className = "pa2 black bg-light-purple" src = {imgLink} alt = "" height = {500} width = "auto" />
				<div className = "bounding-box" style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left:box.leftCol}}></div>
			</div>			
		</div>
    ) 
}
export default FaceRecognition;
//style = {{width: 500}}

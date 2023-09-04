import styled from 'styled-components'

export const Container = styled.div`
	position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
	text-align: center;

	.imageContainer {
    margin: 30px;
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
}

.uploadedImageTop {
	font-size: 22px;
	font-weight: bold;
}

	.loading {
	display: flex;
	flex-direction: column;
	align-items: center;
  }

  .success {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #4caf50;
	color: white;
	padding: 10px;
	border-radius: 5px;
	margin-top: 30px;
	font-weight: bold;
  }

  #restartApp {
	background-color: #00BFFF;
	color: white;
	font-weight: bold;
	border-radius: 20px;
	border: none;
	padding: 1rem;
	margin: 1rem;
	cursor: pointer;
  }


h1 {
  letter-spacing: 1px;
  text-align: center;
}


.list-item > h3 {
  padding: 10px;
  margin: 0;
}

.list-item > span {
  margin-right: 10px;
  font-size: 24px;
  font-weight: bold;
  border-right: 2px solid white;
  padding: 10px;
  padding-right: 16px;
}

.ulFileName {
	font-weight: bold;
	margin-top: 30px;
	margin-bottom: 15px;
}

.selected {
    border: 2px solid #00BFFF;
}

.urlDisplay {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #00BFFF;
	border-radius: 15px;
    background-color: #f9f9f9;
}

.urlDisplay p {
    margin: 0;
	font-weight: bold;
}

.urlDisplay input {
    width: 100%;
    margin-top: 5px;
    padding: 5px;
    border: 1px solid #ccc;
}

.urlDisplay button {
    margin-top: 5px;
    padding: 5px 10px;
    background-color: #00BFFF;
    color: white;
    border: none;
    cursor: pointer;
}

.createdBy {
	color: #ccc;
	font-weight: bold;
	margin-top: 50px;
}

.createdBy a {
	text-decoration: none;
}

#cB {
	color: black;
	font-weight: bold;
}

`

export const UploadedImageContainer = styled.div`
display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center; 
	margin: 0 auto;
	height: 515px;
	width: 550px;
	border: 5px dashed #add8e6;

.imageContainer {
    margin: 30px;
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
}

.uploadedImageTop {
	font-size: 22px;
	font-weight: bold;
}
`

export const DropZone = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center; 
	margin: 0 auto;
	height: 350px;
	width: 400px;
	border: 5px dashed #add8e6;
	padding: 2rem;

	.buttonSelectFile {
		margin-top: 10px;
		background-color: #00BFFF;
		border-radius: 20px;
		border: none;
		padding: 1rem;
		margin: 1rem;
		color: white;
		font-weight: bold;
		cursor: pointer;
	}
`

export const ButtonsUpload = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	button {
		border-radius: 20px;
		border: none;
		cursor: pointer;
		color: white;
		font-weight: bold;
		padding: 1rem;
  		margin: 1rem;
	}

	.cancelButton {
		background-color: #ff0000;
		
	}

	.uploadButton {
		background-color: #00d233;
		
	}
`

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin: 20px auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  .success {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #007f00;
  }

  .urlDisplay {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    p {
      margin-right: 10px;
    }

    input {
      flex-grow: 1;
      padding: 5px;
      border: 1px solid #00BFFF;
      border-radius: 4px;
      font-size: 14px;
	  margin-right: 25px;
    }

    button {
      background-color: #007f00;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      font-size: 14px;
      cursor: pointer;
	  font-weight: bold;
    }
  }

  .buttonRestart {
    button {
      background-color: #007f00;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  }
`;

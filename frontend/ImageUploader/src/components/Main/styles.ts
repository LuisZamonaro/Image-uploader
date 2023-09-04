import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 90vh;
	
`

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 400px;
	width: 400px;
	background-color: #fff;
	border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	border: 0.1em dashed blue;

	&.dragging {
    background-color: #f0f0f0;
  }

  .drag-area {
    border: 2px dashed #aaa;
    padding: 20px;
    cursor: pointer;
  }

  .active {
    border-color: #555;
  }

`
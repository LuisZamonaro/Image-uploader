import { useState, useRef, DragEvent } from "react";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import * as S from './styles';

const DragDropFiles = () => {
	const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null); // Alterado para apenas um arquivo
	const [uploading, setUploading] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// Função para lidar com o evento de arrastar sobre a área de soltura
	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();// Impede o comportamento padrão de abrir o arquivo ao soltar
	};

	// Função para lidar com o evento de soltura de arquivos na área de drop
	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();// Impede o comportamento padrão de abrir o arquivo ao soltar
		setFile(event.dataTransfer.files[0]); // Aceita apenas o primeiro arquivo // Define o arquivo selecionado no estado 'file'
	};

	// Função para lidar com o upload do arquivo
	const handleUpload = async () => {
		if (file) {
			setUploading(true); // Define 'uploading' como verdadeiro para mostrar o spinner de carregamento
			setUploadSuccess(false); // Define 'uploadSuccess' como falso

			const formData = new FormData();
			formData.append("image", file); // Anexa o arquivo ao formulário FormData

			try {
				// Envia a requisição POST para o endpoint de upload usando Axios
				await axios.post("http://localhost:3001/upload", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				const imageURL = URL.createObjectURL(file); // Obtém a URL da imagem carregada // Cria uma URL temporária para a imagem carregada
				setSelectedImageURL(imageURL); // Define a URL da imagem carregada

				console.log("File uploaded successfully");
				setFile(null); // Limpa o arquivo do estado 'file'
				setUploadSuccess(true); // Define 'uploadSuccess' como verdadeiro para exibir a tela de sucesso
			} catch (error) {
				console.error("Error uploading file:", error);
			} finally {
				setUploading(false); // Define 'uploading' como falso, independentemente do sucesso ou erro
			}
		}
	};

	// Função para reiniciar o processo de upload
	const handleRestart = () => {
		setFile(null); // Limpa o arquivo do estado 'file'
		setUploadSuccess(false); // Define 'uploadSuccess' como falso para retornar à tela de seleção
	};

	return (
		<>
			<S.Container>
				{uploadSuccess && selectedImageURL && (
					<>
						<div className="uploadedImage">
							<img src={selectedImageURL} alt="Uploaded" style={{ maxWidth: '500px' }} />
						</div>
					</>
				)}
				{uploadSuccess ? (
					<S.SuccessContainer>
						<div className="success">
							<p>Upload successful!</p>
						</div>
						<div className="urlDisplay">
							<p>Uploaded Image URL:</p>
							<input type="text" readOnly value={selectedImageURL || ""} />
							<button
								onClick={() => {
									if (selectedImageURL) {
										// Cria um elemento <textarea> para armazenar o link da imagem temporariamente
										const textArea = document.createElement("textarea");
										textArea.value = selectedImageURL; // Define o valor do textarea como a URL da imagem
										document.body.appendChild(textArea); // Adiciona o textarea ao corpo do documento
										textArea.select(); // Seleciona o conteúdo do textarea
										// Executa o comando de cópia do sistema para copiar o conteúdo selecionado para a área de transferência
										document.execCommand("copy");
										// Remove o textarea temporário do documento
										document.body.removeChild(textArea);
										// Exibe um alerta indicando que o link da imagem foi copiado para a área de transferência
										alert("Image link copied to clipboard!");
									}
								}}
							>
								Copy URL
							</button>

						</div>
						<div className="buttonRestart">
							<button id="restartApp" onClick={handleRestart}>Upload Another Image</button>
						</div>
					</S.SuccessContainer>
				) : (
					<S.DropZone onDragOver={handleDragOver} onDrop={handleDrop}>
						<h1>Drag and Drop File to Upload</h1>
						<h1>Or</h1>
						<input
							type="file"
							onChange={(event) => {
								const selectedFile = event.target.files?.[0]; // Usar o operador de opção
								if (selectedFile) {
									setFile(selectedFile);
								}
							}}
							hidden
							accept="image/png, image/jpeg"
							ref={inputRef}
						/>
						<button className="buttonSelectFile" onClick={() => inputRef.current?.click()}>Select File</button>
					</S.DropZone>
				)}
				{uploading && (
					<div className="loading">
						<ClipLoader color="#00BFFF" loading={uploading} size={80} />
						<p>Uploading...</p>
					</div>
				)}
				{file && !uploading && !uploadSuccess && (
					<div className="uploads">
						<div className="ulFileName">File name: {file.name}</div>
						<S.ButtonsUpload>
							<button className="cancelButton" onClick={() => setFile(null)}>Cancel</button>
							<button className="uploadButton" onClick={handleUpload}>Upload</button>
						</S.ButtonsUpload>
					</div>
				)}
				<div className="createdBy">
					created by <a href="https://github.com/LuisZamonaro"><span id="c">LuisZamonaro</span></a> - devChallenges.io
				</div>
			</S.Container>
		</>
	);
};

export default DragDropFiles;

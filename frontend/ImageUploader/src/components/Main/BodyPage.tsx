import React, { useState } from "react";
import axios from 'axios';

export default function Main() {
    const [imageLink, setImageLink] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
    }

    const handleUpload = async (): Promise<void> => {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('image', selectedFile);

                const response = await axios.post('http://localhost:3001/upload', formData);
                const imageId = response.data.imageId; // Supondo que o servidor envia o ID
                const imageLink = `http://localhost:3001/image/${imageId}`;
                setImageLink(imageLink);
                console.log('Imagem enviada com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar a imagem:', error);
            }
        }
    }

    const handleCopyLink = () => {
        if (imageLink) {
            navigator.clipboard.writeText(imageLink)
                .then(() => {
                    console.log('Link copiado para a área de transferência.');
                })
                .catch((error) => {
                    console.error('Erro ao copiar o link:', error);
                });
        }
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Enviar Imagem</button>

            {imageLink && (
                <div>
                    <input
                        type="text"
                        value={imageLink}
                        readOnly
                    />
                    <button onClick={handleCopyLink}>
                        Copy Link
                    </button>
                </div>
            )}

            {imageLink && <img src={imageLink} alt="Imagem enviada" />}
        </div>
    );
}

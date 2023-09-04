// Importa módulos e tipos necessários do Express
import express, { Request, Response } from 'express'
// Importa o middleware multer para lidar com upload de arquivos
import multer from 'multer'
// Importa o módulo mongoose para interagir com o MongoDB
import mongoose, { Connection } from 'mongoose'
// Importa o módulo path para manipular caminhos de arquivos
import path from 'path'
// Importa o módulo cors para habilitar requisições de diferentes origens
import cors from 'cors'

// Cria uma instância do aplicativo Express
const app = express()

// Habilita o middleware cors para lidar com requisições de diferentes origens
app.use(cors())

// Configuração para armazenamento de arquivos usando multer
const storage = multer.diskStorage({
	destination: './uploads', // Diretório de destino dos arquivos
	filename: function(req, file, cb) {
		// Gera um nome de arquivo único baseado no campo do arquivo e na data
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

// Cria uma instância do middleware multer com a configuração de armazenamento
const upload = multer({ storage })

// Conecta-se ao banco de dados MongoDB
mongoose.connect('mongodb+srv://luiszamonaro1:zvL0l2YdHwKhQ5MF@cluster0.ynyq46s.mongodb.net/')
	.then(() => console.log('Connected to MongoDB!'))
	.catch(() => console.log('Error connecting to MongoDB.'))

// Cria uma referência à conexão do MongoDB
const db: Connection = mongoose.connection

// Lida com erros de conexão ao MongoDB
db.on('error', (error) => {
	console.error('MongoDB connection error:', error)
})

// Indica que a conexão ao MongoDB foi estabelecida com sucesso
db.once('open', () => {
	console.log('Connected to MongoDB')
})

// Define a estrutura do documento para a coleção "Image" no MongoDB
interface Image {
	name: string;
	path: string;
}

// Define o esquema do documento usando o módulo mongoose
const imageSchema = new mongoose.Schema<Image>({
	name: String,
	path: String
})

// Cria um modelo do documento usando o esquema definido
const ImageModel = mongoose.model<Image>('Image', imageSchema)

// Rota para upload de imagens, usando o middleware multer
app.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
	try {
		// Obtém informações do arquivo enviado no corpo da requisição
		const { filename, path } = req.file as Express.Multer.File
		// Cria uma nova instância do modelo Image
		const image = new ImageModel({ name: filename, path })
		// Salva o documento no MongoDB
		await image.save()
		// Responde com uma mensagem de sucesso
		res.send('Image uploaded successfully!')
	} catch (error) {
		// Lida com erros durante o upload e envia uma resposta de erro
		if (error instanceof Error) {
			res.status(500).send(error.message)
		} else {
			res.status(500).send('An unknown error occurred')
		}
	}
})

// Define a porta em que o servidor Express irá escutar
const port = 3001

// Inicia o servidor Express na porta especificada
app.listen(port, () => {
	console.log(`🚀 Server is running on http://localhost:${port}`)
})

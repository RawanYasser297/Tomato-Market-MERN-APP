require('dotenv').config()
const express =require('express')
const mongoose =require('mongoose')
const router=require('./routes/route')
const usersRoute=require('./routes/usersRoute')
const adminRoute=require('./routes/adminRoute')
const cookieParser = require('cookie-parser')
const multer=require('multer')
const cors =require('cors');
const path = require('path');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images'); // Folder to store uploads
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cb(null, `${timestamp}_${file.originalname}`);
  }
});

const app = express();

// ✅ Serve images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// ✅ Use multer
app.use(multer({ storage: fileStorage }).single('image'));

app.use(cookieParser())
const port ='5555'
const allowedOrigins = [
  'http://localhost:5173',
  process.env.STRIPE_LINK // Ensure this is defined in your environment variables
].filter(Boolean); // This will remove any undefined values

// Use CORS middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Optionally, you can handle preflight requests
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.sendStatus(200);
});


app.use(express.json())
app.use('/api',router)
app.use('/api/v1',usersRoute)
app.use('/admin',adminRoute)



const start =async()=>{
try{
    await mongoose.connect(process.env.MONGODB_SECRET)
    app.listen(port,()=>{
        console.log('connected to db')
    })
}catch(err){
    console.log(err)
}
}



start()



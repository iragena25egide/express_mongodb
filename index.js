const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const userRoute=require('./routes/router');
const cors=require('cors');




dotenv.config();
app.use(express.json());
app.use(bodyparser.json());
app.use('/',userRoute);
app.use(cors());



app.get('/',(req,res)=>{
    res.send('MongoDb API');
})

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB: ', error);
  });
  








app.listen(8000 || process.env.PORT,()=>{
    console.log('app is now listening to the server')
});
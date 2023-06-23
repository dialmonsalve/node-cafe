import mongoose from 'mongoose';

const dbConnection = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URL || '');

    console.log('Database is online');

  } catch (error) {

    console.log(error);

    throw new Error('There is an error while the data base was connected')
  }

}


export {
  dbConnection
}
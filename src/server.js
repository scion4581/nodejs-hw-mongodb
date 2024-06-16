import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use(cors());

    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    app.get('/', async (req, res) => {
      res.json({
        message: 'Hello from the contacts API',
      });
    });
  
    app.get('/contacts', async (req, res) => {
      const contacts = await getAllContacts();

      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts
      });
    });
  
    app.get('/contacts/:contactId', async (req, res, next) => {
      const { contactId } = req.params;
      let contact = null;
      try {
        contact = await getContactById(contactId);
      } catch (err){
        next(err);
        return;
      }

      if (!contact) {
        res.status(404).json({
          status: 400,
          message: `Contact with id = ${contactId} was not found`,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: `Successfully found contact with id ${contactId}!`,
          data: contact
        });
      }
    });
    
    app.use((err, req, res, next) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    });
  
    app.use('*', async (req, res, next) => {
      res.status(404).json({
        message: 'Not found',
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}



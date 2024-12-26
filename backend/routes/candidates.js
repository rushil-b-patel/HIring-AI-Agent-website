const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const mongoose = require('mongoose');
const Candidate = require('../models/Candidate');

const router = express.Router();

let clients = [];

router.post('/find', async (req, res) => {
  const {
    email,
    password,
    jobRole,
    jobDescription,
    startDate,
    endDate,
    candidatesRequired
  } = req.body;

  const pythonProcess = spawn('python', [
    path.join(__dirname, '../../python/hiring_agent.py'),
    '--email', email,
    '--password', password,
    '--subject', jobRole,
    '--start-date', startDate,
    '--end-date', endDate,
    '--job-description', jobDescription,
    '--num-candidates', candidatesRequired.toString()
  ]);

  let dataString = '';
  let errorString = '';

  pythonProcess.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorString += data.toString();
  });

  pythonProcess.on('close', async (code) => {
    if (code !== 0) {
      console.error('Python script error:', errorString);
      clients.forEach(client => client.res.write(`data: ${errorString}\n\n`));
      return res.status(500).json({ error: 'Candidate processing failed', details: errorString });
    }

    try {
      const results = JSON.parse(dataString);
      clients.forEach(client => client.res.write(`data: Candidates found successfully!\n\n`));

      // Save candidates to MongoDB
      await Candidate.insertMany(results);

      res.json({ success: true, candidates: results });
    } catch (error) {
      console.error('Failed to parse results:', error.message);
      clients.forEach(client => client.res.write(`data: ${error.message}\n\n`));
      res.status(500).json({ error: 'Failed to parse results', details: error.message });
    }
  });
});

router.get('/status', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);

  req.on('close', () => {
    clients = clients.filter(client => client.id !== clientId);
  });
});

module.exports = router;
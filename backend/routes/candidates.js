// const express = require('express');
// const { spawn } = require('child_process');
// const path = require('path');

// const router = express.Router();

// router.post('/find', async (req, res) => {
//   const {
//     email,
//     password,
//     jobRole,
//     jobDescription,
//     startDate,
//     endDate,
//     candidatesRequired
//   } = req.body;

//   const pythonProcess = spawn('python', [
//     path.join(__dirname, '../../python/hiring_agent.py'),
//     '--email', email,
//     '--password', password,
//     '--subject', jobRole,
//     '--start-date', startDate,
//     '--end-date', endDate,
//     '--job-description', jobDescription,
//     '--num-candidates', candidatesRequired.toString()
//   ]);

//   let dataString = '';
//   let errorString = '';

//   pythonProcess.stdout.on('data', (data) => {
//     dataString += data.toString();
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     errorString += data.toString();
//   });

//   pythonProcess.on('close', (code) => {
//     if (code !== 0) {
//       console.error('Python script error:', errorString);
//       return res.status(500).json({ error: 'Candidate processing failed', details: errorString });
//     }

//     try {
//       const results = JSON.parse(dataString);
//       res.json({ success: true, candidates: results });
//     } catch (error) {
//       console.error('Failed to parse results:', error.message);
//       res.status(500).json({ error: 'Failed to parse results', details: error.message });
//     }
//   });
// });

// module.exports = router;

const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();

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

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Python script error:', errorString);
      return res.status(500).json({ error: 'Candidate processing failed', details: errorString });
    }

    try {
      const results = JSON.parse(dataString);
      res.json({ success: true, candidates: results });
    } catch (error) {
      console.error('Failed to parse results:', error.message);
      res.status(500).json({ error: 'Failed to parse results', details: error.message });
    }
  });
});

router.get('/status', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendStatus = (message) => {
    res.write(`data: ${message}\n\n`);
  };

  req.on('close', () => {
    res.end();
  });

  global.sendStatus = sendStatus;
});

module.exports = router;
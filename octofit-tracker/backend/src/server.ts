import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

const createListHandler = (model: any, key: string) => async (_request: any, response: any) => {
  try {
    const docs = await (model as any).find().lean();
    response.json({ [key]: docs });
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch data', details: (error as Error).message });
  }
};

app.get('/api/users', createListHandler(User, 'users'));
app.get('/api/users/', createListHandler(User, 'users'));
app.get('/api/teams', createListHandler(Team, 'teams'));
app.get('/api/teams/', createListHandler(Team, 'teams'));
app.get('/api/activities', createListHandler(Activity, 'activities'));
app.get('/api/activities/', createListHandler(Activity, 'activities'));
app.get('/api/leaderboard', createListHandler(Leaderboard, 'leaderboard'));
app.get('/api/leaderboard/', createListHandler(Leaderboard, 'leaderboard'));
app.get('/api/workouts', createListHandler(Workout, 'workouts'));
app.get('/api/workouts/', createListHandler(Workout, 'workouts'));

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

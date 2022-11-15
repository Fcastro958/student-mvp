const express = require('express');
const cors = require('cors');
const app = express();
// const port = 3030;
const {Pool} = require('pg');
// const pool = new Pool({
//     user: 'postgres',
//     host: '127.0.0.1',
//     database: 'trival_d',
//     password: 'docker',
//     port: 5432,
// });

const config=require('./config')[process.env.NODE_ENV||'dev'];
const PORT = config.port;
const pool= new Pool({
    connectionString: config.connectionString
});
pool.connect();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
//gets all questions 
app.get('/trivia', (req, res)=>{
    async function getTriva(){
        try{
            const result = await pool.query('SELECT * FROM triva ');
            console.log(result);
            res.send(result.rows);
        } catch(e) {
            console.error(e.stack);
        }
    }
    getTriva();
});
//gets certain amount of questions
app.get('/trivia/:id', (req, res)=>{
    async function getTrivaById(){
        try{
            const result = await pool.query(`SELECT * FROM triva LIMIT ${req.params.id}`);
            console.log(result);
            res.send(result.rows);
        } catch(e) {
            console.error(e.stack);
        }
    }
    getTrivaById();
});
//gets scoreboard
app.get('/scoreboard', (req, res)=>{
    async function getscoreBoard(){
        try{
            const result = await pool.query('SELECT * FROM scoreboard');
            console.log(result);
            res.send(result.rows);
        } catch(e) {
            console.error(e.stack);
        }
    }
    getscoreBoard();
});

app.delete('/scoreboard/:id',(req, res)=>{
    async function deleteScoreBoard(){
        try{
            const result = await pool.query(`DELETE FROM scoreboard WHERE id = ${req.params.id}`);
            res.status(200).send(result.rows);
        } catch (e) {
            console.error(e.stack);
        }
    }
    deleteScoreBoard();
});

app.post('/scoreboard', (req, res)=>{
    async function createScoreBoard() {
        try{
            let scoreBoard = req.body;
            let name = scoreBoard.name;
            let age = scoreBoard.age;
            let score = scoreBoard.score;
            const result = await pool.query(`INSERT INTO scoreboard (name, age, score) VALUES ('${name}', ${age}, ${score})`);
            res.status(201).send(result.rows);
        } catch (e) {
            console.error(e.stack);
        }
    } 
    createScoreBoard();
});



app.listen(PORT, () => {
    console.log(` back end , listening on port ${PORT}`);
});
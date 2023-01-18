import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { assignmentClient } from './httpClient/assignmentClient';
import { PostsDto } from "./dto/PostsDto";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());

app.get('/posts', (req, res) => {
    assignmentClient.get<PostsDto>('posts', { params: { page: req.query.page} })
        .then(response => {
            res.status(200).json(response.data.data.posts);
        })
        .catch(err => {
            res.status(500).json({ message: err })
        });
});

app.listen(port, () => console.log(`Running on port ${port}`));

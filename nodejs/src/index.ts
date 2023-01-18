import express from 'express';
import dotenv from 'dotenv';
import { assignmentClient } from './httpClient/assignmentClient';
import { PostsDto } from "./dto/PostsDto";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.get('/posts', (req, res) => {
    assignmentClient.get<PostsDto>('posts')
        .then(response => {
            res.status(200).json(response.data.data.posts);
        })
        .catch(err => {
            res.status(500).json({ message: err })
        });
});

app.listen(port, () => console.log(`Running on port ${port}`));

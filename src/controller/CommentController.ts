import { getConnection } from "typeorm";
import { resourceLimits } from "worker_threads";
import { Board } from "../entity/Board";
import { Comment } from "../entity/Comment";

export class CommentController {
    static addComment = async (req, res) => {
        const { board_id, content } = req.body;

        const board = await getConnection().getRepository(Board).findOne({ id: board_id });

        const comment = new Comment();
        comment.content = content;
        comment.board = board;
        await getConnection().getRepository(Comment).save(comment);

        res.send(comment);
    }

    static findAllComment = async (req, res) => {
        const { board_id } = req.query;

        const board = await getConnection().getRepository(Board)
            .findOne({ relations: ['comments'], where: { id: board_id }, order: { id: 'DESC' }});

        res.send(board.comments);
    }

    static findOneComment = async (req, res) => {
        const { id } = req.query;

        const comment = await getConnection().getRepository(Comment).findOne({ id: id });
        console.log(comment);
        res.send(comment);
    }

    static modifyComment = async (req, res) => {
        const { id, content } = req.body;

        const result = await getConnection().createQueryBuilder().update(Comment)
            .set({ content })
            .where('id = :id', { id })
            .execute();
        
        res.send(result);
    }

    static removeComment = async (req, res) => {
        const { id } = req.query;

        const result = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Comment)
            .where('id = :id', { id })
            .execute();
        
        res.send(result);
    }
}
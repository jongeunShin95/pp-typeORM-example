import { getConnection } from "typeorm";
import { Board } from "../entity/Board";
import { User } from "../entity/User";

export class BoardController {
    static addBoard = async (req, res) => {
        const { title, content, user_id } = req.body;

        const user = await getConnection().getRepository(User).findOne({ id: user_id });

        const board = new Board();
        board.title = title;
        board.content = content;
        board.user = user;
        const result = await getConnection().getRepository(Board).save(board);

        res.send(result);
    }

    static countBoard = async (req, res) => {
        const total = await getConnection().getRepository(Board).count();
        res.send({ total });
    }

    static findAllBoard = async (req, res) => {
        const { page_number, page_size } = req.query;

        const options = {};
        options['select'] = ['id', 'title', 'content', 'created', 'updated'];
        options['order'] = { id: 'DESC' };
        options['relations'] = ['user'];

        if (page_number && page_size) {
            options['skip'] = (page_number - 1) * page_size;
            options['take'] = page_size;
        }

        const boards = await getConnection().getRepository(Board).find(options);
        res.send(boards);
    }

    static findOneBoard = async (req, res) => {
        const { id } = req.params;

        const board = await getConnection().getRepository(Board).findOne({ relations: ['user'], where: { id } });
        res.send(board);
    }

    static modifyBoard = async (req, res) => {
        const { id, title, content } = req.body;

        const updateOption = {};
        if (title) updateOption['title'] = title;
        if (content) updateOption['content'] = content;

        const result = await getConnection().createQueryBuilder().update(Board)
            .set(updateOption)
            .where('id = :id', { id })
            .execute();

        res.send(result);
    }

    static removeBoard = async (req ,res) => {
        const { id } = req.query;

        const result = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Board)
            .where('id = :id', { id })
            .execute();
        
        res.send(result);
    }
}
import { compareSync, hashSync } from "bcryptjs";
import { getConnection } from "typeorm";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import jwt from 'jsonwebtoken';

export class AuthController {
    static signIn = async (req, res) => {
        const { email, password } = req.body;

        const user = await getConnection().getRepository(User).findOne({ relations: ['roles'], where: { email } });

        if (!user) return res.status(400).send({ message: 'User Not foun.' });
        if (!compareSync(password, user.password)) return res.status(400).send({ message: 'Invalid password' });

        const token = jwt.sign({ jti: user.id, email: user.email, roles: user.roles.map(role => role.name) },
            process.env.secret, {
                subject: user.username,
                algorithm: 'HS512',
                expiresIn: process.env.expirationSecondMs
            }
        );

        res.send({ jwt: token });
    }

    static signUp = async (req, res) => {
        const { email, password, username, roles } = req.body;

        const user = new User();
        user.email = email;
        user.password = hashSync(password, 8);
        user.username = username;

        const existUser = await getConnection().getRepository(User)
            .findOne({ where: { email }});

        if (existUser) return res.status(400).send({ message: 'User Not found.' });

        user.roles = [];

        if (roles && roles.length > 0) {
            const res = await getConnection().getRepository(Role).find({
                where: roles.map(name => ({ name }))
            });
            user.roles = res;
        } else {
            const res = await getConnection().getRepository(Role).find({
                where: { name: 'ROLE_USER' }
            });
            user.roles = res;
        }

        console.log(user);

        const result = await getConnection().getRepository(User).save(user);

        res.send(result);
    }
}
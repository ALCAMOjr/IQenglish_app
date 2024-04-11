import { pool } from "../db.js";
import { Resend } from 'resend';

const API_KEY = process.env.API_KEY;
const resend = new Resend(API_KEY);


export const getProspects = async (req, res) => {
    try {
        const { userId } = req

        // Verificar que el usuario sea de tipo admin o advisor
        const [users] = await pool.query('SELECT * FROM advisors WHERE id = ?', [userId]);
        if (users.length <= 0) {
            return res.status(400).send({ error: 'Invalid user id' });
        }

        const user = users[0];
        if (!['admin', 'advisor'].includes(user.user_type)) {
            return res.status(403).send({ error: 'Unauthorized' });
        }

        const [rows] = await pool.query('SELECT * FROM prospects');
        res.json(rows);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while getting the prospects' });
    }
}

export const getProspectById = async (req, res) => {
    try {
        const id = req.params.id;
        const { userId } = req

        // Verificar que el usuario sea de tipo admin o advisor
        const [users] = await pool.query('SELECT * FROM advisors WHERE id = ?', [userId]);
        if (users.length <= 0) {
            return res.status(400).send({ error: 'Invalid user id' });
        }

        const user = users[0];
        if (!['admin', 'advisor'].includes(user.user_type)) {
            return res.status(403).send({ error: 'Unauthorized' });
        }

        const [rows] = await pool.query('SELECT * FROM prospects WHERE id = ?', [id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Prospect not found'
        });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while getting the prospect by id' });
    }
}

export const createProspect = async (req, res) => {
    try {
        const { name, lastname, email, phone_number, age, addresses } = req.body;

        if (!name || !lastname || !email || !phone_number || !age || !addresses) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        const [rows] = await pool.query('INSERT INTO prospects (name, lastname, email, phone_number, age, addresses) VALUES (?, ?, ?, ?, ?, ?)', [name, lastname, email, phone_number, age, addresses]);

        // Enviar correo electrónico después de crear el prospecto
        const emailResponse = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ['iqenglishapp@gmail.com'],
            subject: 'Nuevo prospecto creado',
            html: `<strong>Se ha creado un nuevo prospecto:</strong><br>Id: ${rows.insertId}`,
        });

        // Capturar el ID del correo electrónico
        const emailId = emailResponse.data.id;

        res.send({
            id: rows.insertId,
            name,
            emailId
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while creating the prospect' });
    }
}

export const updateProspect = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, email, phone_number, age, addresses } = req.body;

        const { userId } = req

        // Verificar que el usuario sea de tipo admin o advisor
        const [users] = await pool.query('SELECT * FROM advisors WHERE id = ?', [userId]);
        if (users.length <= 0) {
            return res.status(400).send({ error: 'Invalid user id' });
        }

        const user = users[0];
        if (!['admin', 'advisor'].includes(user.user_type)) {
            return res.status(403).send({ error: 'Unauthorized' });
        }

        // Actualizar el prospecto
        const [result] = await pool.query('UPDATE prospects SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), email = IFNULL(?, email), phone_number = IFNULL(?, phone_number), age = IFNULL(?, age), addresses = IFNULL(?, addresses) WHERE id = ?', [name, lastname, email, phone_number, age, addresses, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Prospect not found'
        })

        const [rows] = await pool.query('SELECT * FROM prospects WHERE id = ?', [id])
        res.json(rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while updating the prospect' });
    }
}

export const deleteProspect = async (req, res) => {
    try {
        const { userId } = req

        // Verificar que el usuario sea de tipo admin o advisor
        const [users] = await pool.query('SELECT * FROM advisors WHERE id = ?', [userId]);
        if (users.length <= 0) {
            return res.status(400).send({ error: 'Invalid user id' });
        }

        const user = users[0];
        if (!['admin', 'advisor'].includes(user.user_type)) {
            return res.status(403).send({ error: 'Unauthorized' });
        }

        // Eliminar el prospecto
        const [result] = await pool.query('DELETE FROM prospects WHERE id = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Prospect not found'
        });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while deleting the prospect' });
    }
};
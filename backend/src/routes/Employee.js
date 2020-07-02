import express from 'express';
import { v1 } from 'uuid';
import { query, TABLE_EMPLOYEE } from '../db/db';

import {
  asyncUtil,
  parseId,
  parseJson,
} from './helpers';

const EmployeeRouter = express.Router();

// Get all
EmployeeRouter.get('/', asyncUtil(async (req, res) => {
  const result = await query(`
    SELECT * FROM ${TABLE_EMPLOYEE}
  `);

  res.send(result);
}));

// Get by id
EmployeeRouter.get('/:id', asyncUtil(async (req, res) => {
  const id = parseId(req);

  const result = await query(`
    SELECT * FROM ${TABLE_EMPLOYEE}
    WHERE id = '${id}'
  `);

  res.send(result[0]);
}));

// POST
EmployeeRouter.post('/', asyncUtil(async (req, res) => {
  const body = parseJson(req);

  const id = v1();

  await query(
    `INSERT INTO ${TABLE_EMPLOYEE} (id, lastname, firstname) ` +
    'VALUES (' +
      `'${id}', ` +
      `'${body.lastname}', ` +
      `'${body.firstname}'` +
    ');');

  res.send(true);
}));

// PUT
EmployeeRouter.put('/', asyncUtil(async (req, res) => {
  const body = parseJson(req);
  const id = body.id;
  if (!id) {
    const err = new Error('no id provided');
    err.status = 400;
    throw err;
  }

  await query(
    `UPDATE ${TABLE_EMPLOYEE} ` +
    `SET lastname = '${body.lastname}', ` +
    `firstname = '${body.firstname}' ` +
    `WHERE id = '${id}'`);

  res.send(true);
}));

// DELETE
EmployeeRouter.delete('/:id', asyncUtil(async (req, res) => {
  const id = parseId(req);

  await query(
    `DELETE FROM ${TABLE_EMPLOYEE} ` +
    `WHERE id = '${id}'`);

  res.send(true);
}));

export default EmployeeRouter;

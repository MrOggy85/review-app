import express from 'express';
import { v1 } from 'uuid';
import { query, TABLE_REVIEW, TABLE_EMPLOYEE_REVIEW } from '../db/db';

import {
  asyncUtil,
  parseId,
  parseJson,
} from './helpers';

const ReviewRouter = express.Router();

// Get all
ReviewRouter.get('/', asyncUtil(async (req, res) => {
  const result = await query(
    `SELECT r.id, r.date, r.employeeId, er.employeeId as assigneeId, submitted FROM ${TABLE_REVIEW} as r ` +
    `LEFT JOIN ${TABLE_EMPLOYEE_REVIEW} as er ` +
    'ON r.id = er.reviewId;'
  );

  const reviews = {};
  result.forEach(r => {
    const review = reviews[r.id];
    if (!review) {
      reviews[r.id] = {
        ...r,
        assigneeIds: [r.assigneeId],
      };
      delete reviews[r.id].assigneeId;
    } else {
      reviews[r.id].assigneeIds.push(r.assigneeId);
    }
  });

  res.send(Object.values(reviews));
}));

// Get by id
ReviewRouter.get('/:id', asyncUtil(async (req, res) => {
  const id = parseId(req);

  const result = await query(`
    SELECT * FROM ${TABLE_REVIEW}
    WHERE id = '${id}'
  `);

  res.send(result[0]);
}));

// POST
ReviewRouter.post('/', asyncUtil(async (req, res) => {
  const body = parseJson(req);

  const id = v1();

  // const date = new Date().toISOString();
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  await query(
    `INSERT INTO ${TABLE_REVIEW} (id, date, employeeId) ` +
    'VALUES (' +
      `'${id}', ` +
      `'${date}', ` +
      `'${body.employeeId}'` +
    ');');

  const assigneeIds = body.assigneeIds;

  const hej = assigneeIds.map((assigneeId) => {
    return query(
      `INSERT INTO ${TABLE_EMPLOYEE_REVIEW} (reviewId, employeeId, date, feedback, submitted) ` +
      'VALUES (' +
        `'${id}', ` +
        `'${assigneeId}', ` +
        `'${date}', ` +
        `'', ` +
        `0 ` +
      ');');
  });

  await Promise.all(hej);

  res.send(true);
}));

// // PUT
ReviewRouter.put('/', asyncUtil(async (req, res) => {
  const body = parseJson(req);
  const id = body.id;
  if (!id) {
    const err = new Error('no id provided');
    err.status = 400;
    throw err;
  }

  const date = new Date().toISOString();

  await query(
    `UPDATE ${TABLE_REVIEW} ` +
    `SET date = '${date}', ` +
    `WHERE id = '${id}'`);

  res.send(true);
}));

// DELETE
ReviewRouter.delete('/:id', asyncUtil(async (req, res) => {
  const id = parseId(req);

  await query(
    `DELETE FROM ${TABLE_REVIEW} ` +
    `WHERE id = '${id}'`);

  res.send(true);
}));

export default ReviewRouter;

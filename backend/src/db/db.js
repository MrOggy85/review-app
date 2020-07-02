import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'my-secret-pw',
  database: 'review',
});

connection.connect();

export async function query(queryText) {
  return new Promise((resolve, reject) => {
    connection.query(queryText, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

export const TABLE_EMPLOYEE = 'employee';
export const TABLE_REVIEW = 'review';
export const TABLE_EMPLOYEE_REVIEW = 'employee_review';

export async function createDB() {
  // await query(`DROP TABLE ${TABLE_EMPLOYEE_REVIEW};`);
  // await query(`DROP TABLE ${TABLE_REVIEW};`);
  // await query(`DROP TABLE ${TABLE_EMPLOYEE};`);

  const employeeTableExists = !!(await query(`SHOW TABLES LIKE "${TABLE_EMPLOYEE}"`))[0];
  if (!employeeTableExists) {
    await query(`
    CREATE TABLE ${TABLE_EMPLOYEE} (
      id VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      firstname VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    );
  `);
  }

  const reviewTableExists = !!(await query(`SHOW TABLES LIKE "${TABLE_REVIEW}"`))[0];
  if (!reviewTableExists) {
    await query(`
    CREATE TABLE ${TABLE_REVIEW} (
      id VARCHAR(255) NOT NULL,
      date DATETIME(0) NOT NULL,
      employeeId VARCHAR(255) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (employeeID) REFERENCES ${TABLE_EMPLOYEE}(id)
    );
  `);
  }

  const employeeReviewTableExists = !!(await query(`SHOW TABLES LIKE "${TABLE_EMPLOYEE_REVIEW}"`))[0];
  if (!employeeReviewTableExists) {
    await query(`
    CREATE TABLE ${TABLE_EMPLOYEE_REVIEW} (
      reviewId VARCHAR(255) NOT NULL,
      employeeId VARCHAR(255) NOT NULL,
      date DATETIME(0) NOT NULL,
      feedback TEXT(65534) NOT NULL,
      submitted BOOL NOT NULL,
      PRIMARY KEY (reviewId, employeeID, date),
      FOREIGN KEY (reviewId) REFERENCES ${TABLE_REVIEW}(id),
      FOREIGN KEY (employeeID) REFERENCES ${TABLE_EMPLOYEE}(id)
    );
  `);
  }
}

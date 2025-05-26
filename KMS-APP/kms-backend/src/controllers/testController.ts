import type { Request, Response } from "express";

const clientDB = require("../../utils/clientDB");
const client = clientDB();

exports.testPostController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, id } = req.body as { name: string; id: number };

  const insertQuery: string = "INSERT INTO demotable (name,id) VALUES ($1,$2)";

  client.query(insertQuery, [name, id], (err: Error, result: any) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send("POST DATA");
    }
  });
};

exports.testGetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const getQuery = "Select * from demotable";
  client.query(getQuery, (err: Error, result: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
};

exports.testGetByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  const getByIdQuery = "Select * from demotable where id=$1";
  client.query(getByIdQuery, [id], (err: Error, result: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
};

exports.testUpdateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const name = req.body.name;
  const id = req.params.id;

  if (!name || !id) {
    res.status(400).send("Missing 'name' or 'id'");
  }

  const updateQuery = "UPDATE demotable SET name = $1 WHERE id = $2";
  client.query(updateQuery, [name, id], (err: Error, result: any) => {
    if (err) {
      console.error("Update error:", err);
      res.status(500).send("Database error");
    }

    if (result.rowCount === 0) {
      res.status(404).send("No record updated (ID not found)");
    }

    res.status(200).send("Update successful");
  });
};

exports.testDeleteController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  const updateQuery = "DELETE from demotable where id = $1";
  client.query(updateQuery, [id], (err: Error, result: any) => {
    if (err) {
      console.error("Update error:", err);
      res.status(500).send("Database error");
    }

    if (result.rowCount === 0) {
      res.status(404).send("No record updated (ID not found)");
    }

    res.status(200).send("Delete successful");
  });
};

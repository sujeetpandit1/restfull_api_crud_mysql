const axios = require("axios");

//! Fetched and push data
const bulkdata = async (req, res) => {
  try {
    var db = req.con;
    const response = await axios.get("https://api.publicapis.org/entries");
    const data = response.data.entries;

    const keys = Object.keys(data[0]);
    create_table(db, keys);

    insert_data(db, data);

    res.status(200).json({
      status: true,
      message: "Fetched data, created table, and data inserted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }

  function create_table(db) {
    const column = {
      API: "VARCHAR(255)",
      Description: "MEDIUMTEXT",
      Auth: "VARCHAR(255)",
      HTTPS: "BOOLEAN",
      Cors: "VARCHAR(255)",
      Link: "VARCHAR(255)",
      Category: "VARCHAR(255)",
    };

    const columnData = Object.entries(column)
      .map(([key, dataTypes]) => `${key} ${dataTypes}`)
      .join(",\n");

    const create_table_query = `CREATE TABLE IF NOT EXISTS public_apis(
      id INT PRIMARY KEY AUTO_INCREMENT, ${columnData})`;

    db.query(create_table_query, (error) => {
      if (error) {
        return res.status(500).json("Error creating table: " + error);
      }
      console.log("Table created successfully"); 
    });
  }

  function insert_data(db, data) {
    const insert_query = "INSERT INTO public_apis (API, Description, Auth, HTTPS, Cors, Link, Category) VALUES ?";
    const values = data.map(entry => [entry.API, entry.Description, entry.Auth, entry.HTTPS, entry.Cors, entry.Link, entry.Category]);

    db.query(insert_query, [values], (error) => {
      if (error) {
        return res.status(500).json("Error inserting data: " + error);
      }
      console.log("All data inserted successfully");
    });
  }
};

//! fetch all data
const getData = async (req, res) => {
    try {
      const db = req.con;
      const query = "SELECT * FROM public_apis LIMIT ? OFFSET ?";
      const pageSize = req.query.pageSize || 10;
      const page = req.query.page || 1;
      const limit = parseInt(pageSize, 10);
      const offset = (parseInt(page, 10) - 1) * limit;
  
      db.query(query, [limit, offset], (error, result) => {
        if (error) {
          return res.status(400).json({
            status: false,
            message: "Data not found",
          });
        }
        return res.status(200).send({
          status: true,
          count: result.length,
          data: result,
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };

//! Get Data By Id

const getDataById = async (req, res) => {
  try {
    const db = req.con;
    const id = req.params.id;

    if (!id) {
      return res.status(403).json('Id is required');
    }

    const sql = 'SELECT * FROM public_apis WHERE id = ?';
    await db.query(sql, [id], (error, result) => {
      if (error) {
        return res.status(400).send({ status: false, message: error.message });
      }

      if (result.length > 0) {
        return res.status(200).send({
          status: true,
          data: result,
        });
      } else {
        return res.status(400).send({ status: false, message: "Data not found" });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! Update Data
const updateData = async (req, res) => {
  try {
    const db = req.con;
    const id = req.params.id;

    if (!id) {
      return res.status(403).json('Id is required');
    }

    const sql = 'SELECT id FROM public_apis WHERE id = ?';
    await db.query(sql, [id], (error, result) => {
      if (error) {
        return res.status(400).send({ status: false, message: error.message });
      }

      if (result.length > 0) {
        const { API, Description, Auth, HTTPS, Cors, Link, Category } = req.body;

        // Create an object with the fields that are provided in the request
        const updatedFields = {};
        if (API) updatedFields.API = API;
        if (Description) updatedFields.Description = Description;
        if (Auth) updatedFields.Auth = Auth;
        if (HTTPS) updatedFields.HTTPS = HTTPS;
        if (Cors) updatedFields.Cors = Cors;
        if (Link) updatedFields.Link = Link;
        if (Category) updatedFields.Category = Category;

        // Check if any field has been updated
        if (Object.keys(updatedFields).length === 0) {
          return res.status(401).send({status: false, message:"Please provide at least one valid parameter to be updated"});
        }

        db.query("UPDATE public_apis SET ? WHERE id=?", [updatedFields, id], (error) => {
          if (error) {
            return res.status(400).send({ status: false, message: error.message });
          }

          return res.status(200).send({ status: true, message: "Data Updated Successfully" });
        });
      } else {
        return res.status(400).send({ status: false, message: "Data not found" });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const deleteById = async (req, res) => {
  try {
    const db = req.con;
    const id = req.params.id;

    if (!id) {
      return res.status(403).json('Id is required');
    }

    const sql = 'SELECT id FROM public_apis WHERE id = ?';
    await db.query(sql, [id], async (error, result) => {
      if (error) {
        return res.status(400).send({ status: false, message: error.message });
      }

      if (result.length > 0) {
        await db.query("delete from public_apis where id = ?", [id], (error) =>{
          if (error) return res.status(400).send({status: false, message: error.message});
  
          return res.status(200).send({status: true, message: "Data Deleted Successfully"})
        })
      } else {
        return res.status(400).send({ status: false, message: "Data not found" });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


  

module.exports = { bulkdata, getData, getDataById, updateData, deleteById};  

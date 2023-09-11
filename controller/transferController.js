//const transferRouter = require("../routes/transfer-route")
const { ObjectId } = require("mongodb");

const getAllTransfer = async (req, res) => {
    try {
      const bio = await req.db.collection('transaction').find().toArray()
      
      res.status(200).json({
        message: 'Transfer successfully retrieved',
        data: transaction
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  const createTransfer = async (req, res) => {
    const { amount, destinationAccount, information } = req.body
    
    console.log(amount, destinationAccount, information, `<=================== transaction ==================`);
    const status ="pending";
    
    try {
      const newTransaction = await req.db.collection('transaction').insertOne({ amount, destinationAccount, information })
      
      res.status(200).json({
        message: 'Transfer successfully created',
        data: newTransaction
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const approveTransfer = async (req, res) => {

    const { role } = req.user;
    if (role !== "approver") {
      return res.status(403).json({
        Message: "You are not approver",
      });
    }
  

    const { transferId, status } = req.body;
  
  
    if (status !== "approved" && status !== "not approved") {
      return res.status(400).json({
        Message: "Invalid status",
      });
    }
  
    try {
      const result = await req.db
        .collection("transaction")
        .updateOne({ _id: new ObjectId(transferId) }, { $set: { status } });
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({
          Message: "Transfer not found",
        });
      }
  
      if (status === "approved") {
        res.status(200).json({
          Message: "Approved",
        });
      } else {
        res.status(200).json({
          Message: "Not approved",
        });
      }
    } catch (error) {
      res.status(500).json({
        Message: error.message,
      });
    }
  };
  
  module.exports = { getAllTransfer, createTransfer, approveTransfer };
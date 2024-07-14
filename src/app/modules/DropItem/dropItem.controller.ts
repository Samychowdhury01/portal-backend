import { RequestHandler } from 'express';
import { DropItemsServices } from './dropItem.service';

const createDropItem: RequestHandler = async (req, res) => {
  try {
    const itemData = req.body;
    const result = await DropItemsServices.createItemIntoDB(itemData);
    res.status(200).json({
      success: true,
      message: 'Item created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!!',
      error,
    });
  }
};

const getDropItems: RequestHandler = async (req, res) => {
  try {
    const result = await DropItemsServices.getItemsFromDB();
    res.status(200).json({
      success: true,
      message: 'Items retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!!',
      error,
    });
  }
};

const updateItems: RequestHandler = async (req, res) => {
  try {
    const items = req.body;
    console.log(items);
    const result = await DropItemsServices.updateItemsFromDB(items);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Item created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!!',
      error,
    });
  }
};
const updateItemsOrder: RequestHandler = async (req, res) => {
  try {
    const items = req.body;

    const result = await DropItemsServices.updateItemsOrderFromDB(items);

    res.status(200).json({
      success: true,
      message: 'Item created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!!',
      error,
    });
  }
};

// delete item from DB
const deleteItem: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DropItemsServices.deleteItemFromDB(Number(id));
    res.status(200).json({
      success: true,
      message: 'Employee Deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!!',
      error,
    });
  }
};
export const DropItemsControllers = {
  createDropItem,
  getDropItems,
  updateItems,
  updateItemsOrder,
  deleteItem
};

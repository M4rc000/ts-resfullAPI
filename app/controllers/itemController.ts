import { Request, Response } from 'express';
import { ItemModel } from '../models/index';

export default class ItemController {
  async getAllItems(req: Request, res: Response) {
    try {
      const items = await ItemModel.find().exec();
      res.json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Error fetching items' });
    }
  }

  async getItem(req: Request, res: Response) {
    try {
      const item = await ItemModel.findById(req.params.id);
      if (!item) {
        throw new Error('Item not found');
      }
      res.json(item);
    } catch (error) {
      res.status(404).json({ error: 'Error fetching item' });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const updatedItem = await ItemModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedItem) {
        throw new Error('Item not found');
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: 'Error updating item' });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const deletedItem = await ItemModel.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        throw new Error('Item not found');
      }
      res.json(deletedItem);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting item' });
    }
  }

  async createItem(req: Request, res: Response) {
    try {
      const newItemData = req.body;
      const newItem = new ItemModel(newItemData);
      const savedItem = await newItem.save();
      res.json(savedItem);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Error creating item' });
    }
  }

  async aggregateItemsBySize(req: Request, res: Response) {
    try {
      const aggregationResult = await ItemModel.aggregate([
        {
          $match: { size: 'small' }, // Match items with size 'small'
        },
        {
          $group: {
            _id: '$size', // Group by size
            items: {
              $push: {
                name: '$name',
                size: '$size',
                price: '$price',
              },
            },
          },
        },
      ]);

      res.json(aggregationResult);
    } catch (error) {
      console.error('Error aggregating items:', error);
      res.status(500).json({ error: 'Error aggregating items' });
    }
  }
}

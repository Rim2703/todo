import express from 'express';
import Todo from '../models/todo';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get todos' });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});


// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});


export default router;
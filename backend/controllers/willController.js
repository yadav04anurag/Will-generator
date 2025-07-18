import Will from '../models/Will.js';

export const createWill = async (req, res) => {
  try {
    const will = new Will({ ...req.body, user: req.userId });
    await will.save();
    res.status(201).json(will);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error creating will.' });
  }
};

export const getUserWills = async (req, res) => {
  try {
    const wills = await Will.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(wills);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching wills.' });
  }
};

export const getWillById = async (req, res) => {
    try {
        const will = await Will.findOne({ _id: req.params.willId, user: req.userId });
        if (!will) return res.status(404).json({ message: 'Will not found' });
        res.json(will);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching will data.' });
    }
};

export const updateWill = async (req, res) => {
    try {
        const will = await Will.findOneAndUpdate(
            { _id: req.params.willId, user: req.userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!will) return res.status(404).json({ message: 'Will not found' });
        res.json(will);
    } catch (error) {
        res.status(500).json({ message: 'Server error updating will' });
    }
};

export const deleteWill = async (req, res) => {
    try {
        const will = await Will.findOneAndDelete({ _id: req.params.willId, user: req.userId });
        if (!will) return res.status(404).json({ message: 'Will not found or unauthorized' });
        res.json({ message: 'Will deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting will.' });
    }
};
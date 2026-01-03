import express from "express";
import Story from "../models/Story.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/**
 * ADMIN: Add a new story
 */
router.post("/", adminAuth, async (req, res) => {
  try {
    const { title, genre, description, content } = req.body;

    if (!title || !genre || !description || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const story = new Story({
      title,
      genre,
      description,
      content
    });

    await story.save();

    res.status(201).json({
      message: "Story added successfully",
      story
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * PUBLIC: Get all stories
 */
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * PUBLIC: Get single story
 */
router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

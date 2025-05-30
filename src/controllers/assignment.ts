import { Request, Response } from "express";
import Assignment from "../models/assignment";
import User from "../models/user";

export async function createAssignment(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { title, price, country, region, animal, size, category } =
      request.body;

    const assignment = await Assignment.create({
      title,
      price,
      country,
      region,
      animal,
      size,
      category,
    });

    const users = await User.find({ country: assignment.country });

    if (!users) {
      response.status(400).json({
        success: false,
        message: "Could not find users to the corresponding country",
      });

      return;
    }

    for (let i = 0; i < users.length; i++) {
      users[i].assignments.push(assignment._id);
      users[i].save();
    }

    response.status(201).json({ success: true, data: assignment });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function readAssignment(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;
    const assignment = await Assignment.findById(id);

    response.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function readAssignments(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const {
      query = "",
      filter = "",
      page = "1",
      status = "",
      country,
    } = request.query as {
      query?: string;
      filter?: string;
      page?: string;
      status?: string;
      country: string;
    };

    const currentPage = parseInt(page) || 1;
    const limit = 15;
    const skip = (currentPage - 1) * limit;

    // Build dynamic filter object
    const conditions: Record<string, any> = {};

    if (query) {
      conditions.title = { $regex: query, $options: "i" };
    }

    if (filter) {
      conditions.animal = filter;
    }

    if (status === "pending") {
      conditions.status = "pending";
    }

    if (country) {
      conditions.country = country;
    }

    const assignments = await Assignment.find(conditions)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Assignment.countDocuments(conditions);

    response.status(200).json({
      success: true,
      data: assignments,
      total,
      page: currentPage,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function updateAssignment(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;
    const data = request.body;

    if (!id) {
      response.status(400).json({
        success: false,
        message: "Assignment ID is required.",
      });
      return;
    }

    const assignment = await Assignment.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!assignment) {
      response.status(404).json({
        success: false,
        message: "Assignment not found.",
      });
      return;
    }

    response.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function deleteAssignment(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({
        success: false,
        message: "Assignment ID is required.",
      });
      return;
    }

    const assignment = await Assignment.findByIdAndDelete(id);

    if (!assignment) {
      response.status(404).json({
        success: false,
        message: "Assignment not found.",
      });
      return;
    }

    response.status(200).json({
      success: true,
      message: "Assignment deleted successfully.",
    });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

import { Request, Response } from "express";
import Order from "../models/order";

export async function createOrder(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { transactionId, customer, assignments } = request.body;

    const order = await Order.create({
      transactionId,
      customer,
      assignments,
    });

    response.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function getOrders(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const orders = await Order.find().populate("customer assignments");

    response.status(200).json({
      success: true,
      data: orders,
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

export async function getOrderById(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({
        success: false,
        message: "Order ID is required.",
      });
      return;
    }

    const order = await Order.findById(id).populate("customer assignments");

    if (!order) {
      response.status(404).json({
        success: false,
        message: "Order not found.",
      });
      return;
    }

    response.status(200).json({
      success: true,
      data: order,
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

export async function updateOrder(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;
    const data = request.body;

    if (!id) {
      response.status(400).json({
        success: false,
        message: "Order ID is required.",
      });
      return;
    }

    const order = await Order.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      response.status(404).json({
        success: false,
        message: "Order not found.",
      });
      return;
    }

    response.status(200).json({
      success: true,
      data: order,
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

export async function deleteOrder(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({
        success: false,
        message: "Order ID is required.",
      });
      return;
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      response.status(404).json({
        success: false,
        message: "Order not found.",
      });
      return;
    }

    response.status(200).json({
      success: true,
      message: "Order deleted successfully.",
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

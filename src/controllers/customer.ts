import { Request, Response } from "express";
import Customer from "../models/customer";

export async function createCustomer(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const {
      email,
      salutation,
      name,
      address1,
      address2,
      address3,
      city,
      county,
      postCode,
      country,
    } = request.body;

    const customer = await Customer.create({
      email,
      salutation,
      name,
      address1,
      address2,
      address3,
      city,
      county,
      postCode,
      country,
    });

    response.status(201).json({ success: true, data: customer });
  } catch (err) {
    console.error(err);

    response.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : err,
      message: "Internal server error.",
    });
  }
}

export async function getCustomers(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { search } = request.query;
    console.log("Search query:", search);
    const customers = await Customer.find().populate("assignments");

    response.status(200).json({
      success: true,
      data: customers,
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

export async function getCustomerById(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;
    const customer = await Customer.findById(id).populate("assignments");

    if (!customer) {
      response.status(404).json({
        success: false,
        message: "Customer not found.",
      });
      return;
    }

    response.status(200).json({
      success: true,
      data: customer,
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

export async function updateCustomer(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;
    const data = request.body;

    if (!id) {
      response.status(400).json({
        success: false,
        message: "Customer ID is required.",
      });
      return;
    }

    const customer = await Customer.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      response.status(404).json({
        success: false,
        message: "Customer not found.",
      });
      return;
    }

    response.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : error,
      message: "Internal server error.",
    });
  }
}

export async function deleteCustomer(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({
        success: false,
        message: "Customer ID is required.",
      });
      return;
    }

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      response.status(404).json({
        success: false,
        message: "Customer not found.",
      });
      return;
    }

    response.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : error,
      message: "Internal server error.",
    });
  }
}

const express = require("express");
const request = require("supertest");
const { sendResponse } = require("../utils/apiResponse");

describe("apiResponse util", () => {
  it("returns default status 200 with JSON body", async () => {
    const app = express();
    app.get("/ping", (req, res) => sendResponse(res, { hello: "world" }));

    const response = await request(app).get("/ping");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ hello: "world" });
  });

  it("returns custom HTTP status when provided", async () => {
    const app = express();
    app.get("/created", (req, res) => sendResponse(res, { id: "1" }, 201));

    const response = await request(app).get("/created");
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: "1" });
  });
});
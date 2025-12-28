import axios from "axios";

/**
 * API Gateway base URL
 * All frontend requests go through the gateway
 */
const GATEWAY_URL = "http://localhost:8765";

/**
 * Quiz Service APIs
 * Gateway → quiz-service → /quiz/**
 */
export const quizApi = axios.create({
  baseURL: `${GATEWAY_URL}/quiz-service/quiz`,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * Question Service APIs
 * Gateway → question-service → /question/**
 */
export const questionApi = axios.create({
  baseURL: `${GATEWAY_URL}/question-service/question`,
  headers: {
    "Content-Type": "application/json"
  }
});

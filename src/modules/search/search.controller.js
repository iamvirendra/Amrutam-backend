import redisClient from "../../db/redis.js";
import {
  searchDoctors,
  searchConsultations,
  searchPrescriptions,
  searchAuditLogs,
} from "./search.service.js";

/**
 * Generic caching utility — reuses Redis for performance
 */
async function cacheResponse(key, fetchFn, ttl = 60) {
  const cached = await redisClient.get(key);
  if (cached) {
    console.log(`🔁 Cache hit: ${key}`);
    return JSON.parse(cached);
  }

  console.log(`🆕 Cache miss: ${key}`);
  const result = await fetchFn();
  await redisClient.setEx(key, ttl, JSON.stringify(result));
  return result;
}

/**
 * @route GET /api/search/doctors
 * @desc Search doctors by name, specialization, location, etc.
 */
export const searchDoctorsController = async (req, res) => {
  try {
    const cacheKey = `search:doctors:${JSON.stringify(req.query)}`;
    const data = await cacheResponse(cacheKey, () => searchDoctors(req.query));
    res.status(200).json({ success: true, results: data });
  } catch (err) {
    console.error("Error searching doctors:", err);
    res.status(500).json({ success: false, error: "Failed to search doctors" });
  }
};

/**
 * @route GET /api/search/consultations
 * @desc Search consultations by symptoms, doctor_id, patient_id, dateRange, etc.
 */
export const searchConsultationsController = async (req, res) => {
  try {
    const cacheKey = `search:consultations:${JSON.stringify(req.query)}`;
    const data = await cacheResponse(cacheKey, () => searchConsultations(req.query));
    res.status(200).json({ success: true, results: data });
  } catch (err) {
    console.error("Error searching consultations:", err);
    res.status(500).json({ success: false, error: "Failed to search consultations" });
  }
};

/**
 * @route GET /api/search/prescriptions
 * @desc Search prescriptions by medicine name, patient_id, doctor_id, etc.
 */
export const searchPrescriptionsController = async (req, res) => {
  try {
    const cacheKey = `search:prescriptions:${JSON.stringify(req.query)}`;
    const data = await cacheResponse(cacheKey, () => searchPrescriptions(req.query));
    res.status(200).json({ success: true, results: data });
  } catch (err) {
    console.error("Error searching prescriptions:", err);
    res.status(500).json({ success: false, error: "Failed to search prescriptions" });
  }
};

/**
 * @route GET /api/search/audit
 * @desc Search audit logs by user_id, entity, or action
 */
export const searchAuditLogsController = async (req, res) => {
  try {
    const cacheKey = `search:audit:${JSON.stringify(req.query)}`;
    const data = await cacheResponse(cacheKey, () => searchAuditLogs(req.query));
    res.status(200).json({ success: true, results: data });
  } catch (err) {
    console.error("Error searching audit logs:", err);
    res.status(500).json({ success: false, error: "Failed to search audit logs" });
  }
};

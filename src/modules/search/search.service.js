import client from "../../db/elasticsearch.js";

export async function searchDoctors(query) {
  const { name, specialization } = query;

  const esQuery = {
    index: "doctors",
    body: {
      query: {
        bool: {
          must: [
            name ? { match: { name } } : { match_all: {} },
            specialization ? { match: { specialization } } : {}
          ]
        }
      }
    }
  };

  const { hits } = await client.search(esQuery);
  return hits.hits.map(hit => hit._source);
}

export async function searchConsultations(query) {
  const { doctor_id, patient_id, status, text } = query;

  const esQuery = {
    index: "consultations",
    body: {
      query: {
        bool: {
          must: [
            text ? { multi_match: { query: text, fields: ["consultation_notes", "symptoms"] } } : {},
          ],
          filter: [
            doctor_id ? { term: { doctor_id: parseInt(doctor_id) } } : {},
            patient_id ? { term: { patient_id: parseInt(patient_id) } } : {},
            status ? { term: { status } } : {}
          ]
        }
      }
    }
  };

  const { hits } = await client.search(esQuery);
  return hits.hits.map(hit => hit._source);
}

export async function searchPrescriptions(query) {
  const { medicine, patient_id, doctor_id } = query;

  const esQuery = {
    index: "prescriptions",
    body: {
      query: {
        bool: {
          must: [
            medicine ? { match: { medicine_name: medicine } } : { match_all: {} }
          ],
          filter: [
            patient_id ? { term: { patient_id: parseInt(patient_id) } } : {},
            doctor_id ? { term: { doctor_id: parseInt(doctor_id) } } : {}
          ]
        }
      }
    }
  };

  const { hits } = await client.search(esQuery);
  return hits.hits.map(hit => hit._source);
}

/**
 * Search Audit Logs
 * Supports filters: user_id, entity, action, date range
 */
export async function searchAuditLogs(query) {
  const { user_id, entity, action, fromDate, toDate } = query;

  const esQuery = {
    index: "audit_logs",
    body: {
      query: {
        bool: {
          must: [],
          filter: [
            user_id ? { term: { user_id: parseInt(user_id) } } : {},
            entity ? { term: { entity } } : {},
            action ? { term: { action } } : {},
            fromDate || toDate
              ? {
                  range: {
                    timestamp: {
                      gte: fromDate || "now-30d/d",
                      lte: toDate || "now",
                    },
                  },
                }
              : {},
          ],
        },
      },
      sort: [{ timestamp: { order: "desc" } }],
    },
  };

  const { hits } = await client.search(esQuery);
  return hits.hits.map(hit => hit._source);
}

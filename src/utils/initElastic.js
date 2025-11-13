import esClient from "../db/elasticsearch.js";

export async function initIndices() {
  const indices = [
    { name: "doctor_index", body: { mappings: { properties: { name: { type: "text" }, specialization: { type: "keyword" }, city: { type: "keyword" } } } } },
    { name: "consultation_index", body: { mappings: { properties: { doctor_id: { type: "keyword" }, patient_id: { type: "keyword" }, symptoms: { type: "text" }, created_at: { type: "date" } } } } },
    { name: "prescription_index", body: { mappings: { properties: { doctor_id: { type: "keyword" }, patient_id: { type: "keyword" }, medicine: { type: "text" }, dosage: { type: "text" } } } } },
    { name: "audit_index", body: { mappings: { properties: { action: { type: "keyword" }, user_id: { type: "keyword" }, entity: { type: "keyword" }, timestamp: { type: "date" } } } } },
  ];

  for (const idx of indices) {
    const exists = await esClient.indices.exists({ index: idx.name });
    if (!exists) {
      await esClient.indices.create({ index: idx.name, body: idx.body });
      console.log(`✅ Created index: ${idx.name}`);
    }
  }
}

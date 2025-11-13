import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
dotenv.config();

const esClient = new Client({
  node: process.env.ELASTIC_NODE,
});

try {
    await esClient.ping();
    console.log("Connected to Elasticsearch");
} catch (err) {
    console.error("Elasticsearch connection error:", err);
}
  
export default esClient;
